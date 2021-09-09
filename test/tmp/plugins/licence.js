import core from 'gensrv'
import macid from 'node-machine-id'
import client from 'socket.io-client';
import moment from 'moment'

class licence
{
    constructor()
    {
        this.socket = null;
        this.core = core.default.instance;
        this.macid = macid.machineIdSync();
        this.lic_data = [];
        this.user_count = 0;
        this.status = false;
        this.host = 'http://172.16.97.250:8080'           
    }
    check()
    {
        return new Promise(resolve =>
        {
            this.socket = new client(this.host,{'timeout':2000})
            this.socket.on('connect', () => 
            {
                this.socket.emit('licence_check',{MacId:this.macid},async (pData) =>
                {    
                    if(typeof pData.result.err == 'undefined' && pData.result.recordset.length > 0)
                    {
                        let TmpQuery = 
                        {
                            query: "DELETE FROM LICENCE WHERE MACID = @MACID AND APP = @APP",
                            param: ['MACID:string|100','APP:string|50'],
                            value: [this.macid,this.app]
                        }
                        
                        await this.core.sql.execute(TmpQuery);

                        for (let i = 0; i < pData.result.recordset.length; i++) 
                        {
                            let TmpData = pData.result.recordset[i]
                            TmpQuery = 
                            {
                                query:  "EXEC [dbo].[PRD_LICENCE_INSERT] " + 
                                        "@MACID = @PMACID, " + 
                                        "@USER_COUNT = @PUSER_COUNT, " + 
                                        "@CREATE_DATE = @PCREATE_DATE, " + 
                                        "@START_DATE = @PSTART_DATE, " + 
                                        "@FINISH_DATE = @PFINISH_DATE, " + 
                                        "@HIRE = @PHIRE, " + 
                                        "@APP = @PAPP, " + 
                                        "@PACKAGE = @PPACKAGE, " + 
                                        "@PACKAGE_ID = @PPACKAGE_ID, " + 
                                        "@PACKAGE_NAME = @PPACKAGE_NAME, " + 
                                        "@PAGE_ID = @PPAGE_ID, " + 
                                        "@PAGE_NAME = @PPAGE_NAME, " + 
                                        "@CONTENT_ELEMENT = @PCONTENT_ELEMENT, " + 
                                        "@CONTENT_SPECIAL = @PCONTENT_SPECIAL " ,
                                param:  ['PMACID:string|100','PUSER_COUNT:int','PCREATE_DATE:date','PSTART_DATE:date','PFINISH_DATE:date','PHIRE:bit',
                                        'PAPP:string|50','PPACKAGE:string|50','PPACKAGE_ID:string|50','PPACKAGE_NAME:string|100','PPAGE_ID:string|25','PPAGE_NAME:string|200',
                                        'PCONTENT_ELEMENT:string|250','PCONTENT_SPECIAL:string|max'],
                                value:  [TmpData.MACID,TmpData.USER_COUNT,TmpData.CREATE_DATE,TmpData.START_DATE,TmpData.FINISH_DATE,TmpData.HIRE,TmpData.APP,
                                        TmpData.PACKAGE,TmpData.PACKAGE_ID,TmpData.PACKAGE_NAME,TmpData.PAGE_ID,TmpData.PAGE_NAME,TmpData.CONTENT_ELEMENT,TmpData.CONTENT_SPECIAL]
                            }
                            await this.core.sql.execute(TmpQuery);
                        }
                        
                        this.lic_data = pData.result.recordset;
                        this.user_count = this.lic_data[0].USER_COUNT;
                        this.status = true;
                        resolve(true);
                        return;
                    }
                    else
                    {
                        this.lic_data = [];
                        this.user_count = 0;
                        this.status = false;
                        resolve(false);
                        return;
                    }
                })
            });
            //EĞER LİSANS SUNUCUYA BAĞLANAMIYORSA 
            setTimeout(async ()=>
            {
                if(this.socket.connected)
                {
                    return;
                }
                
                let TmpQuery = 
                {
                    query: "SELECT * FROM LICENCE WHERE MACID = @MACID AND APP = @APP",
                    param: ['MACID:string|100','APP:string|50'],
                    value: [this.macid,this.app]
                }

                let TmpData = await this.core.sql.execute(TmpQuery);
                
                if(typeof TmpData.result.err == 'undefined' && TmpData.result.recordset.length > 0)
                {
                    let TmpDiffDay = moment(new Date()).diff(moment(TmpData.result.recordset[0].DATE),'days');
                    if(TmpDiffDay > 15)
                    {
                        core.instance.log.msg('Please connect to the license server !','Licence')
                        this.lic_data = [];
                        this.user_count = 0;
                        this.status = false;
                        resolve(false);
                        return;
                    }
                    else
                    {
                        this.lic_data = TmpData.result.recordset;
                        this.user_count = this.lic_data[0].USER_COUNT;
                        this.status = true;
                        resolve(true);
                        return;
                    }
                }
                else
                {
                    this.lic_data = [];
                    this.user_count = 0;
                    this.status = false;
                    resolve(false);
                    return;
                }
            },5000)
        });
    }
}
async function main()
{
    let tmpLic = new licence()
    let stat = await tmpLic.check();
    
    tmpLic.core.on('Login',(pResult)=>
    {
        //LISANS KONTROL EDILIYOR EĞER PROBLEM VARSA KULLANICI DISCONNECT EDİLİYOR.
        if(pResult.result.length > 0)
        {
            if(tmpLic.status)
            {
                if(tmpLic.user_count < tmpLic.core.io_manager.clients(pResult.socket.userInfo.APP).length)
                {
                    tmpLic.core.log.msg('Licensed user limit exceeded','Licence');
                    pResult.socket.emit('general',{id:"M001",data:"Licensed user limit exceeded"});
                    pResult.socket.disconnect();
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
                pResult.socket.disconnect();
                return;
            }
        }
        //***************************************************************************/
    })
    
    return tmpLic
}

export const _licence = main()