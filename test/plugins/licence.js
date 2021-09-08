import core from '../../index.js'
import macid from 'node-machine-id'
import client from 'socket.io-client';
import moment from 'moment'
import fs from 'fs'
import path from 'path'

class licence
{
    constructor()
    {
        this.socket = null;
        this.core = core.default.instance;
        this.macid = macid.machineIdSync();
        this.path = path.resolve(path.dirname('')) + "\\plugins\\licence\\"
        this.data = [];
        this.status = false;
        this.host = 'http://172.16.97.250:8080'   
        
        this.core.io_manager.io.on('connection',(pSocket) =>
        {
            pSocket.on('lic',(pParam,pCallback) =>
            {
                let tmpCmd = pParam.cmd
                if(tmpCmd == 'get_macid')
                {
                    pCallback(this.macid);
                }
                else if(tmpCmd == 'get_lic')
                {
                    pCallback(this.data);
                }
            })
        })
    }
    get()
    {
        return new Promise(resolve =>
        {
            this.socket = new client(this.host,{'timeout':2000, 'connect timeout': 2000})
            this.socket.on('connect', () => 
            {
                this.socket.emit('licence_check',{MacId:this.macid},async (pData) =>
                {
                    if(pData.length > 0)
                    {
                        this.data = pData
                        this.status = true
                        fs.writeFileSync(this.path + "lic",JSON.stringify(pData))
                        resolve(true)
                        return;
                    }
                    else
                    {
                        this.data = pData
                        this.status = false
                        resolve(false)
                        return;
                    }
                });
            });
            //EĞER LİSANS SUNUCUYA BAĞLANAMIYORSA 
            setTimeout(async ()=>
            {
                if(this.socket.connected)
                {
                    return;
                }

                try
                {
                    let tmpData = fs.readFileSync(this.path + "lic",{encoding:'utf8'});
                    this.data = JSON.parse(tmpData)
                    this.status = true;
                    resolve(true);
                    return;
                }
                catch (err) 
                {
                    this.data = [];
                    this.status = false;
                    resolve(false);
                    return;
                }
            },5000);
        });
    }
    getUserCount()
    {
        if(this.data.length > 0)
        {
            if(typeof this.data.find(x => x.APP === arguments[0]) != 'undefined')
            {
                return this.data.find(x => x.APP === arguments[0]).USER_COUNT;
            }
        }

        return 0;
    }
}
async function main()
{
    let tmpLic = new licence()
    //let stat = await tmpLic.check();
    await tmpLic.get()
    
    tmpLic.core.on('Logined',(pResult)=>
    {
        if(typeof pResult.socket.userInfo == 'undefined' || pResult.socket.userInfo.APP == 'ADMIN')
        {
            return;
        }
        //LISANS KONTROL EDILIYOR EĞER PROBLEM VARSA KULLANICI DISCONNECT EDİLİYOR.
        if(pResult.result.length > 0)
        {
            if(tmpLic.status)
            {
                if(tmpLic.getUserCount(pResult.socket.userInfo.APP) < tmpLic.core.io_manager.clients(pResult.socket.userInfo.APP).length)
                {
                    tmpLic.core.log.msg('Licensed user limit exceeded','Licence');
                    pResult.socket.emit('general',{id:"M001",data:"Licensed user limit exceeded"});
                    //pResult.socket.disconnect();
                    return;
                }
                else
                {
                    tmpLic.core.log.msg('Client connected to the WebSocket','Socket');
                }
            }
            else
            {
                tmpLic.core.log.msg('Waiting for response from license server','Licence');
                pResult.socket.emit('general',{id:"M001",data:"Waiting for response from license server"});
                //pResult.socket.disconnect();
                return;
            }
        }
        //***************************************************************************/
    })
    
    return tmpLic
}

export const _licence = main()