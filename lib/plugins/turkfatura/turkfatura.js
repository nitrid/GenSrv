import core from '../../core.js'
import request from 'request'
import fs from 'fs'

let uid = "mahir";
let pass = "6242302";
let TmpCore;

export default class turkfatura
{
    constructor()
    {
        TmpCore = core.instance;
        this.E_FATURA_LISTELE();
    }
    Query(pQuery,pParam,pValue)
    {
        return new Promise(async resolve =>
        {
            let TmpQuery = 
            {
                query: pQuery,
                param: pParam,
                value: pValue
            }

            TmpCore.sql.execute(TmpQuery,Data =>
            {
                resolve(Data.result.recordset);
            })
        });
    }
    Request(options)
    {
        if(typeof (options.body) != 'undefined')
        options.body = JSON.stringify(options.body);

        return new Promise(resolve =>
        {
            request(options, function (err, response)
            {
                try 
                {
                    resolve(response);
                } catch (err) {
                    console.log(err + ' - LineNo : 38' ) 
                }
            });
        });
    }
    AUTH_TOKEN()
    {
        return new Promise(async resolve =>
        {
            let shema = {'method' : 'POST','url' : "https://edonusumservis.ardsistem.com.tr/api/kullanici/login",'headers' : {'Content-Type' : 'application/json',},'body' : {'KULLANICI_ADI' : uid,'KULLANICI_SIFRE' : pass}}
            let callback = await this.Request(shema);
            
            if(JSON.parse(callback.body).mesaj == "İşlem başarıyla gerçekleşti.")
            {
                console.log("Token Success - LineNo : 55");
                resolve(JSON.parse(callback.body).TOKEN);
            }
            else
            {
                console.log(JSON.parse(callback.body).mesaj + ' - ' + "Token Error - LineNo : 60");
                resolve("");
            }
        });
    }
    E_FATURA_SAYAC(pToken,pVKN_TCKN,pYIL,pFATURA_TIPI_ID)
    {
        return new Promise(async resolve =>
        {
            let shema = 
            {
                'method' : 'GET',
                'url' : "https://edonusumservis.ardsistem.com.tr/api/entegrasyon/faturasayacsorgula?VKN_TCKN=" + pVKN_TCKN + "&YIL=" + pYIL + "&FATURA_TIPI_ID=" + pFATURA_TIPI_ID,
                'headers' : {'Content-Type' : 'application/json', 'AUTH_TOKEN' : pToken}
            }
        
            let callback = await this.Request(shema);

            if(JSON.parse(callback.body).length != 0)
            {
                console.log("FaturaSayac Success - LineNo : 80");
                resolve(JSON.parse(callback.body)[0].FATURA_NUMARA_SAYAC_ID);
            }
            else
            {
                console.log("FaturaSayac error - LineNo : 85");
                resolve("");
            }
        });
    }
    E_FATURA_OLUSTURMA()
    {
        return new Promise(async resolve =>
        {
            let newtoken = await this.AUTH_TOKEN();
            if(newtoken == "")
            {
                console.log('NewToken error - LineNo : 72');
                return;
            }

            let MasterData = await this.Query("SELECT * FROM [TERP_E-FATURA_MASTER] WHERE STATUS = 0 AND ","","")

            for (let i = 0; i < MasterData.length; i++) 
            {
                let sayac = await this.E_FATURA_SAYAC(newtoken,'0730712912','2021',1);
                if(sayac == "")
                {
                    console.log('Sayac error - LineNo : 79');
                    return;
                }
                let shema = 
                {
                    'method' : 'POST',
                    'url' : "https://edonusumservis.ardsistem.com.tr/api/entegrasyon/fatura",
                    'headers' : {"Content-Type" : "application/json", "AUTH_TOKEN" : newtoken},
                }
                shema.body = 
                [
                    {
                        "BAYI_ID":MasterData[i].BAYI_ID,                                         //NULL (DOKUMANDA KARSILIGI BULUNAMADI)                              
                        "FATURA_NUMARA_SAYAC_ID":sayac,                           
                        "REFERANS_NO":MasterData[i].REFERANS_NO,   //STRING (FATURA REFERANS NUMARASI)
                        "FATURA_NO":MasterData[i].FATURA_NO,                                       //STRING (FATURANIN 16 HANELİ FATURA NUMARA BİLGİSİ)
                        "FATURA_TIPI":MasterData[i].FATURA_TIPI,                                        //INT (1:EArsiv - 2:EFatura - 3:Mustahsil - 4:ESMM - 6:EIrsaliye)
                        "SENARYO_TURU":MasterData[i].SENARYO_TURU,                                       //INT (1:Temel Fatura - 2:Ticari Fatura)
                        "FATURA_TURU":MasterData[i].FATURA_TURU,                                        //INT (1:Satış - 2:Iade - 4:Tevkifat - 8:Istisna - 16:Ozel Matrah - 32:Ihraç Kayıtlı - 64:SGK)
                        "GONDERIM_SEKLI":MasterData[i].GONDERIM_SEKLI,                                     //INT (1:Kağıt - 2:Elektronik)
                        "PARA_BIRIMI":MasterData[i].PARA_BIRIMI,                                        //INT (1:Türk Lirası - 2:Euro - 3:Dolar - 4:Sterlin)
                        "KURUM_TURU":MasterData[i].KURUM_TURU,                                      //NULL (DOKUMANDA KARSILIGI BULUNAMADI)
                        "KUR":MasterData[i].KUR,                                             //INT (TR HARİCİ SEÇİMDE KULLANILMALIDIR)
                        "FATURA_TARIHI":MasterData[i].FATURA_TARIHI,                  //DATE
                        "IRSALIYE_NO":MasterData[i].IRSALIYE_NO,                                     //STRING (IRSALIYE NUMARA BILGISI)
                        "IRSALIYE_TARIHI":MasterData[i].IRSALIYE_TARIHI,                                 //DATE
                        "FATURA_NOTLAR":MasterData[i].FATURA_NOTLAR,                                   //LIST<String> (STRING LİSTESİ TİPİNDEDİR)
                        "GONDERICI_VKN_TCKN":MasterData[i].GONDERICI_VKN_TCKN,                      //STRING
                        "BANKA_ID":MasterData[i].BANKA_ID,                                        //NULL (DOKUMANDA KARSILIGI BULUNAMADI)
                        "ALICI_VKN_TCKN":MasterData[i].ALICI_VKN_TCKN,                         //STRING
                        "ALICI_TICARET_SICIL_NO":MasterData[i].ALICI_TICARET_SICIL_NO,                       //STRING (TARAFIN TICARET SICIL NUMARASI)
                        "ALICI_MERSIS_NO":MasterData[i].ALICI_MERSIS_NO,                           //STRING (TARAFIN MERSIS NUMARASI)
                        "ALICI_ADI":MasterData[i].ALICI_ADI,                                    //STRING (EARSIF ZORUNLU)
                        "ALICI_SOYADI":MasterData[i].ALICI_SOYADI,                                //STRING (EARSIF ZORUNLU)
                        "ALICI_UNVANI":MasterData[i].ALICI_UNVANI,                                    //STRING (EFATURADA ZORUNLU)           
                        "ALICI_TELEFON_NO":MasterData[i].ALICI_TELEFON_NO,                    //STRING (ZORUNLU)
                        "ALICI_E_POSTA":MasterData[i].ALICI_E_POSTA,                  //STRING (EARSIF FATURADA ZORUNLU)
                        "ALICI_VERGI_DAIRESI":MasterData[i].ALICI_VERGI_DAIRESI,                       //STRING (EFATURADA ZORUNLU)
                        "ALICI_ULKE":MasterData[i].ALICI_ULKE,                                 //STRING (ZORUNLU)                   
                        "ALICI_IL":MasterData[i].ALICI_IL,                                    //STRING (ZORUNLU) 
                        "ALICI_ILCE":MasterData[i].ALICI_ILCE,                                 //STRING (ZORUNLU) 
                        "ALICI_KASABA":MasterData[i].ALICI_KASABA,                               //STRING (DOKUMANDA KARSILIGI BULUNAMADI)
                        "ALICI_CADDE_SOKAK":MasterData[i].ALICI_CADDE_SOKAK,          //STRING (EFATURADA ZORUNLU)   
                        "ALICI_KAPI_NO":MasterData[i].ALICI_KAPI_NO,                                    //STRING    
                        "ALICI_BINA_ADI":MasterData[i].ALICI_BINA_ADI,                       //STRING
                        "ALICI_BINA_NO":MasterData[i].ALICI_BINA_NO,                                   //STRING
                        "IADE_TARIHI":MasterData[i].IADE_TARIHI,                                     //DATE
                        "IADE_FATURA_NO":MasterData[i].IADE_FATURA_NO,                                  //STRING
                        "GIBE_GONDERILSIN_MI":MasterData[i].GIBE_GONDERILSIN_MI,                            //BOOL  TRUE - FALSE (FALSE GONDERILIRSE TASLAK OLARAK KAYDEDILIR)
                        "ISTISNA_KODU":MasterData[i].ISTISNA_KODU,                                    //NULL (DOKUMANDA KARSILIGI BULUNAMADI)
                        "ISTISNA_ACIKLAMASI":MasterData[i].ISTISNA_ACIKLAMASI,                              //NULL (DOKUMANDA KARSILIGI BULUNAMADI)
                        "XSLT_NAME":MasterData[i].XSLT_NAME,                                       //NULL DIZAYN SEÇİMİ
                        "FATURA_SATIRLARI" : []
                    }
                ]
                let DetailData = await this.Query("SELECT * FROM [TERP_E-FATURA_DETAIL]",["GUID:string|50"],[MasterData[i].GUID])
                for (let x = 0; x < DetailData.length; x++) 
                {
                    shema.body[0].FATURA_SATIRLARI.push(
                        {
                            "HIZMET_URUN_ADI":DetailData[x].HIZMET_URUN_ADI,  //STRING
                            "MIKTAR":DetailData[x].MIKTAR,                                     //DECIMAL
                            "BIRIM_TIPI":DetailData[x].BIRIM_TIPI,                                  //INT (1:Adet - 2:Ay - 3:AzotunKilogramı - 4:BinAdet - 5:BinLitre - 6:BinMetreKup - 7:BrutKaloriDegeri - 8:Cift - 9:DesimetreKara - 11:FissileIzotopGrami)
                            "BIRIM_FIYAT":DetailData[x].BIRIM_FIYAT,                                //DECIMAL
                            "ISKONTO_ORANI":DetailData[x].ISKONTO_ORANI,                               //DECIMAL
                            "ISKONTO_TUTARI":DetailData[x].ISKONTO_TUTARI,                              //DECIMAL
                            "ISKONTO_ACIKLAMASI":DetailData[x].ISKONTO_ACIKLAMASI,                       //NULL (DOKUMANDA KARSILIGI BULUNAMADI)
                            "KDV_ORANI":DetailData[x].KDV_ORANI,                                   //DECIMAL
                            "KDV_TUTARI":DetailData[x].KDV_TUTARI,                                  //DECIMAL
                            "MAL_HIZMET_TUTARI":DetailData[x].MAL_HIZMET_TUTARI,                         //DECIMAL
                            "ISTISNA_KODU":DetailData[x].ISTISNA_KODU,                             //STRING
                            "URETICI_KODU":DetailData[x].URETICI_KODU,                             
                            "ALICI_KODU":DetailData[x].ALICI_KODU,
                            "SATICI_KODU":DetailData[x].SATICI_KODU,
                            "MARKA_ADI":DetailData[x].MARKA_ADI,
                            "URUN_ACIKLAMASI":DetailData[x].URUN_ACIKLAMASI,
                            "MODEL_ADI":DetailData[x].MODEL_ADI,
                            "SATIR_NOTU":DetailData[x].SATIR_NOTU,
                            "VERGI_LISTESI":DetailData[x].VERGI_LISTESI
                        }
                    )
                }

                let callback = await this.Request(shema);
                let status = 0;

                if(JSON.parse(callback.body).BasariDurumu == true && JSON.parse(callback.body).BasarisizKayitSayisi == 0)
                {
                    status = 1;
                }
                
                await this.Query("UPDATE [TERP_E-FATURA_MASTER] SET STATUS = @STATUS,CALLBACK = @CALLBACK,LDATE = GETDATE() WHERE GUID = @GUID",["STATUS:int","CALLBACK:string|500","GUID:string|50"],[status,JSON.stringify(JSON.parse(callback.body)),MasterData[i].GUID])
            }      
       
            resolve();
        });
    }
    E_FATURA_LISTELE()
    {
        return new Promise(async resolve =>
        {
            let newtoken = await this.AUTH_TOKEN();
            if(newtoken == "")
            {
                console.log('NewToken error - LineNo : 72');
                return;
            }
            
            let BASLANGIC_TARIHI = "2021-07-26T04:25:03Z"
            let BITIS_TARIHI = "2021-07-26T19:25:03Z"

            let shema = 
            {
                'method' : 'GET',
                'url' : "https://edonusumservis.ardsistem.com.tr/api/entegrasyon/faturalar?BASLANGIC_TARIHI="+ BASLANGIC_TARIHI +"&BITIS_TARIHI="+ BITIS_TARIHI,
                'headers' : {"Content-Type" : "application/json", "AUTH_TOKEN" : newtoken},
            }
        
            let callback = await this.Request(shema);

            console.log(callback)

            resolve();
        });
    }
}