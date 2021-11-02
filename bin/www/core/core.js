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
        
        if(arguments.length == 1 && typeof arguments[0] == 'string')
        {
            this.name = pName;
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
            this.sql = core.instance.sql;
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
                return target[prop];
            }
        });
        
        if(typeof pIsNew == 'undefined' || pIsNew)
        {
            Object.setPrototypeOf(pItem,{stat:'new'})
        }
        
        super.push(pItem)
    }
    removeAt(pIndex)
    {
        this.splice(pIndex,1);
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
                                this.insertCmd.value.push(this[i][this.insertCmd.param[m].split(':')[0]]);
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
                                this.updateCmd.value.push(this[i][this.updateCmd.param[m].split(':')[0]]);
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
    getSchema()
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
export class param
{
    constructor()
    {
        if(arguments.length > 0)
        {
            this.sql = arguments[0];
        }
        else
        {
            this.sql = core.instance.sql;
        }

        this.datatable = new datatable()
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