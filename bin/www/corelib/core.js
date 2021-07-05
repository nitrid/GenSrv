import query from './query.js'
import dblocal from './local/dblocal.js'
import './socket.io.min.js'

let instance = null;
let socket = io(window.location.origin);

export class datatable extends Array
{
    constructor(pName)
    {        
        super()
        this.selectCmd;
        this.insertCmd;
        this.updateCmd;
        this.deleteCmd;

        if(typeof pName != 'undefined')
        {
            this.name = pName;
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
            Object.setPrototypeOf(pItem,{stat:"new"})
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
                let TmpData = await instance.sqlExecute(this.selectCmd)
                if(typeof TmpData.result.err == 'undefined')
                {
                    for (let i = 0; i < TmpData.result.recordset.length; i++) 
                    {                    
                        this.push(TmpData.result.recordset[i],false)   
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
    update()
    {
        return new Promise(async resolve => 
        {
            if(typeof this.updateCmd != 'undefined')
            {
                this.updateCmd.value = [];
            }
            if(typeof this.insertCmd != 'undefined')
            {
                this.insertCmd.value = [];
            }
            
            for (let i = 0; i < this.length; i++) 
            {
                if(typeof this[i].stat != 'undefined')
                {
                    if(this[i].stat == 'edit')
                    {
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
                    else if(this[i].stat == 'new')
                    {
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
            if(typeof this.updateCmd != 'undefined' && typeof this.updateCmd.value != 'undefined' && this.updateCmd.value.length > 0)
            {
                let TmpUpdateData = await instance.sqlExecute(this.updateCmd)

                if(typeof TmpUpdateData.result.err == 'undefined')
                {
                    //this.updateCmd.value = [];
                }
                else
                {
                    console.log(TmpUpdateData.result.err)
                }   
            }
            
            if(typeof this.insertCmd != 'undefined' && typeof this.insertCmd.value != 'undefined' && this.insertCmd.value.length > 0)
            {
                let TmpInsertData = await instance.sqlExecute(this.insertCmd)

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
}
export class dataset
{    
    constructor()
    {
        this.datatables = [];
    }
    add(pTable)
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
export default class core
{    
    #dataset;
    constructor()
    {
        this.mode = 'online';
        this.#ioEvents();
        // this.dblocal = new dblocal(this)
        instance = this; 
        //this.#dataset = new dataset();
        //socket.connect(window.location.origin)
    }
    get instance()
    {
        return instance;
    }
    get socket()
    {
        return socket;
    }
    get query()
    {
        return query;
    }
    get dataset()
    {
        return this.#dataset;
    }
    on(pEvt, pCallback) 
    {
        if (!this.#listeners.hasOwnProperty(pEvt))
        this.#listeners[pEvt] = Array();

        this.#listeners[pEvt].push(pCallback); 
    }
    emit(pEvt, pParams)
    {
        return this.#eventTrigger(pEvt,pParams);
    }
    sqlExecute(pQuery)
    {
        return new Promise(resolve => 
        {
            //PARAMETRE UNDEFINED CONTROL
            if(typeof(pQuery.value) != 'undefined')
            {
                for (let i = 0; i < pQuery.value.length; i++) 
                {
                    if(typeof pQuery.value[i] == 'undefined')
                    {
                        resolve({result : {err: "Parametre değerlerinde problem oluştu ! "}})
                    }
                }
            }

            if(this.mode == 'online')
            {
                socket.emit('sql',pQuery,(data) =>
                {
                   resolve(data); 
                });
            }
        });
    }
    #ioEvents()
    {
        this.socket.on('connect',() => 
        {
            this.#eventTrigger('connect',()=>{})
        });
        this.socket.on('connect_error',(error) => 
        {
            this.#eventTrigger('connect_error',()=>{})
        });
        this.socket.on('error', (error) => 
        {
            this.#eventTrigger('connect_error',()=>{})
        });
    }
    //#region  "EVENT"
    #listeners = Object();
    #eventTrigger(pEvt, pParams) 
    {
        if (pEvt in this.#listeners) 
        {
            let callbacks = this.#listeners[pEvt];
            for (var x in callbacks)
            {
                callbacks[x](pParams);
            }
        } 
    }
    //#endregion
}
export const coreobj = new core();