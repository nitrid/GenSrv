export default class builder 
{    
    constructor(pDbCore)
    {
        this.dbcore = pDbCore;
    }
    async create(pTableName)
    {
        return new Promise(async resolve => 
        {
            let TmpDataSchema = (await this.#getTableSchema(pTableName)).result        
            if(typeof TmpDataSchema.err == 'undefined')
            {
                let TmpColumn = ""
                for (let i = 0; i < TmpDataSchema.recordset.length; i++) 
                {
                    let TmpType = TmpDataSchema.recordset[i].data_type;
                    if(TmpDataSchema.recordset[i].data_type == 'nvarchar')
                    {
                        TmpType = TmpDataSchema.recordset[i].data_type + "(" + TmpDataSchema.recordset[i].max_length + ")"
                    }

                    if(i == TmpDataSchema.recordset.length - 1)
                    {
                        TmpColumn = TmpColumn + TmpDataSchema.recordset[i].column_name + " " + TmpType 
                    }
                    else
                    {
                        TmpColumn = TmpColumn + TmpDataSchema.recordset[i].column_name + " " + TmpType + ","
                    }
                }
                resolve("CREATE TABLE IF NOT EXISTS " + pTableName +  "(" + TmpColumn  + ")")
            }
            else
            {
                console.log('Error : ' + pTableName + ' - ' + TmpDataSchema.err)
            }
            resolve("");
        });
    }
    async insert(pTableName)
    {
        return new Promise(async resolve => 
        {
            let TmpDataSchema = (await this.#getTableSchema(pTableName)).result        
            let TmpQuery = {query:"",param:[]};

            if(typeof TmpDataSchema.err == 'undefined')
            {
                let TmpColumn = ""
                let TmpValue = ""
                for (let i = 0; i < TmpDataSchema.recordset.length; i++) 
                {
                    if(i == TmpDataSchema.recordset.length - 1)
                    {
                        TmpColumn = TmpColumn + TmpDataSchema.recordset[i].column_name
                        TmpValue = TmpValue + "?"
                    }
                    else
                    {
                        TmpColumn = TmpColumn + TmpDataSchema.recordset[i].column_name + ","
                        TmpValue = TmpValue + "?,"
                    }
                    TmpQuery.param.push(TmpDataSchema.recordset[i].column_name)
                }

                TmpQuery.query = "INSERT INTO " + pTableName +  "(" + TmpColumn  + ") VALUES (" + TmpValue + ")"
                resolve(TmpQuery)
            }
            else
            {
                console.log('Error : ' + pTableName + ' - ' + TmpDataSchema.err)
            }
            resolve(TmpQuery);
        });
    }
    async update(pTableName)
    {
        return new Promise(async resolve => 
        {
            let TmpDataSchema = (await this.#getTableSchema(pTableName)).result;
            let TmpQuery = {query:"",param:[]};

            if(typeof TmpDataSchema.err == 'undefined')
            {
                let TmpColumn = ""
                for (let i = 0; i < TmpDataSchema.recordset.length; i++) 
                {
                    if(i == TmpDataSchema.recordset.length - 1)
                    {
                        TmpColumn = TmpColumn + TmpDataSchema.recordset[i].column_name + " = ? " 
                    }
                    else
                    {
                        TmpColumn = TmpColumn + TmpDataSchema.recordset[i].column_name + " = ?, "
                    }

                    TmpQuery.param.push(TmpDataSchema.recordset[i].column_name)
                }

                TmpQuery.query = "UPDATE " + pTableName +  " SET " + TmpColumn;
                resolve(TmpQuery);
            }
            else
            {
                console.log('Error : ' + pTableName + ' - ' + TmpDataSchema.err)
            }
            resolve(TmpQuery);
        });
    }
    #getTableSchema(pTableName)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                query : "SELECT " +
                        "schema_name(tab.schema_id) AS schema_name, " +
                        "tab.name AS table_name, " +
                        "col.column_id AS column_id, " +
                        "col.name AS column_name, " +
                        "t.name AS data_type, " +
                        "col.max_length AS max_length, " +
                        "col.precision AS precision " +
                        "FROM sys.tables AS tab " +
                        "INNER JOIN sys.columns as col " +
                        "ON tab.object_id = col.object_id " +
                        "LEFT JOIN sys.types as t " +
                        "ON col.user_type_id = t.user_type_id " +
                        "WHERE tab.name = @NAME " +
                        "ORDER BY schema_name,table_name,column_id ",
                param : ['NAME:string'],
                value : [pTableName]
            }
    
            let TmpResult = await this.dbcore.sqlExecute(TmpQuery)
            resolve(TmpResult)
        });
    }
}