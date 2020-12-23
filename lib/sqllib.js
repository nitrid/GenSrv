import sql from 'mssql'

export default class sqllib 
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

        sql.connect(TmpConfig, err =>
        {
            if(err != null)
            {
                console.log(err.originalError);
            }
        })
    }
    execute(pQuery,pResult)
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

            const pool = new sql.ConnectionPool(TmpConfig, err => 
            {
                if(err == null)
                {
                    const request = pool.request();           

                    if(typeof pQuery.param != 'undefined')
                    {
                        for(i = 0;i < pQuery.param.length;i++)
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
                                request.input(pQuery.param[i].split(":")[0],sql.NVarChar(pType[1]),pQuery.value[i]);    
                            }
                            else if(pType[0] == "int")
                            {
                                request.input(pQuery.param[i].split(":")[0],sql.Int,pQuery.value[i]);    
                            }
                            else if(pType[0] == "float")
                            {
                                request.input(pQuery.param[i].split(":")[0],sql.Float,pQuery.value[i]);    
                            }
                            else if(pType[0] == "date")
                            {
                                var from = pQuery.value[i]; 
                                var numbers = from.match(/\d+/g); 
                                var date = new Date(numbers[2] + "-" +numbers[1] + "-" + numbers[0]);

                                request.input(pQuery.param[i].split(":")[0],sql.Date,date);    
                            }
                            else if(pType[0] == "bit")
                            {
                                request.input(pQuery.param[i].split(":")[0],sql.Bit,pQuery.value[i]);    
                            }
                        }
                    }
                    request.query(pQuery.query,(err,result) => 
                    {
                        if(err == null)
                        {
                            pResult({tag : pQuery.tag,result : result});
                        }
                        else
                        {
                            var tmperr = { err : 'Error sqllib.js QueryPromise errCode : 101 - ' + err} 
                            pResult({tag : pQuery.tag,result : tmperr});
                        }
                        pool.close();
                    });
                }
                else
                {
                    var tmperr = { err : 'Error sqllib.js QueryPromise errCode : 102 - ' + err} 
                    pResult({tag : pQuery.tag,result : tmperr});
                }
            });
        }
        catch(err)
        {
            var tmperr = { err : 'Error sqllib.js QueryPromise errCode : 103 - ' + err} 
            pResult({tag : pQuery.tag,result : tmperr});
        }
    }
}