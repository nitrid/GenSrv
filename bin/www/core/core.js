export class core
{        
    static instance = null;

    constructor(pUrl)
    {   
        if(!core.instance)
        {
            core.instance = this;
        }
        
        if(typeof pUrl == 'object')
        {
            try
            {
                this.socket = pUrl;
            }
            catch (error) {}
        }
        else if(typeof pUrl == 'string')
        {
            try
            {
                this.socket = io(pUrl,{timeout:100000});
            }
            catch (error) {}
        }
        if(typeof this.socket == 'undefined')
        {
            console.log("socket not defined")
            return;
        }

        this.dataset = null;
        this.listeners = Object();        
        this.sql = new sql();
        this.auth = new auth();
        this.util = new util();

        this.ioEvents();        
    }    
    ioEvents()
    {
        this.socket.on('connect',() => 
        {
            this.emit('connect',()=>{})
        });
        this.socket.on('connect_error',(error) => 
        {
            this.emit('connect_error',()=>{})
        });
        this.socket.on('error', (error) => 
        {
            this.emit('connect_error',()=>{})
        });
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
export class sql 
{
    constructor()
    {
        this.query = "";
    }
    try()
    {
        return new Promise(resolve => 
        {
            core.instance.socket.emit('terminal','-try',(pResult) => 
            {
                resolve(pResult);
            });
        });
    }
    createDb()
    {
        return new Promise(resolve => 
        {
            core.instance.socket.emit('terminal','-createDb ' + arguments[0],(pResult) => 
            {
                resolve(pResult);
            });
        });        
    }
    execute()
    {    
        return new Promise(resolve => 
        {
            let TmpQuery = ""
            if(typeof arguments[0] == 'undefined')
            {
                TmpQuery = this.query
            }
            else
            {
                TmpQuery = arguments[0];
            }
            //PARAMETRE UNDEFINED CONTROL
            if(typeof(TmpQuery.value) != 'undefined')
            {
                for (let i = 0; i < TmpQuery.value.length; i++) 
                {
                    if(typeof TmpQuery.value[i] == 'undefined')
                    {
                        resolve({result : {err: "Parametre değerlerinde problem oluştu ! "}})
                    }
                }
            }

            core.instance.socket.emit('sql',TmpQuery,(data) =>
            {
                if(typeof data.auth_err == 'undefined')
                {
                    resolve(data); 
                }
                else
                {
                    //BURADA HATA SAYFASINA YÖNLENDİRME ÇALIŞACAK.
                    console.log(data.auth_err);
                    resolve([]);
                }
            });
        });
    }
}
export class auth 
{
    constructor()
    {
        this.data = null
    }
    login()
    {
        return new Promise(resolve => 
        {
            let TmpData = []
            if(arguments.length == 2)
            {
                TmpData.push(arguments[0],arguments[1])
            }
            else if(arguments.length == 3)
            {
                TmpData.push(arguments[0],arguments[1],arguments[2])
            }

            core.instance.socket.emit('login',TmpData,async (data) =>
            {
                if(data.length > 0)
                {
                    this.data = data[0]
                    window.sessionStorage.setItem('auth',data[0].SHA)
                    resolve(true)
                }
                else
                {
                    window.sessionStorage.removeItem('auth')
                    this.data = null
                    resolve(false)
                }
            });
        })
    }
    logout()
    {
        window.sessionStorage.removeItem('auth');
    }
}
export class util
{
    constructor()
    {
        this.core = core.instance;        
    }
    folder_list(pPath)
    {
        return new Promise(resolve => 
        {
            this.core.socket.emit('util',{cmd:'folder_list',prm: pPath},(data) =>
            {
                resolve(data)
            });
        });
    }
    readFile(pPath)
    {
        return new Promise(resolve => 
        {
            this.core.socket.emit('util',{cmd:'read_file',prm: pPath},(data) =>
            {
                resolve(data)
            });
        });
    }
    writeFile(pPath,pData)
    {
        return new Promise(resolve => 
        {
            this.core.socket.emit('util',{cmd:'write_file',prm: {path:pPath,data:pData}},(data) =>
            {
                resolve(data)
            });
        });
    }
}
export class dataset
{    
    constructor(pName)
    {
        if(typeof pName == 'undefined')
            this.name = pName;
        else
            this.name = 'dataset'
        
        this.datatables = [];
        //this.initJsDb();
    }
    async initJsDb()
    {
        if(typeof JsStore != 'undefined')
        {
            this.jsCon = new JsStore.Connection();
            this.jsCon.db = await this.jsCon.openDb(this.name);
            console.log(this.jsCon.db)
            //await this.jsCon.initDb({name:this.name,tables: []})
        }
    }
    async add(pTable)
    {
        if(typeof pTable != 'undefined')
        {
            if(typeof pTable == 'string')
            {
                this.datatables.push(new datatable(pTable))    
            }
            else if(typeof pTable == 'object')
            {
                this.datatables.push(pTable)
            }
            
            if(typeof JsStore != 'undefined')
            {
                this.jsCon = new JsStore.Connection();
                this.jsCon.db = await this.jsCon.openDb(this.name);
            }
            this.jsCon.db.tables.push()
            console.log(this.jsCon.db)
//             await this.jsCon.initDb({name:this.name,tables: 
//             [{
//                 name: this.datatables[this.datatables.length - 1].name,
//                 columns: this.datatables[this.datatables.length - 1].getSchema()
//             }]})
//             this.jsCon.insert({
//     into: this.datatables[this.datatables.length - 1].name,
//     values: [1,'001']
// });
        }
    }
    datatable(pName)
    {
        if(typeof pName != 'undefined')
        {
            for (let i = 0; i < this.datatables.length; i++) 
            {
                if(this.datatables[i].name == pName)
                {
                    return this.datatables[i];
                }
            }
        }
    }
    remove(pName)
    {
        if(typeof pName != 'undefined')
        {
            for (let i = 0; i < this.datatables.length; i++) 
            {
                if(this.datatables[i].name == pName)
                {
                    this.splice(i,1);
                }
            }
        }
    }
    addTemplate(pObj)
    {
        for (let i = 0; i < pObj.length; i++) 
        {
            this.add(pObj[i].name);
            let TmpTbl = this.datatable(pObj[i].name);
            TmpTbl.selectCmd = pObj[i].selectCmd;
            TmpTbl.insertCmd = pObj[i].insertCmd;
            TmpTbl.updateCmd = pObj[i].updateCmd;
        }
    }
}
export class datatable
{    
    constructor()
    {        
        this.selectCmd;
        this.insertCmd;
        this.updateCmd;
        this.deleteCmd;

        this._deleteList = [];
        
        this.sql = core.instance.sql;

        if(arguments.length == 1 && typeof arguments[0] == 'string')
        {
            this.name = arguments[0];
        }
        else if(arguments.length == 1 && arguments[0] instanceof sql)
        {
            this.sql = arguments[0];
        }
        else if(arguments.length == 2 && typeof arguments[0] == 'string' && arguments[1] instanceof sql)
        {
            this.name = arguments[0];
            this.sql = arguments[1];
        }
        else
        {
            this.name = '';
        }
    }     
    push(pItem,pIsNew)
    {     
        pItem = new Proxy(pItem, 
        {
            get: function(target, prop, receiver) 
            {
                return target[prop];
            },
            set: function(target, prop, receiver) 
            {
                Object.setPrototypeOf(target,{stat:'edit'})
                target[prop] = receiver
                //return target[prop];
                return true;
            }
        });
        
        if(typeof pIsNew == 'undefined' || pIsNew)
        {
            Object.setPrototypeOf(pItem,{stat:'new'})
        }
        
        super.push(pItem)
    }
    removeAt()
    {
        let tmpIndex = -1;
        if(arguments.length > 0 && typeof arguments[0] == 'object')
        {
            tmpIndex = this.indexOf(arguments[0]);
        }
        else if(arguments.length > 0 && typeof arguments[0] == 'number')
        {
            tmpIndex = arguments[0]
        }

        if(tmpIndex > -1)
        {
            this._deleteList.push(this[tmpIndex]); 
            this.splice(tmpIndex,1);
        }
    }
    clear()
    {
        this.splice(0,this.length);
    }
    refresh()
    {
        return new Promise(async resolve => 
        {
            if(typeof this.selectCmd != 'undefined')
            {
                let TmpData = await this.sql.execute(this.selectCmd)
                if(typeof TmpData.result.err == 'undefined') 
                {
                    if(typeof TmpData.result.recordset != 'undefined')
                    {
                        this.clear();
                        for (let i = 0; i < TmpData.result.recordset.length; i++) 
                        {                    
                            this.push(TmpData.result.recordset[i],false)   
                        }                    
                    }
                }
                else
                {
                    console.log(TmpData.result.err)
                }                
            }
            resolve();
        });
    }
    insert()
    {
        return new Promise(async resolve => 
        {
            if(typeof this.insertCmd != 'undefined')
            {
                this.insertCmd.value = [];
            }
            for (let i = 0; i < this.length; i++) 
            {
                if(typeof this[i].stat != 'undefined')
                {
                    if(this[i].stat == 'new')
                    {    
                        Object.setPrototypeOf(this[i],{stat:''})

                        if(typeof this.insertCmd != 'undefined')
                        {
                            if(typeof this.insertCmd.param == 'undefined')
                            {
                                continue;
                            }
                            for (let m = 0; m < this.insertCmd.param.length; m++) 
                            {         
                                if(typeof this.insertCmd.dataprm == 'undefined')
                                {
                                    this.insertCmd.value.push(this[i][this.insertCmd.param[m].split(':')[0]]);
                                }
                                else
                                {
                                    this.insertCmd.value.push(this[i][this.insertCmd.dataprm[m]]);
                                }                                                       
                            }
                        }
                    }
                }
            }

            if(typeof this.insertCmd != 'undefined' && typeof this.insertCmd.value != 'undefined' && this.insertCmd.value.length > 0)
            {
                let TmpInsertData = await this.sql.execute(this.insertCmd)

                if(typeof TmpInsertData.result.err == 'undefined')
                {
                    this.insertCmd.value = [];
                }
                else
                {
                    console.log(TmpInsertData.result.err)
                }   
            }

            resolve();
        });
    }
    update()
    {
        return new Promise(async resolve => 
        {
            if(typeof this.updateCmd != 'undefined')
            {
                this.updateCmd.value = [];
            }            
            
            for (let i = 0; i < this.length; i++) 
            {
                if(typeof this[i].stat != 'undefined')
                {
                    if(this[i].stat == 'edit')
                    {
                        Object.setPrototypeOf(this[i],{stat:''})

                        if(typeof this.updateCmd != 'undefined')
                        {
                            if(typeof this.updateCmd.param == 'undefined')
                            {
                                continue;
                            }
                            for (let m = 0; m < this.updateCmd.param.length; m++) 
                            {
                                if(typeof this.updateCmd.dataprm == 'undefined')
                                {
                                    this.updateCmd.value.push(this[i][this.updateCmd.param[m].split(':')[0]]);
                                }
                                else
                                {
                                    this.updateCmd.value.push(this[i][this.updateCmd.dataprm[m]]);
                                }
                            }
                        }
                    }                    
                }
            }
            if(typeof this.updateCmd != 'undefined' && typeof this.updateCmd.value != 'undefined' && this.updateCmd.value.length > 0)
            {
                let TmpUpdateData = await this.sql.execute(this.updateCmd)

                if(typeof TmpUpdateData.result.err == 'undefined')
                {
                    this.updateCmd.value = [];
                }
                else
                {
                    console.log(TmpUpdateData.result.err)
                }   
            }            
               
            resolve();
        });
    }
    delete()
    {
        return new Promise(async resolve => 
        {
            if(typeof this.deleteCmd != 'undefined')
            {
                this.deleteCmd.value = [];
            }  

            for (let i = 0; i < this._deleteList.length; i++) 
            {
                if(typeof this.deleteCmd != 'undefined')
                {
                    if(typeof this.deleteCmd.param == 'undefined')
                    {
                        continue;
                    }
                    for (let m = 0; m < this.deleteCmd.param.length; m++) 
                    {
                        if(typeof this.deleteCmd.dataprm == 'undefined')
                        {
                            this.deleteCmd.value.push(this._deleteList[i][this.deleteCmd.param[m].split(':')[0]]);
                        }
                        else
                        {
                            this.deleteCmd.value.push(this._deleteList[i][this.deleteCmd.dataprm[m]]);
                        }
                    }

                    this._deleteList.splice(i,1);
                }
            }

            if(typeof this.deleteCmd != 'undefined' && typeof this.deleteCmd.value != 'undefined' && this.deleteCmd.value.length > 0)
            {
                let TmpDeleteData = await this.sql.execute(this.deleteCmd)

                if(typeof TmpDeleteData.result.err == 'undefined')
                {
                    this.deleteCmd.value = [];
                }
                else
                {
                    console.log(TmpDeleteData.result.err)
                }   
            }            
               
            resolve();
        });
    }
    toArray()
    {
        let tmpArr = [];
        for (let i = 0; i < this.length; i++) 
        {
            tmpArr.push(this[i])                                    
        }

        return tmpArr;
    }
    import(pData)
    {
        for (let i = 0; i < pData.length; i++) 
        {
            this.push(pData[i],false);
        }
    }
    columns()
    {
        let tmpObj = {}
        if(this.length > 0)
        {
            for (let i = 0; i < Object.keys(this[0]).length; i++) 
            {
                let tmp = new Object(); 
                tmp[Object.keys(this[0])[i]] = {notNull:false};
                Object.assign(tmpObj,tmp)
            }
        }
        return tmpObj;
    }
}
export class param extends datatable
{
    constructor()
    {
        super()  
        this.meta = null;

        if(arguments.length > 0)
        {            
            this.meta = arguments[0]
        }
    }
    add()
    {
        if(arguments.length == 1 && typeof arguments[0] == 'object')
        {
            let tmpItem =
            {
                TYPE:typeof arguments[0].TYPE == 'undefined' ? -1 : arguments[0].TYPE,
                ID:typeof arguments[0].ID == 'undefined' ? '' : arguments[0].ID,
                VALUE:typeof arguments[0].VALUE == 'undefined' ? '' : JSON.stringify(arguments[0].VALUE),
                SPECIAL:typeof arguments[0].SPECIAL == 'undefined' ? '' : arguments[0].SPECIAL,
                USERS:typeof arguments[0].USERS == 'undefined' ? '' : arguments[0].USERS,
                PAGE:typeof arguments[0].PAGE == 'undefined' ? '' : arguments[0].PAGE,
                ELEMENT:typeof arguments[0].ELEMENT == 'undefined' ? '' : arguments[0].ELEMENT,
                APP:typeof arguments[0].APP == 'undefined' ? '' : arguments[0].APP,
            }
            this.push(tmpItem)
        }
    }
    load()
    {
        return new Promise(async resolve => 
        {
            if(arguments.length == 1 && typeof arguments[0] == 'object')
            {
                this.selectCmd = 
                {
                    query : "SELECT * FROM PARAM WHERE PAGE = @PAGE AND APP = @APP AND ((USERS = @USERS) OR (@USERS = '')) AND " +
                            "((TYPE = @TYPE) OR (@TYPE = -1)) AND ((SPECIAL = @SPECIAL) OR (@SPECIAL = '')) AND ((ELEMENT = @ELEMENT) OR (@ELEMENT = ''))" ,
                    param : ['PAGE:string|25','APP:string|50','USERS:string|25','TYPE:int','SPECIAL:string|150','ELEMENT:string|250'],
                    value : [
                                typeof arguments[0].PAGE == 'undefined' ? '' : arguments[0].PAGE, 
                                typeof arguments[0].APP == 'undefined' ? '' : arguments[0].APP,
                                typeof arguments[0].USERS == 'undefined' ? '' : arguments[0].USERS,
                                typeof arguments[0].TYPE == 'undefined' ? -1 : arguments[0].TYPE,
                                typeof arguments[0].SPECIAL == 'undefined' ? '' : arguments[0].SPECIAL,
                                typeof arguments[0].ELEMENT == 'undefined' ? '' : arguments[0].ELEMENT
                            ]
                } 
                await this.refresh();
            }
            resolve(this);
        });
    }
    save()
    {
        return new Promise(async resolve => 
        {
            this.insertCmd = 
            {
                query : "EXEC [dbo].[PRD_PARAM_INSERT] " + 
                        "@TYPE = @PTYPE, " + 
                        "@ID = @PID, " + 
                        "@VALUE = @PVALUE, " + 
                        "@SPECIAL = @PSPECIAL, " + 
                        "@USERS = @PUSERS, " + 
                        "@PAGE = @PPAGE, " + 
                        "@ELEMENT = @PELEMENT, " + 
                        "@APP = @PAPP ", 
                param : ['PTYPE:int','PID:string|100','PVALUE:string|max','PSPECIAL:string|150','PUSERS:string|25','PPAGE:string|25','PELEMENT:string|250','PAPP:string|50'],
                dataprm : ['TYPE','ID','VALUE','SPECIAL','USERS','PAGE','ELEMENT','APP']
            } 

            this.updateCmd = 
            {
                query : "EXEC [dbo].[PRD_PARAM_UPDATE] " + 
                        "@GUID = @PGUID, " + 
                        "@TYPE = @PTYPE, " + 
                        "@ID = @PID, " + 
                        "@VALUE = @PVALUE, " + 
                        "@SPECIAL = @PSPECIAL, " + 
                        "@USERS = @PUSERS, " + 
                        "@PAGE = @PPAGE, " + 
                        "@ELEMENT = @PELEMENT, " + 
                        "@APP = @PAPP ", 
                param : ['PGUID:string|50','PTYPE:int','PID:string|100','PVALUE:string|max','PSPECIAL:string|150','PUSERS:string|25','PPAGE:string|25','PELEMENT:string|250','PAPP:string|50'],
                dataprm : ['GUID','TYPE','ID','VALUE','SPECIAL','USERS','PAGE','ELEMENT','APP']
            } 
            await this.insert();
            await this.update(); 
            resolve();
        });
    }
    filter()
    {
        if(arguments.length == 1 && typeof arguments[0] == 'object')
        {
            let tmpData = this.toArray();
            let tmpMeta = [...this.meta];
            //PARAMETRENİN META DATASI FİLİTRELENİYOR.
            if(this.meta != null && this.meta.length > 0)
            {
                for (let i = 0; i < Object.keys(arguments[0]).length; i++) 
                {
                    let tmpKey = Object.keys(arguments[0])[i]
                    let tmpValue = Object.values(arguments[0])[i]

                    if(tmpKey != "USERS")
                    {
                        tmpMeta = tmpMeta.filter(x => x[tmpKey] === tmpValue)
                    }
                }
            }
            //DATA FİLİTRELENİYOR.
            if(this.length > 0)
            {
                for (let i = 0; i < Object.keys(arguments[0]).length; i++) 
                {
                    let tmpKey = Object.keys(arguments[0])[i]
                    let tmpValue = Object.values(arguments[0])[i]
                    tmpData = tmpData.filter(x => x[tmpKey] === tmpValue)
                }                
            }

            let tmpPrm = new param(tmpMeta)
            tmpPrm.import(tmpData)
            return tmpPrm;
        }
        return this;
    }
    getValue()
    {        
        // DB İÇERİSİNDEKİ PARAMETRE DEĞERİ GERİ DÖNDÜRÜLÜYOR.
        if(this.length > 0)
        {
            // EĞER PARAMETRE OLARAK HİÇBİRŞEY GELMEDİYSE SIFIRINCI SATIRI.
            if(arguments.length == 0)
            {
                return JSON.parse(this[0].VALUE)
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 1 && typeof arguments[0] == 'number')
            {
                try 
                {
                    return JSON.parse(this[arguments[0]].VALUE)
                } catch (error) 
                {
                    console.log('error param.toValue() : ' + error)
                }
            }                    
        }
        // DB İÇERİSİNDE KAYIT YOKSA META İÇERİSİNDEKİ DEĞER DÖNDÜRÜLÜYOR.
        else if(this.length == 0 && this.meta != null && this.meta.length > 0)
        {
            return JSON.parse(JSON.stringify(this.meta[0].VALUE))
        }

        return '';
    }
    setValue()
    {
        // BU FONKSİYON 1 VEYA 2 PARAMETRE ALABİLİR. BİR PARAMETRE ALIRSA SIFIRINCI SATIRA PARAMETRE DEĞERİ SET EDİLİR. İKİ PARAMETRE ALIRSA BİRİNCİ PARAMETRE SATIR İKİNCİ PARAMETRE SET EDİLECEK DEĞERDİR.
        if(this.length > 0)
        {
            // EĞER PARAMETRE OLARAK HİÇBİRŞEY GELMEDİYSE SIFIRINCI SATIRA SET EDİLİYOR
            if(arguments.length == 1)
            {
                this[0].VALUE = JSON.stringify(arguments[0]);
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 2 && typeof arguments[0] == 'number')
            {
                try 
                {
                    this[arguments[0]].VALUE = JSON.stringify(arguments[0])
                } catch (error) 
                {
                    console.log('error param.toValue() : ' + error)
                }
            }
        }
    }
}
export class access extends datatable
{
    constructor()
    {
        super()

        this.meta = null;

        if(arguments.length > 0)
        {
            this.meta = arguments[0]
        }
    }
    add()
    {
        if(arguments.length == 1 && typeof arguments[0] == 'object')
        {
            let tmpItem =
            {   
                ID:typeof arguments[0].ID == 'undefined' ? '' : arguments[0].ID,             
                VALUE:typeof arguments[0].VALUE == 'undefined' ? '' : JSON.stringify(arguments[0].VALUE),
                SPECIAL:typeof arguments[0].SPECIAL == 'undefined' ? '' : arguments[0].SPECIAL,
                USERS:typeof arguments[0].USERS == 'undefined' ? '' : arguments[0].USERS,
                PAGE:typeof arguments[0].PAGE == 'undefined' ? '' : arguments[0].PAGE,
                ELEMENT:typeof arguments[0].ELEMENT == 'undefined' ? '' : arguments[0].ELEMENT,
                APP:typeof arguments[0].APP == 'undefined' ? '' : arguments[0].APP,
            }
            this.push(tmpItem)
        }
    }
    load()
    {
        return new Promise(async resolve => 
        {
            if(arguments.length == 1 && typeof arguments[0] == 'object')
            {
                this.selectCmd = 
                {
                    query : "SELECT * FROM ACCESS WHERE PAGE = @PAGE AND APP = @APP AND ((USERS = @USERS) OR (@USERS = '')) AND " +
                            "((SPECIAL = @SPECIAL) OR (@SPECIAL = '')) AND ((ELEMENT = @ELEMENT) OR (@ELEMENT = ''))" ,
                    param : ['PAGE:string|25','APP:string|50','USERS:string|25','SPECIAL:string|150','ELEMENT:string|250'],
                    value : [
                                typeof arguments[0].PAGE == 'undefined' ? '' : arguments[0].PAGE, 
                                typeof arguments[0].APP == 'undefined' ? '' : arguments[0].APP,
                                typeof arguments[0].USERS == 'undefined' ? '' : arguments[0].USERS,
                                typeof arguments[0].SPECIAL == 'undefined' ? '' : arguments[0].SPECIAL,
                                typeof arguments[0].ELEMENT == 'undefined' ? '' : arguments[0].ELEMENT
                            ]
                } 
                await this.refresh();
            }
            resolve(this);
        });
    }
    save()
    {
        return new Promise(async resolve => 
        {
            this.insertCmd = 
            {
                query : "EXEC [dbo].[PRD_ACCESS_INSERT] " + 
                        "@ID = @PID, " + 
                        "@VALUE = @PVALUE, " + 
                        "@SPECIAL = @PSPECIAL, " + 
                        "@USERS = @PUSERS, " + 
                        "@PAGE = @PPAGE, " + 
                        "@ELEMENT = @PELEMENT, " + 
                        "@APP = @PAPP ", 
                param : ['PID:string|100','PVALUE:string|max','PSPECIAL:string|150','PUSERS:string|25','PPAGE:string|25','PELEMENT:string|250','PAPP:string|50'],
                dataprm : ['ID','VALUE','SPECIAL','USERS','PAGE','ELEMENT','APP']
            } 

            this.updateCmd = 
            {
                query : "EXEC [dbo].[PRD_ACCESS_UPDATE] " + 
                        "@GUID = @PGUID, " + 
                        "@ID = @PID, " + 
                        "@VALUE = @PVALUE, " + 
                        "@SPECIAL = @PSPECIAL, " + 
                        "@USERS = @PUSERS, " + 
                        "@PAGE = @PPAGE, " + 
                        "@ELEMENT = @PELEMENT, " + 
                        "@APP = @PAPP ", 
                param : ['PGUID:string|50','PID:string|100','PVALUE:string|max','PSPECIAL:string|150','PUSERS:string|25','PPAGE:string|25','PELEMENT:string|250','PAPP:string|50'],
                dataprm : ['GUID','ID','VALUE','SPECIAL','USERS','PAGE','ELEMENT','APP']
            } 
            await this.insert();
            await this.update(); 
            resolve();
        });
    }
    filter()
    {
        if(arguments.length == 1 && typeof arguments[0] == 'object')
        {
            let tmpData = this.toArray();
            let tmpMeta = [...this.meta];
            //PARAMETRENİN META DATASI FİLİTRELENİYOR.
            if(this.meta != null && this.meta.length > 0)
            {
                for (let i = 0; i < Object.keys(arguments[0]).length; i++) 
                {
                    let tmpKey = Object.keys(arguments[0])[i]
                    let tmpValue = Object.values(arguments[0])[i]

                    if(tmpKey != "USERS")
                    {
                        tmpMeta = tmpMeta.filter(x => x[tmpKey] === tmpValue)
                    }
                }
            }
            //DATA FİLİTRELENİYOR.
            if(this.length > 0)
            {
                for (let i = 0; i < Object.keys(arguments[0]).length; i++) 
                {
                    let tmpKey = Object.keys(arguments[0])[i]
                    let tmpValue = Object.values(arguments[0])[i]
                    tmpData = tmpData.filter(x => x[tmpKey] === tmpValue)
                }                
            }

            let tmpAcs = new access(tmpMeta)
            tmpAcs.import(tmpData)
            return tmpAcs;
        }
        return this;
    }
    getValue()
    {
        // DB İÇERİSİNDEKİ PARAMETRE DEĞERİ GERİ DÖNDÜRÜLÜYOR.
        if(this.length > 0)
        {
            // EĞER PARAMETRE OLARAK HİÇBİRŞEY GELMEDİYSE SIFIRINCI SATIRI.
            if(arguments.length == 0)
            {
                return JSON.parse(this[0].VALUE)
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 1 && typeof arguments[0] == 'number')
            {
                try 
                {
                    return JSON.parse(this[arguments[0]].VALUE)
                } catch (error) 
                {
                    console.log('error param.toValue() : ' + error)
                }
            }                    
        }
         // DB İÇERİSİNDE KAYIT YOKSA META İÇERİSİNDEKİ DEĞER DÖNDÜRÜLÜYOR.
         else if(this.length == 0 && this.meta != null && this.meta.length > 0)
         {
            return JSON.parse(JSON.stringify(this.meta[0].VALUE))
         }
        return '';
    }
    setValue()
    {
        // BU FONKSİYON 1 VEYA 2 PARAMETRE ALABİLİR. BİR PARAMETRE ALIRSA SIFIRINCI SATIRA PARAMETRE DEĞERİ SET EDİLİR. İKİ PARAMETRE ALIRSA BİRİNCİ PARAMETRE SATIR İKİNCİ PARAMETRE SET EDİLECEK DEĞERDİR.
        if(this.length > 0)
        {
            // EĞER PARAMETRE OLARAK HİÇBİRŞEY GELMEDİYSE SIFIRINCI SATIRA SET EDİLİYOR
            if(arguments.length == 1)
            {
                this[0].VALUE = JSON.stringify(arguments[0]);
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 2 && typeof arguments[0] == 'number')
            {
                try 
                {
                    this[arguments[0]].VALUE = JSON.stringify(arguments[0])
                } catch (error) 
                {
                    console.log('error param.toValue() : ' + error)
                }
            }
        }
    }
}
Object.setPrototypeOf(datatable.prototype,Array.prototype);
//* SAYI İÇERİSİNDEKİ ORAN. ÖRN: 10 SAYISININ YÜZDE 18 İ 1.8. */
Number.prototype.rateInc = function(pRate,pDigit)
{
    if(typeof pRate != 'undefined')
    {
        if(typeof pDigit != 'undefined')
            return (this * (pRate / 100)).toFixed(pDigit)
        else
            return this * (pRate / 100)
    }
    return 0
}
//* SAYI İÇERİSİNDEKİ DAHİLİ ORANI. ÖRN: 10 SAYISININ YÜZDE 18 İN DAHİLİ SONUCU 11.8. */
Number.prototype.rateExc = function(pRate,pDigit)
{
    if(typeof pRate != 'undefined')
    {
        if(typeof pDigit != 'undefined')
            return (this * ((pRate / 100) + 1)).toFixed(pDigit)
        else
            return this * ((pRate / 100) + 1)
    }
    return 0
}
//* SAYI İÇERİSİNDEKİ ORANIN ÇIKARILMIŞ SONUCU. ÖRN: 11.8 SAYISININ YÜZDE 18 ÇIKARILMIŞ SONUCU 10. */
Number.prototype.rateInNum = function(pRate,pDigit)
{
    if(typeof pRate != 'undefined')
    {
        if(typeof pDigit != 'undefined')
            return (this / ((pRate / 100) + 1)).toFixed(pDigit)
        else
            return this / ((pRate / 100) + 1)
    }
    return 0
}
//* B SAYISININ A SAYISINA ORANI ÖRN: 1.8 SAYISININ, 11.8 SAYISIN İÇERİSİNDEKİ ORANI %18 */
Number.prototype.rate2Num = function(pNum,pDigit)
{
    if(typeof pNum != 'undefined')
    {
        if(typeof pDigit != 'undefined')
        {
            return ((pNum / (this - pNum)) * 100).toFixed(pDigit)
        }
        else
        {
            return (pNum / (this - pNum)) * 100
        }                 
    }
    return 0
}