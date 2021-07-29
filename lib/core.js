//*******************************************************/
// Core - 02.03.2021 - Ali Kemal KARACA
//*******************************************************/
import express from 'express'
import path from 'path'
import {Server as io} from 'socket.io'
//import jwt from 'jsonwebtoken'
import mssql from 'mssql'
import async from 'async'
import terminal from './terminal.js'

import fs from 'fs';

let config = {};

export default class core
{
    static instance = null;
    root_path = path.resolve(path.dirname(''));
    app = express();    

    constructor(config)
    {       
        //MADE FOR TESTING ***********/
        if(typeof config.test != 'undefined' && config.test)
        {
            this.root_path += '../../bin'
        }
        //************************* */
        this.app.use('/',express.static(path.join(this.root_path, "/www")));
        this.config = config;        
        this.plugins = {};        
        this.log = new log();

        if(!core.instance)
        {
            core.instance = this;
        }
        //PLUGIN YAPISI ******************************/
        import('./plugins/plugins.js').then(module =>
        {
            Object.keys(module).forEach(element => 
            {
                this.plugins[element] = new module[element];
            });
        })
        //********************************************/
    }
    listen(port)
    {
        let http = this.app.listen(port);
        let TmpIo = new io(http,{cors: {origin: '*'}});
        this.io_manager = new io_manager(TmpIo,this.config);
        this.terminal = new terminal();
        this.sql = new sql(this.config);
        this.sql.try()          
    }
}
export class io_manager
{
    static instance = null;
    constructor(pIo,pConfig)
    {
        this.io = pIo;
        config = pConfig;
        this.io.on('connection',this.io_connection);
        
        if(!io_manager.instance)
        {
            io_manager.instance = this;
        }
    }

    io_connection(pSocket)
    {
        core.instance.log.msg('Client connected to the WebSocket','Socket');

        pSocket.on('disconnect', () => 
        {
            core.instance.log.msg('Client disconnected','Socket');
        });
        pSocket.on('sql',async (pQuery,pCallback) =>
        {
            let TmpSql = new sql(config);
            pCallback(await TmpSql.execute(pQuery));
        })
    }
}
export class sql 
{
    constructor(pConfig)
    {
        this.config = pConfig;
    }
    get config()
    {
        return this._config;
    }
    set config(value)
    {
        this._config = 
        {
            server: value.server,
            database: value.database,
            user: value.uid, 
            password: value.pwd, 
            connectionTimeout:600000,
            requestTimeout:600000,
            options: 
            {
                trustedConnection: value.trustedConnection,
            }              
        };
    }
    try()
    {
        let TmpConfig = {...this.config}
        TmpConfig.database = "master"
        mssql.connect(TmpConfig, async err =>
        {
            if(err != null)
            {
                core.instance.log.msg("Could not connect to sql server !","Sql");
                process.exit(1)
            }
            else
            {
                let TmpQuery = 
                {
                    db: "master",
                    query: "SELECT name FROM master.dbo.sysdatabases WHERE ('[' + name + ']' = @DB OR name = @DB)",
                    param: ["DB:string|25"],
                    value: [this.config.database]
                }
                if((await this.execute(TmpQuery)).result.recordset.length == 0)
                {
                    core.instance.log.msg("The database could not be accessed. The database may not have been created. Please check !","Sql");
                }
            }
        })
    }
    execute(pQuery)
    {
        return new Promise(resolve =>
        {
            try
            {   
                //Sorgudan gelen database adı config set ediliyor.
                let TmpConfig = {...this.config};
                if (typeof(pQuery.db) != "undefined") 
                {
                    if(pQuery.db.indexOf("{M}.") > -1)
                        TmpConfig.database = TmpConfig.database + '_' + pQuery.db.replace('{M}.','');
                    else
                        TmpConfig.database = pQuery.db;            
                }
                const pool = new mssql.ConnectionPool(TmpConfig, err => 
                {
                    if(err == null)
                    {
                        //TRANSACTION - 25.07.2021
                        if(Array.isArray(pQuery))
                        {
                            const transaction = new mssql.Transaction(pool);
                            return transaction.begin(err => 
                            {    
                                if (err) 
                                {
                                    var tmperr = { err : 'Error errCode : 101 - ' + err} 
                                    resolve({tag : pQuery.tag,result : tmperr});
                                    core.instance.log.msg("Error errCode : 101 - " + err ,"Sql");
                                }
                                return async.eachSeries(pQuery, async (query, callback) => 
                                {             
                                    const request = new mssql.Request(transaction);                         
                                    request.inputBuild = this.#inputBuild;
                                    request.inputBuild(query);
                                    return request.query(query.query);
                                },async (err2) => 
                                {
                                    if (err2) 
                                    {
                                      await transaction.rollback(() => 
                                      {
                                        pool.close();
                                        var tmperr = { err : 'Error errCode : 102 - ' + err2} 
                                        resolve({tag : pQuery.tag,result : tmperr});
                                        core.instance.log.msg("Error errCode : 102 - " + err2 ,"Sql");
                                      });
                                    } 
                                    else 
                                    {
                                      await transaction.commit(() => 
                                      {
                                        pool.close();
                                        resolve({tag : pQuery.tag,result : []});
                                      });
                                    }
                                });
                            });
                        }
                        // NON QUERY
                        else
                        {
                            const request = pool.request();           
                            request.inputBuild = this.#inputBuild;
                            request.inputBuild(pQuery)
                                                    
                            request.query(pQuery.query,(err,result) => 
                            {
                                if(err == null)
                                {
                                    resolve({tag : pQuery.tag,result : result});
                                }
                                else
                                {
                                    var tmperr = { err : 'Error errCode : 103 - ' + err} 
                                    resolve({tag : pQuery.tag,result : tmperr});
                                    core.instance.log.msg("Error errCode : 103 - " + err ,"Sql");
                                }
                                pool.close();
                            });
                        }
                    }
                    else
                    {
                        var tmperr = { err : 'Error errCode : 104 - ' + err} 
                        resolve({tag : pQuery.tag,result : tmperr});
                        core.instance.log.msg("Error errCode : 104 - " + err ,"Sql");
                    }
                });
            }
            catch(err)
            {
                var tmperr = { err : 'Error errCode : 105 - ' + err} 
                resolve({tag : pQuery.tag,result : tmperr});
                core.instance.log.msg("Error errCode : 105 - " + err ,"Sql");
            }
        });
    }
    async createDb(pPath,pDbName)
    {
        if(typeof pPath == 'undefined')
        {
            core.instance.log.msg("Database could not be created ! Missing parameter.","Sql");
            return;
        }
        if(typeof pDbName == 'undefined')
        {
            core.instance.log.msg("Database could not be created ! Missing parameter.","Sql");
            return;
        }

        // CREATE DATABASE
        let TmpRead = fs.readFileSync(core.instance.root_path +"/setup/dbscr/DB.sql",{encoding:'utf8'});
        TmpRead = TmpRead.toString().split("{FOLDER_NAME}").join(pPath);
        TmpRead = TmpRead.toString().split("{DBNAME}").join(pDbName)
        
        let TmpResult = await this.execute({db : "master", query : TmpRead});
        
        if(typeof TmpResult.result.err == 'undefined')
        {
            core.instance.log.msg("Database creation successful.","Sql");
            // CREATE TABLE OR VIEW OR FUNCTION VS...
            TmpRead = fs.readFileSync(core.instance.root_path +"/setup/dbscr/CONTENT.sql",{encoding:'utf8'});
            TmpRead = TmpRead.toString().split("{DBNAME}").join(pDbName)

            TmpResult = await this.execute({db : pDbName, query : TmpRead});
            if(typeof TmpResult.result.err == 'undefined')
            {
                core.instance.log.msg("Database content creation successful.","Sql");
            }
            else
            {
                core.instance.log.msg("Database content could not be created !","Sql");
            }
        }
        else
        {
            core.instance.log.msg("Database could not be created !","Sql");
        }
    }
    #inputBuild(pQuery)
    {
        if(typeof pQuery.param != 'undefined')
        {
            for(let i = 0;i < pQuery.param.length;i++)
            {
                let pType = null;
                if(pQuery.param[i].split(":").length > 1)
                {
                    pType = pQuery.param[i].split(":")[1].split("|");
                }
                else
                {
                    pType = pQuery.type[i].split("|");   
                }
                
                if(pType[0] == "string")
                {
                    this.input(pQuery.param[i].split(":")[0],mssql.NVarChar(pType[1]),pQuery.value[i]);    
                }
                else if(pType[0] == "int")
                {
                    this.input(pQuery.param[i].split(":")[0],mssql.Int,pQuery.value[i]);    
                }
                else if(pType[0] == "float")
                {
                    this.input(pQuery.param[i].split(":")[0],mssql.Float,pQuery.value[i]);    
                }
                else if(pType[0] == "date")
                {
                    var from = pQuery.value[i]; 
                    var numbers = from.match(/\d+/g); 
                    var date = new Date(numbers[2] + "-" +numbers[1] + "-" + numbers[0]);

                    this.input(pQuery.param[i].split(":")[0],mssql.Date,date);    
                }
                else if(pType[0] == "bit")
                {
                    this.input(pQuery.param[i].split(":")[0],mssql.Bit,pQuery.value[i]);    
                }
            }
        }
    }
}
export class authentication
{
    static instance = null;
    constructor()
    {
        if(!authentication.instance)
        {
            authentication.instance = this;
        }
    }
}
export class log
{
    constructor()
    {

    }
    msg()
    {
        let BufferDate = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0') + new Date().getDate().toString().padStart(2, '0');
        let TmpTime = new Date().getHours().toString().padStart(2,'0') + ":" + new Date().getMinutes().toString().padStart(2,'0') + ":" + new Date().getSeconds().toString().padStart(2,'0')
        let TmpMsg = "";
        let TmpTag = ""; //Socket,System,Sql,Terminal ...
        let TmpUser = "";
        let TmpObj = [];

        if(typeof arguments[0] != 'undefined')
        {
            TmpMsg = arguments[0]
        }
        if(typeof arguments[1] != 'undefined')
        {
            TmpTag = arguments[1]
        }
        if(typeof arguments[2] != 'undefined')
        {
            TmpUser = arguments[2]
        }

        if(!fs.existsSync(core.instance.root_path +"/log/"))
        {
            fs.mkdirSync(core.instance.root_path +"/log/");
        }

        try
        {
            if(fs.existsSync(core.instance.root_path +"/log/" + BufferDate + ".json"))
            {
                let TmpRead = fs.readFileSync(core.instance.root_path +"/log/" + BufferDate + ".json",{encoding:'utf8'});
                TmpObj = JSON.parse(TmpRead);
            }

            TmpObj.push({Time:TmpTime,Tag:TmpTag,User:TmpUser,Msg:TmpMsg});
        
            fs.writeFileSync(core.instance.root_path +"/log/" + BufferDate + ".json",JSON.stringify(TmpObj,null, '\t'),{encoding:'utf8'});
            
            core.instance.io_manager.io.emit('terminal',TmpMsg);
        }
        catch(err)
        {
            console.log(err)
        }                

        console.log(TmpMsg);
    }
    readLog()
    {
        let TmpFileName = ""
        let TmpObj = {};
        
        if(typeof arguments[0] != 'undefined' && arguments[0] != "")
        {
            console.log(arguments[0])
            TmpFileName = arguments[0]
        }
        else
        {
            TmpFileName = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0') + new Date().getDate().toString().padStart(2, '0');
        }
        if(typeof arguments[1] != 'undefined')
        {
            TmpObj = arguments[1]
        }

        try
        {
            let TmpRead = fs.readFileSync(core.instance.root_path +"/log/" + TmpFileName + ".json",{encoding:'utf8'});
            let TmpData = JSON.parse(TmpRead);

            if(typeof TmpObj.Tag != 'undefined')
            {
                TmpData = TmpData.filter((x) => {return x.Tag === TmpObj.Tag})
            }
            if(typeof TmpObj.User != 'undefined')
            {
                TmpData = TmpData.filter((x) => {return x.User === TmpObj.User})
            }
            
            TmpRead = JSON.stringify(TmpData,null,"\t");
            core.instance.io_manager.io.emit('terminal',TmpRead);
            console.log(TmpRead);
        }
        catch(err)
        {
            console.log(err)
        }
    }
}