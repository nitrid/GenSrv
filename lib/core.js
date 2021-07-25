//*******************************************************/
// Core - 02.03.2021 - Ali Kemal KARACA
//*******************************************************/
import express from 'express'
import path from 'path'
import {Server as io} from 'socket.io'
//import jwt from 'jsonwebtoken'
import mssql from 'mssql'
import async from 'async'

let config = {};

export default class core
{
    static instance = null;
    #root_path = path.resolve(path.dirname(''));
    app = express();    

    constructor(config)
    {       
        //MADE FOR TESTING ***********/
        if(typeof config.test != 'undefined' && config.test)
        {
            this.#root_path += '../../bin'
        }
        //************************* */
        this.app.use('/',express.static(path.join(this.#root_path, "/www")));
        this.config = config;
        this.sql = new sql(config);
        this.plugins = {};

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
        //****************************************** */
    }
    listen(port)
    {
        let http = this.app.listen(port);
        this.io = new io(http,{cors: {origin: '*'}})
        this.io_manager = new io_manager(this.io,this.config)
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
        console.log('Client connected to the WebSocket');

        pSocket.on('disconnect', () => 
        {
            console.log('Client disconnected');
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
    try(pConfig)
    {
        let TmpConfig = {}
        if(typeof pConfig == 'undefined')
            TmpConfig = this.config;
        else
            TmpConfig = pConfig;

        mssql.connect(TmpConfig, err =>
        {
            if(err != null)
            {
                console.log(err.originalError);
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
                                    var tmperr = { err : 'Error sql.js QueryPromise errCode : 101 - ' + err} 
                                    resolve({tag : pQuery.tag,result : tmperr});
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
                                        var tmperr = { err : 'Error sql.js QueryPromise errCode : 102 - ' + err2} 
                                        resolve({tag : pQuery.tag,result : tmperr});
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
                                    var tmperr = { err : 'Error sql.js QueryPromise errCode : 103 - ' + err} 
                                    resolve({tag : pQuery.tag,result : tmperr});
                                }
                                pool.close();
                            });
                        }
                    }
                    else
                    {
                        var tmperr = { err : 'Error sql.js QueryPromise errCode : 104 - ' + err} 
                        resolve({tag : pQuery.tag,result : tmperr});
                    }
                });
            }
            catch(err)
            {
                var tmperr = { err : 'Error sql.js QueryPromise errCode : 105 - ' + err} 
                resolve({tag : pQuery.tag,result : tmperr});
            }
        });
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