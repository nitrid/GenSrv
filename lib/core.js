//*******************************************************/
// Core - 02.03.2021 - Ali Kemal KARACA
//*******************************************************/
import express from 'express'
import path from 'path'
import {Server as io} from 'socket.io'
import crypto from 'crypto'
import mssql from 'mssql'
import async from 'async'
import terminal from './terminal.js'
import fs from 'fs';
import macid from 'node-machine-id'
import client from 'socket.io-client';
import moment from 'moment'

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
        this.listeners = Object();

        if(!core.instance)
        {
            core.instance = this;
        }        
    }
    async listen(port)
    {                
        let http = this.app.listen(port);
        let socket = new io(http,{cors: {origin: '*'}});

        this.io_manager = new io_manager(socket,this.config);              
        this.log = new log();                
        this.sql = new sql(this.config);
        this.auth = new auth();
        this.terminal = new terminal();                  
    }   
    //#region  "EVENT"
    on(pEvt, pCallback) 
    {
        if (!this.listeners.hasOwnProperty(pEvt))
        this.listeners[pEvt] = Array();

        this.listeners[pEvt].push(pCallback); 
    }
    emit(pEvt, pParams)
    {
        return this.eventTrigger(pEvt,pParams);
    }
    eventTrigger(pEvt, pParams) 
    {
        if (pEvt in this.listeners) 
        {
            let callbacks = this.listeners[pEvt];
            for (var x in callbacks)
            {
                callbacks[x](pParams);
            }
        } 
    }
    //#endregion 
}
export class io_manager
{
    constructor(pIo,pConfig)
    {
        this.io = pIo;
        config = pConfig;
        this.io_connection = this.io_connection.bind(this);
        this.io.on('connection',this.io_connection);        
    }
    io_connection(pSocket)
    {
        pSocket.authState = this.authState;
        //LISANS KONTROL EDILIYOR EĞER PROBLEM VARSA KULLANICI DISCONNECT EDİLİYOR.
        // if(typeof core.instance.licence != 'undefined' && core.instance.licence.status)
        // {
        //     if(core.instance.licence.user_count < this.clients().length)
        //     {
        //         core.instance.log.msg('Licensed user limit exceeded','Licence');
        //         pSocket.emit('general',{id:"M001",data:"Licensed user limit exceeded"});
        //         pSocket.disconnect();
        //         return;
        //     }
        //     else
        //     {
        //         core.instance.log.msg('Client connected to the WebSocket','Socket');
        //     }
        // }
        // else
        // {
        //     core.instance.log.msg('Waiting for response from license server','Licence');
        //     pSocket.emit('general',{id:"M001",data:"Waiting for response from license server"});
        //     pSocket.disconnect();
        //     return;
        // }
        //***************************************************************************/
        pSocket.on('login',async (pParam,pCallback) =>
        {    
            let TmpResult = '';            
            let TmpApp = '';

            if(pParam.length == 2)
            {
                TmpApp = pParam[1];
                TmpResult = await core.instance.auth.login(pParam[0]);
                if(TmpResult == '')
                {
                    core.instance.log.msg('Invalid token access denied !',"Login");
                    pSocket.emit('general',{id:"M002",data:"Invalid token access denied !"});
                }
            }
            else if(pParam.length == 3)
            {
                TmpApp = pParam[2];
                TmpResult = await core.instance.auth.login(pParam[0],pParam[1]);
                if(TmpResult == '')
                {
                    core.instance.log.msg('Invalid username or password !',"Login");
                    pSocket.emit('general',{id:"M002",data:"Invalid username or password !"});
                }
            }            
            
            if(TmpResult != '')
            {
                //SOCKETIN DAHA ÖNCEDEN LOGIN OLUP OLMADIĞI KONTROL EDİLİYOR.
                if(typeof pSocket.userInfo != 'undefined')
                {
                    core.instance.log.msg('Already logined.',"Login",pSocket.userInfo.CODE);
                    pSocket.emit('general',{id:"M002",data:"Already logined."});
                }
                else
                {
                    //KULLANICI BAŞKA BİR CİHAZDAN DAHA ÖNCE LOGİN OLMUŞSA KONTROL EDİLİYOR VE DİĞER CİHAZDAKİ KULLANICI DISCONNECT EDİLİYOR.
                    let TmpUserList = this.getUser(TmpResult);
                    for (let i = 0; i < TmpUserList.length; i++) 
                    {
                        TmpUserList[i].socket.disconnect(true);
                    }
                    //***********************************************************************************************************************/
                    
                    //LOGIN OLAN KULLANICININ BİLGİLERİ DB DEN GETİRİLİYOR.
                    TmpResult = await core.instance.auth.getUser(TmpResult); 
                    pSocket.userInfo = [];
                    if(TmpResult.length > 0)
                    {
                        TmpResult[0].APP = TmpApp;
                        pSocket.userInfo = TmpResult[0];
                    }               
                    core.instance.log.msg('Logined user.',"Login",TmpResult[0].CODE);
                    pSocket.emit('general',{id:"M003",data:"Logined user."});
                }
            }
            else
            {
                TmpResult = [];
            }
            core.instance.emit('Logined',{result:TmpResult,socket:pSocket});
            pCallback(TmpResult);
        });      
        pSocket.on('terminal',async (pParam,pCallback) =>
        {
            if(pParam == '-try' || pParam.split(' ')[0] == '-createDb' || pSocket.authState('Administrator').id == 0)
            {
                if(typeof pCallback != 'undefined')
                {
                    pCallback(await core.instance.terminal.command(pParam))
                }
                else
                {
                    core.instance.terminal.command(pParam)
                }
            }
        })
        pSocket.on('sql',async (pQuery,pCallback) =>
        {
            if(pSocket.authState().id == 0)
            {
                let TmpSql = new sql(config);
                pCallback(await TmpSql.execute(pQuery));
            }
            else
            {
                pCallback({auth_err:pSocket.authState()})
            }
        });
        pSocket.on('folder_list',async (pParam,pCallback) =>
        {
            try
            {
                let tmpList = fs.readdirSync(core.instance.root_path + '\\' + pParam, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
                pCallback(tmpList);
            }catch (err) 
            {
                pCallback([]);
            }
        })
        pSocket.on('disconnect', () => 
        {
            if(typeof pSocket.userInfo != 'undefined')
            {
                core.instance.log.msg('Client disconnected','Socket',pSocket.userInfo.CODE);
            }
            else
            {
                core.instance.log.msg('Client disconnected','Socket');
            }
        });
    }
    authState()
    {
        if(typeof this.userInfo == 'undefined')
        {
            core.instance.log.msg('Authorization error 403 access denied','Login');
            return {id: 1, err: 'Authorization error 403 access denied'};
        }
        else
        {
            if(typeof arguments[0] != 'undefined')
            {
                if(this.userInfo.ROLE != arguments[0])
                {
                    core.instance.log.msg('Unauthorized user denied','Login');
                    return {id: 2, err: 'Unauthorized user denied'};
                }
            }
        }
        return {id: 0, err: 'Successful'};
    }
    clients()
    {
        //SOCKET E BAĞLI KULLANICILARIN LİSTESİ
        let TmpList = [];
        for (const [key, value] of this.io.sockets.sockets.entries()) 
        {
            if(typeof value.userInfo == 'undefined')
            {
                TmpList.push({id: key,socket: value})
            }
            else
            {
                TmpList.push(
                    {
                        id: key,
                        username:value.userInfo.CODE,
                        sha: value.userInfo.SHA,
                        role:value.userInfo.ROLE,
                        app: value.userInfo.APP,  
                        socket: value
                    }
                )
            }
        }
        if(arguments.length > 0)
        {
            TmpList = TmpList.filter(x => x.app === arguments[0])
        }
        return TmpList
    }
    getUser()
    {
        //İKİ FARKLI PARAMETRE GELEBİLİR SHA YADA USERNAME
        return this.clients().filter(x => x.sha == arguments[0] || x.username == arguments[0]);
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
                trustServerCertificate: true
            }              
        };
    }
    try()
    {
        return new Promise(resolve =>
        {
            let TmpConfig = {...this.config}
            TmpConfig.database = "master"
            mssql.connect(TmpConfig, async err =>
            {
                if(err != null)
                {
                    core.instance.log.msg("Could not connect to sql server !","Sql")
                    resolve(1)
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
                        resolve(2)
                    }
                    else
                    {
                        core.instance.log.msg("Connection to database successful.","Sql");
                        resolve(0)
                    }
                }
            })
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
                                    request.inputBuild = this.inputBuild;
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
                            request.inputBuild = this.inputBuild;
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
    async createDb(pDbName)
    {
        return new Promise(async resolve =>
        {
            if(typeof pDbName == 'undefined')
            {
                core.instance.log.msg("Database could not be created ! Missing parameter.","Sql")
                resolve({msg:"Database could not be created ! Missing parameter."})
                return
            }
    
            // CREATE DATABASE
            let TmpRead = fs.readFileSync(core.instance.root_path +"/setup/dbscr/DB.sql",{encoding:'utf8'});
            TmpRead = TmpRead.toString().split("{FOLDER_NAME}").join(config.db_path);
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
                    resolve({msg:""})
                }
                else
                {
                    core.instance.log.msg("Database content could not be created !","Sql");
                    resolve({msg:"Database content could not be created !"})
                }
            }
            else
            {
                core.instance.log.msg("Database could not be created !","Sql");
                resolve({msg:"Database could not be created !"})
            }
        });
    }
    inputBuild(pQuery)
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
export class auth
{
    constructor()
    {
        
    }
    login()
    {
        return new Promise(async resolve =>
        {
            let TmpQuery = {};
            //ONLY SHA CODE
            if(arguments.length == 1)
            {
                TmpQuery =
                {
                    query:  "SELECT [dbo].[FN_LOGIN] (@SHA,NULL) AS SHA",
                    param:  ['SHA:string|200'],
                    value:  [arguments[0]]
                }
            }
            //USER AND PWD 
            else if (arguments.length == 2)
            {
                TmpQuery =
                {
                    query:  "SELECT [dbo].[FN_LOGIN] (@USER,@PWD) AS SHA",
                    param:  ['USER:string|25','PWD:string|50'],
                    value:  [arguments[0],this.toBase64(arguments[1])]
                }
            }

            let TmpData = await core.instance.sql.execute(TmpQuery)
            if(TmpData.result.recordset.length > 0)
            {
                resolve(TmpData.result.recordset[0].SHA);
            }
            else
            {
                resolve('');
            }
        });
    }
    async setSHA(pGuid)
    {
        let TmpQuery =
        {
            query:  "EXEC [dbo].[PRD_USERS_UPDATE] " + 
                    "@GUID = @PGUID, " + 
                    "@SHA = @PSHA ",
            param:  ['PGUID:string|50','PSHA:string|200'],
            value:  [pGuid,crypto.createHash('sha256').update(pGuid + "-" + new Date()).digest('hex')]
        }
        await core.instance.sql.execute(TmpQuery)
    }
    async getUser(pSha)
    {
        return new Promise(async resolve =>
        {
            let TmpQuery =
            {
                query:  "SELECT CODE,NAME,ROLE,SHA,STATUS FROM USERS WHERE SHA = @SHA",
                param:  ['SHA:string|200'],
                value:  [pSha]
            }
    
            let TmpData = await core.instance.sql.execute(TmpQuery)
            if(TmpData.result.recordset.length > 0)
            {
                resolve(TmpData.result.recordset);
            }            
            else
            {
                resolve([]);
            }
        });
    }
    toBase64(pText)
    {
        return new Buffer(pText).toString('base64')
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

        try
        {
            if(typeof core.instance.config.debug != 'undefined' && core.instance.config.debug)
            {
                if(!fs.existsSync(core.instance.root_path +"/log/"))
                {
                    fs.mkdirSync(core.instance.root_path +"/log/");
                }
    
                if(fs.existsSync(core.instance.root_path +"/log/" + BufferDate + ".json"))
                {
                    let TmpRead = fs.readFileSync(core.instance.root_path +"/log/" + BufferDate + ".json",{encoding:'utf8'});
                    TmpObj = JSON.parse(TmpRead);
                }
    
                TmpObj.push({Time:TmpTime,Tag:TmpTag,User:TmpUser,Msg:TmpMsg});
            
                fs.writeFileSync(core.instance.root_path +"/log/" + BufferDate + ".json",JSON.stringify(TmpObj,null, '\t'),{encoding:'utf8'});
            }
            
            core.instance.io_manager.io.emit('terminal',TmpMsg);
        }
        catch(err)
        {
            console.log(err)
        }                

        console.log(TmpMsg + " - " + TmpTag + " - " + TmpUser);
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