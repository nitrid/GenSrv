import query from './query.js'
import dblocal from './local/dblocal.js'

let instance = null;
let socket = io(window.location.origin);

export class dbcore
{    
    constructor()
    {
        this.mode = 'online';
        this.#ioEvents();
        this.dblocal = new dblocal(this)
        instance = this;                
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
            //PARAMETRE UNDEFINED KONTROLÜ
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
export const coreobj = new dbcore()