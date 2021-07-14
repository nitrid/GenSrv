import builder from './builder.js'
import process from './process.js'

export default class dblocal 
{
    db = null;
    constructor(pDbCore)
    {
        this.dbcore = pDbCore
        this.db = openDatabase('FIRM', '1.0', 'FIRM', 50 * 1024 * 1024); 
        this.builder = new builder(this.dbcore)
    }
    createDb()
    {
        return new Promise(async resolve => 
        {
            this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Tablolar Oluşturuluyor.'});
            for (let i = 0; i < process.length; i++) 
            {
                if(process[i].create)
                {
                    let TmpQuery = 
                    {
                        tag : process[i].table,
                        query : await this.builder.create(process[i].table)
                    }            
    
                    await this.#createTable(TmpQuery)
                }
            }
            this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Tablo Oluşturma Tamamlandı.'});
            resolve()
        });        
    }
    transferAll()
    {
        return new Promise(async resolve => 
        {
            this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Kayıtlar Aktarılıyor.'});
            for (let i = 0; i < process.length; i++) 
            {
                if(process[i].type == "get")
                {
                    this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : process[i].table + ' Aktarımı İçin Kayıtlar Getiriliyor.'});
                    
                    let TmpData = (await this.dbcore.sqlExecute({query:"SELECT * FROM " + process[i].table})).result.recordset;
                    if(typeof TmpData != 'undefined')
                    {
                        if(TmpData.length > 0)
                        {
                            await this.#receiveTransfer(TmpData,process[i])
                        }
                    }
                    else
                    {
                        this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : process[i].table + ' Aktarımı İçin Kayıt Getirmede Hata !'});
                    }
                }
            }
            this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Kayıt Aktarımı Tamamlandı.'});
            resolve()
        });        
    }
    sqlExecute(pQuery)
    {
        return new Promise(resolve => 
        {
            this.db.transaction((pTrans) =>
            { 
                if(typeof pQuery.value == 'undefined')
                {
                    pQuery.value = []
                }
                pTrans.executeSql(pQuery.query,pQuery.value,(pTran,pResult) => 
                {
                    resolve({result : {recordset : pResult.rows}})
                },
                (pTran,err) =>
                {
                    resolve({result : {err: err}})
                });
            });
        });
    }    
    #createTable(pQuery)
    {
        return new Promise(async resolve => 
        {
            //TABLO OLUŞTURULUYOR
            let TmpResult = await this.sqlExecute(pQuery)
            if(typeof TmpResult.err == 'undefined')
            {
                this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pQuery.tag + ' Tablosu Oluşturuldu.'});
                resolve();
            }
            else
            {
                this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pQuery.tag + ' Hata : ' + TmpResult.err});
                console.log(TmpResult.err)
                resolve();
            }
        });
    }
    #dropTable(pTableName)
    {
        return new Promise(async resolve => 
        {
            //TABLO SİLİNİYOR
            let TmpResult = await this.sqlExecute({query : "DROP TABLE IF EXISTS " + pTableName,value : []})
                        
            if(typeof TmpResult.err == 'undefined')
            {
                this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pTableName + ' Tablosu Silindi.'});
            }
            else
            {
                this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pTableName + ' Hata : ' + TmpResult.err});
                console.log(TmpResult.err)
            }

            resolve();
        });
    }
    async #receiveTransfer(pData,pProcess)
    {                
        let TmpInsertQ = await this.builder.insert(pProcess.table);
        return new Promise(async resolve => 
        {
            this.db.transaction((pTrans) =>
            { 
                //TABLONUN TÜM KAYITLARI SİLİNİYOR.
                pTrans.executeSql("DELETE FROM " + pProcess.table,[],(pTran,pResult) => 
                {
                    
                },
                (pTran,err) =>
                {
    
                });
    
                for (let i = 0; i < pData.length; i++) 
                {
                    //INSERT
                    let TmpQuery = this.#buildQueryParam(TmpInsertQ,pData[i]);
    
                    if(typeof TmpQuery.value == 'undefined')
                    {
                        TmpQuery.value = []
                    }
                    
                    pTrans.executeSql(TmpQuery.query,TmpQuery.value,(pTran,pResult) => 
                    {
                        this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pProcess.table + ' Tablosuna Kayıt Aktarılıyor.',Progress : Math.round(((i / pData.length) * 100))});
                        if(i == pData.length - 1)
                        {
                            resolve()
                        }
                    },
                    (pTran,err) =>
                    {
                        this.dbcore.emit('dblocal_transfer',{MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pProcess.table + ' Tablosunun Aktarımında Hata !'});

                        if(i == pData.length - 1)
                        {
                            resolve()
                        }
                    });
                }
            });
        });
        
    }
    #buildQueryParam(pQuery,pData)
    {
        let TmpValue = [];
        for(let i = 0;i < pQuery.param.length;i++)
        {
            let Column = "";
            let Type = "";

            if(pQuery.param[i].split(':').length > 1)
            {
                Column = pQuery.param[i].split(":")[0]
                Type = pQuery.param[i].split(":")[1];            
            }
            else
            {
                Column = pQuery.param[i];
            }
            
            TmpValue.push(pData[Column]);
            
        }
        
        if(TmpValue.length > 0)
        {
            pQuery.value = TmpValue;
        }
        return pQuery;
    } 
}

//export const localobj = new dblocal();