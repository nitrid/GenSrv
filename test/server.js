import server from '../index.js'
import config from './config.js'
import sql from '../lib/sqllib.js'

let x = new server(config);
x.listen(80)

let m = new sql(config)
m.execute(
{
    query : 'SELECT DB_kod AS FIRM FROM VERI_TABANLARI'
},(data)=>
{
    console.log(data);
})
