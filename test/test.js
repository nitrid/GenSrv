import {core, datatable}  from '../bin/core/core.js'
import {io} from 'socket.io-client'
import moment from 'moment'
import crypto from 'crypto'
function uuidv4() 
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 
    {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}   
async function run()
{
    let tmpcore = new core(io('http://localhost',{timeout:100000}));
    await tmpcore.auth.login('Admin','1','POS')
    
    // console.log("getItemDb Öncesi - " + moment().format("HH:mm:ss SSS"))
    // let t = await tmpcore.sql.execute({query:"SELECT * FROM ITEMS_BARCODE_MULTICODE_VW_01"})
    // console.log("getItemDb Sonrası - " + moment().format("HH:mm:ss SSS"))
    // console.log(t)

    let tmpDt = new datatable()
    tmpDt.selectCmd = 
    {
        query : "SELECT * FROM [dbo].[POS_SALE_VW_01] WHERE ((GUID = @GUID) OR (@GUID = '00000000-0000-0000-0000-000000000000')) AND ((POS_GUID = @POS_GUID) OR (@POS_GUID = '00000000-0000-0000-0000-000000000000')) ORDER BY LINE_NO DESC",
        param : ['GUID:string|50','POS_GUID:string|50']
    } 
    tmpDt.insertCmd = 
    {
        query : "EXEC [dbo].[PRD_POS_SALE_INSERT] " + 
                "@GUID = @PGUID, " +
                "@CUSER = @PCUSER, " +
                "@CDATE = @PCDATE, " + 
                "@LDATE = @PLDATE, " + 
                "@POS = @PPOS, " +
                "@LINE_NO = @PLINE_NO, " +
                "@ITEM = @PITEM, " +  
                "@INPUT = @PINPUT, " +                      
                "@BARCODE = @PBARCODE, " + 
                "@UNIT = @PUNIT, " + 
                "@QUANTITY = @PQUANTITY, " + 
                "@PRICE = @PPRICE, " + 
                "@FAMOUNT = @PFAMOUNT, " + 
                "@AMOUNT = @PAMOUNT, " + 
                "@DISCOUNT = @PDISCOUNT, " + 
                "@LOYALTY = @PLOYALTY, " + 
                "@VAT = @PVAT, " + 
                "@TOTAL = @PTOTAL, " + 
                "@SUBTOTAL = @PSUBTOTAL, " + 
                "@PROMO_TYPE = @PPROMO_TYPE ", 
        param : ['PGUID:string|50','PCUSER:string|25','PCDATE:datetime','PLDATE:datetime','PPOS:string|50','PLINE_NO:int','PITEM:string|50','PINPUT:string|25','PBARCODE:string|50','PUNIT:string|50',
                'PQUANTITY:float','PPRICE:float','PFAMOUNT:float','PAMOUNT:float','PDISCOUNT:float','PLOYALTY:float','PVAT:float','PTOTAL:float','PSUBTOTAL:int','PPROMO_TYPE:int'],
        dataprm : ['GUID','CUSER','LDATE','LDATE','POS_GUID','LINE_NO','ITEM_GUID','INPUT','BARCODE_GUID','UNIT_GUID','QUANTITY','PRICE','FAMOUNT','AMOUNT','DISCOUNT','LOYALTY','VAT',
                'TOTAL','SUBTOTAL','PROMO_TYPE']
    } 
    tmpDt.updateCmd = 
    {
        query : "EXEC [dbo].[PRD_POS_SALE_UPDATE] " + 
                "@GUID = @PGUID, " +
                "@CUSER = @PCUSER, " + 
                "@LDATE = @PLDATE, " + 
                "@POS = @PPOS, " +
                "@LINE_NO = @PLINE_NO, " +
                "@ITEM = @PITEM, " + 
                "@INPUT = @PINPUT, " +                   
                "@BARCODE = @PBARCODE, " + 
                "@UNIT = @PUNIT, " + 
                "@QUANTITY = @PQUANTITY, " + 
                "@PRICE = @PPRICE, " + 
                "@FAMOUNT = @PFAMOUNT, " +
                "@AMOUNT = @PAMOUNT, " + 
                "@DISCOUNT = @PDISCOUNT, " + 
                "@LOYALTY = @PLOYALTY, " + 
                "@VAT = @PVAT, " + 
                "@TOTAL = @PTOTAL, " + 
                "@SUBTOTAL = @PSUBTOTAL, " + 
                "@PROMO_TYPE = @PPROMO_TYPE ", 
        param : ['PGUID:string|50','PCUSER:string|25','PLDATE:datetime','PPOS:string|50','PLINE_NO:int','PITEM:string|50','PINPUT:string|25','PBARCODE:string|50','PUNIT:string|50',
                    'PQUANTITY:float','PPRICE:float','PFAMOUNT:float','PAMOUNT:float','PDISCOUNT:float','PLOYALTY:float','PVAT:float','PTOTAL:float','PSUBTOTAL:int','PPROMO_TYPE:int'],
        dataprm : ['GUID','CUSER','LDATE','POS_GUID','LINE_NO','ITEM_GUID','INPUT','BARCODE_GUID','UNIT_GUID','QUANTITY','PRICE','FAMOUNT','AMOUNT','DISCOUNT','LOYALTY',
                'VAT','TOTAL','SUBTOTAL','PROMO_TYPE']
    } 

    setInterval(async() => 
    {
        let t = 
        {
            GUID : uuidv4(),
            CUSER : 'Admin',
            LUSER : 'Admin',
            LDATE : moment(new Date()).utcOffset(0, true),
            POS_GUID : '00000000-0000-0000-0000-000000000000',
            SAFE : '',
            DEPOT_GUID : '00000000-0000-0000-0000-000000000000',
            DEPOT_CODE : '',
            DEPOT_NAME : '',
            TYPE : 0,
            DOC_DATE : moment(new Date()).format("YYYY-MM-DD"),
            CUSTOMER_GUID : '00000000-0000-0000-0000-000000000000',
            CUSTOMER_CODE : '',
            CUSTOMER_NAME : '',            
            LINE_NO : 0,
            ITEM_GUID : '00000000-0000-0000-0000-000000000000',
            ITEM_CODE : '',
            ITEM_NAME : '',
            ITEM_SNAME : '',
            TICKET_REST : 0,
            COST_PRICE : 0,
            MIN_PRICE : 0,
            MAX_PRICE : 0,
            INPUT : '',
            BARCODE_GUID : '00000000-0000-0000-0000-000000000000',
            BARCODE : '',
            UNIT_GUID : '00000000-0000-0000-0000-000000000000',
            UNIT_NAME : '',
            UNIT_SHORT : '',
            UNIT_FACTOR : 0,
            QUANTITY : 0,
            PRICE : 0,
            FAMOUNT : 0,
            AMOUNT : 0,
            DISCOUNT : 0,
            LOYALTY : 0,
            VAT : 0,
            VAT_RATE : 0,
            VAT_TYPE : '',
            TOTAL : 0,
            SUBTOTAL : 0,
            PROMO_TYPE : 0,
            GRAND_AMOUNT : 0,
            GRAND_DISCOUNT : 0,
            GRAND_LOYALTY : 0,
            GRAND_VAT : 0,
            GRAND_TOTAL : 0,
            STATUS : 0
        }
        tmpDt.push(t)
        console.log("getItemDb Öncesi - " + moment().format("HH:mm:ss SSS"))
        // await tmpDt.update()
        tmpDt.insertCmd.value = 
        [
            uuidv4(),
            'Admin',
            moment(new Date()).utcOffset(0, true),
            moment(new Date()).utcOffset(0, true),
            '00000000-0000-0000-0000-000000000000',
            0,
            '00000000-0000-0000-0000-000000000000',
            '',
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000000',
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ]
                
        await core.instance.sql.execute(tmpDt.insertCmd)
        console.log("getItemDb Sonrası - " + moment().format("HH:mm:ss SSS"))    
    }, 2000);
    
}

run()