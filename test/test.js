import {core, datatable}  from '../bin/core/core.js'
import {io} from 'socket.io-client'
import moment from 'moment'

async function run()
{
    let tmpcore = new core(io('http://localhost',{timeout:100000}));
    await tmpcore.auth.login('Admin','123456','POS')
    
    console.log("getItemDb Öncesi - " + moment().format("HH:mm:ss SSS"))
    let t = await tmpcore.sql.execute({query:"SELECT * FROM ITEMS_BARCODE_MULTICODE_VW_01 WHERE CODE = '1' OR BARCODE = '1' OR MULTICODE = '1'"})
    console.log("getItemDb Sonrası - " + moment().format("HH:mm:ss SSS"))
    console.log(t)
}

run()