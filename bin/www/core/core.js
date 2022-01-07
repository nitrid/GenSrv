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
    waitUntil()
    {
        return new Promise(async resolve => 
        {
            setTimeout(() => 
            {
                resolve()
            }, typeof arguments[0] == 'undefined' ? 0 : arguments[0]);
        })
    }
}
export class dataset
{    
    constructor(pName)
    {
        this.listeners = Object();
        this.sql = core.instance.sql;    

        if(typeof pName == 'undefined')
            this.name = pName;
        else
            this.name = 'dataset'
        
        this.dts = [];
    }
    //#region  "EVENT"
    on(pEvt,pCallback) 
    {
        for(let i = 0;i < this.length; i++)
        {
            let tmpName = this.get(i).name;
            if(typeof this.listeners[tmpName] == 'undefined')
            {
                this.listeners[tmpName] = {}
            }

            if (!this.listeners[tmpName].hasOwnProperty(pEvt))
            {
                this.listeners[tmpName][pEvt] = Array();
                this.listeners[tmpName][pEvt].push(pCallback); 
            }
        }
    }
    emit(pEvt,pName,pParams)
    {
        let tmpListener = this.listeners[pName]
        
        if (typeof tmpListener != 'undefined' && pEvt in tmpListener) 
        {
            let callbacks = this.listeners[pName][pEvt];
            for (var x in callbacks)
            {
                callbacks[x](pName,pParams);
            }
        } 
    }
    //#endregion
    get length()
    {
        return this.dts.length;
    }
    get()
    {
        //PARAMETRE OLARAK INDEX YADA TABLO ADI.
        if(arguments.length > 0 && typeof arguments[0] == 'string')
        {
            return this.dts.find(x => x.name == arguments[0])
        }
        else if (arguments.length > 0 && typeof arguments[0] == 'number')
        {
            return this.dts[arguments[0]]
        }

        return
    }
    async add(pTable)
    {
        if(typeof pTable != 'undefined')
        {
            let tmpDt = null
            if(typeof pTable == 'string')
            {
                tmpDt = new datatable(pTable)
            }
            else if(typeof pTable == 'object')
            {
                tmpDt = pTable;
            }
            
            tmpDt.on('onNew',async (e)=>
            {
                await core.instance.util.waitUntil(0)
                this.emit('onNew',tmpDt.name,e)
            })
            tmpDt.on('onAddRow',async (e)=>
            {
                await core.instance.util.waitUntil(0)
                this.emit('onAddRow',tmpDt.name,e)
            })
            tmpDt.on('onEdit',async (e)=>
            {
                await core.instance.util.waitUntil(0)
                this.emit('onEdit',tmpDt.name,e)
            })
            tmpDt.on('onRefresh',async ()=>
            {
                await core.instance.util.waitUntil(0)
                this.emit('onRefresh',tmpDt.name)
            })
            tmpDt.on('onClear',async ()=>
            {
                await core.instance.util.waitUntil(0)
                this.emit('onClear',tmpDt.name)
            })
            
            this.remove(tmpDt.name)
            this.dts.push(tmpDt)

        }
    }
    update()
    {
        return new Promise(async resolve => 
        {
            let tmpQuerys = [];
            for (let i = 0; i < this.length; i++) 
            {
                let tmp = this.get(i).toCommands();
                tmp.forEach(e => 
                {
                    tmpQuerys.push(e)    
                });
            }

            let tmpResult = await this.sql.execute(tmpQuerys)
            if(typeof tmpResult.result.err == 'undefined')
            {
                for (let i = 0; i < this.length; i++) 
                {
                    let tmp = this.get(i);
                    tmp.forEach(e => 
                    {
                        Object.setPrototypeOf(e,{stat:''})   
                    });
                }
                
                resolve(0)
            }
            else
            {
                console.log(tmpResult.result.err)
                resolve(1)
            } 
        });
    }
    remove(pName)
    {
        
        //EĞER PARAMETRE BOŞ GÖNDERİLİRSE TÜM DATASET TEMİZLENİYOR.
        if(typeof pName != 'undefined')
        {
            for (let i = 0; i < this.dts.length; i++) 
            {
                if(this.dts[i].name == pName)
                {
                    this.listeners[pName] = {}
                    this.dts.splice(i,1);
                }
            }
        }
        else
        {
            this.dts.splice(0,this.dts.length);
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
        this._groupList = [];
        //EDİT SIRASINDA DEĞİŞTİĞİNİ ALGILAMAMASINI İSTEDİĞİN KOLON LİSTESİ.
        this.noColumnEdit = []
        this.listeners = Object();
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
    static uuidv4() 
    {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        ).toString().toUpperCase();
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
    push(pItem,pIsNew)
    {     
        pItem = new Proxy(pItem, 
        {
            get: function(target, prop, receiver) 
            {
                return target[prop];
            },
            set: (function(target, prop, receiver) 
            {            
                if(target[prop] != receiver)
                {
                    target[prop] = receiver
                    this.emit('onEdit',{data:{[prop]:receiver},rowIndex:this.findIndex(x => x === pItem),rowData:pItem});
                    //EĞER EDİT EDİLDİĞİNDE STATE DURUMUNUN DEĞİŞMEMESİNİ İSTEDİĞİN KOLON VARSA BURDA KONTROL EDİLİYOR
                    if(target.stat != 'new' && typeof this.noColumnEdit.find(x => x == prop) == 'undefined')
                    {
                        //EDİT EDİLMİŞ KOLON VARSA BURDA editColumn DEĞİŞKENİNE SET EDİLİYOR.
                        let tmpColumn = []
                        if(typeof target.editColumn != 'undefined')
                        {
                            tmpColumn = [...target.editColumn];
                        }
                        tmpColumn.push(prop)
                        Object.setPrototypeOf(target,{stat:'edit',editColumn:tmpColumn})                    
                    }
                }
                //return target[prop];
                return true;
            }).bind(this)
        });
        
        if(typeof pIsNew == 'undefined' || pIsNew)
        {
            Object.setPrototypeOf(pItem,{stat:'new'})

            this.emit('onNew',pItem)
        }

        this.emit('onAddRow',pItem);
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
        this.emit('onClear')
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
                        this.emit('onRefresh')
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
    toCommands()
    {
        let tmpStat = ['new','edit']
        let tmpQueryList = [];

        if(typeof arguments[0] != 'undefined' && arguments[0] != '')
        {
            tmpStat = arguments[0].split(',')
        }

        for (let i = 0; i < this.length; i++) 
        {
            if(typeof this[i].stat != 'undefined' && typeof tmpStat.find(x => x == this[i].stat))
            {
                let tmpQuery = undefined;
                if(this[i].stat == 'new')
                {
                    tmpQuery = {...this.insertCmd}
                }
                else if(this[i].stat == 'edit')
                {
                    tmpQuery = {...this.updateCmd}
                }
            
                if(typeof tmpQuery != 'undefined')
                {
                    tmpQuery.value = [];
                } 
                
                if(typeof tmpQuery != 'undefined')
                {
                    if(typeof tmpQuery.param == 'undefined')
                    {
                        continue;
                    }
                    for (let m = 0; m < tmpQuery.param.length; m++) 
                    {         
                        if(typeof tmpQuery.dataprm == 'undefined')
                        {
                            tmpQuery.value.push(this[i][tmpQuery.param[m].split(':')[0]]);
                        }
                        else
                        {
                            tmpQuery.value.push(this[i][tmpQuery.dataprm[m]]);
                        }                                                       
                    }
                }
                if(typeof tmpQuery != 'undefined' && typeof tmpQuery.value != 'undefined' && tmpQuery.value.length > 0)
                {       
                    tmpQuery.rowData = this[i]
                    tmpQueryList.push(tmpQuery)
                }
            }
        }

        return tmpQueryList;
    }
    update()
    {
        return new Promise(async resolve => 
        {
            let tmpQuerys = undefined;

            if(typeof arguments[0] == 'undefined' || arguments[0] == '')
            {
                tmpQuerys = this.toCommands();
            }
            else
            {
                tmpQuerys = this.toCommands(arguments[0]);
            }

            let tmpResult = await this.sql.execute(tmpQuerys)
            if(typeof tmpResult.result.err == 'undefined')
            {
                for (let i = 0; i < this.length; i++) 
                {
                    Object.setPrototypeOf(this[i],{stat:''})
                }
                resolve(0)
            }
            else
            {
                console.log(tmpResult.result.err)
                resolve(1)
            } 
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
                    resolve(0)
                }
                else
                {
                    console.log(TmpDeleteData.result.err)
                    resolve(1)
                }   
            }            
            resolve(1);
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
    groupBy(pKey)
    {
        if(typeof pKey == 'string')
        {
            pKey = pKey.split(',')
        }

        let helper = {};
        let tmpGrpData = this.reduce(function(r,o)
        {
            let key = '';
            for (let i = 0; i < pKey.length; i++) 
            {
                if(i < pKey.length - 1)
                {
                    key += o[pKey[i]] + '-'
                }
                else
                {
                    key += o[pKey[i]]
                }                
            }

            if(!helper[key]) 
            {
                helper[key] = Object.assign({}, o);
                r.push(helper[key]);                
            }
            else 
            {
                helper[key] = o;
            }
            return r;
        },[])
        
        let tmpDt = new datatable();
        tmpDt.import(tmpGrpData)
        return tmpDt
    }
    where()
    {
        if(arguments.length > 0)
        {
            let tmpData = this.toArray();
            
            if(Object.keys(arguments[0]).length > 0)
            {
                let tmpKey = Object.keys(arguments[0])[0]
                let tmpValue = Object.values(arguments[0])[0]
                tmpData = tmpData.filter(x => x[tmpKey] === tmpValue)
            }

            let tmpDt = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
            tmpDt.clear()
            tmpDt.import(tmpData)
            
            return tmpDt;
        }
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
            if(this.filter({ID:arguments[0].ID}).length > 0)
            {
                this.filter({ID:arguments[0].ID}).setValue(arguments[0].VALUE)
            }
            else
            {
                let tmpItem =
                {
                    TYPE:typeof arguments[0].TYPE == 'undefined' ? -1 : arguments[0].TYPE,
                    ID:typeof arguments[0].ID == 'undefined' ? '' : arguments[0].ID,
                    VALUE:typeof arguments[0].VALUE == 'undefined' ? '' : typeof arguments[0].VALUE == 'object' ? JSON.stringify(arguments[0].VALUE) : arguments[0].VALUE,
                    SPECIAL:typeof arguments[0].SPECIAL == 'undefined' ? '' : arguments[0].SPECIAL,
                    USERS:typeof arguments[0].USERS == 'undefined' ? '' : arguments[0].USERS,
                    PAGE:typeof arguments[0].PAGE == 'undefined' ? '' : arguments[0].PAGE,
                    ELEMENT:typeof arguments[0].ELEMENT == 'undefined' ? '' : arguments[0].ELEMENT,
                    APP:typeof arguments[0].APP == 'undefined' ? '' : arguments[0].APP,
                }
                this.push(tmpItem)    
            }
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
                return JSON.parse(JSON.stringify(this[0].VALUE))
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 1 && typeof arguments[0] == 'number')
            {
                try 
                {
                    return JSON.parse(JSON.stringify(this[arguments[0]].VALUE))
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
                this[0].VALUE = typeof arguments[0] == 'object' ? JSON.stringify(arguments[0]) : arguments[0];
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 2 && typeof arguments[0] == 'number')
            {
                try 
                {
                    this[arguments[0]].VALUE = typeof arguments[0] == 'object' ? JSON.stringify(arguments[0]) : arguments[0];
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
                return JSON.parse(JSON.stringify(this[0].VALUE))
            }
            // EĞER PARAMETRE GELMİŞ İSE VE GELEN VERİ NUMBER İSE VERİLEN SATIR I DÖNDÜR.
            else if(arguments.length == 1 && typeof arguments[0] == 'number')
            {
                try 
                {
                    return JSON.parse(JSON.stringify(this[arguments[0]].VALUE))
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
//* DİZİ İÇİN GROUP BY */
Array.prototype.toGroupBy = function(pKey)
{
    return this.reduce(function(rv, x) 
    {
        (rv[x[pKey]] = rv[x[pKey]] || []).push(x);
        return rv;
    }, {});
}
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