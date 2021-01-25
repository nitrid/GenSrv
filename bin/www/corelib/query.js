export default 
{
    Firma : 
    {
        query : 'SELECT DB_kod AS FIRM FROM VERI_TABANLARI'
    },
    Stok : 
    {
        query : "SELECT * FROM STOKLAR WHERE ((sto_kod = @sto_kod) OR (@sto_kod = ''))",
        param : ['sto_kod'],
        type : ['string|25'] 
    },
    CmbDepoGetir : 
    {
        query : "SELECT dep_no AS KODU,dep_adi AS ADI FROM DEPOLAR"
    },
    DepoAra : 
    {
        query : "SELECT dep_no AS KODU,dep_adi AS ADI FROM DEPOLAR WHERE ((dep_no = @dep_no) OR (@dep_no = '')) AND ((dep_adi = @dep_adi) OR (@dep_adi = ''))",
        param : ['dep_no','dep_adi'],
        type : ['string|25','string|25'] 
    },
    CmbSorumlulukGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT som_kod AS KODU,som_isim AS ADI FROM SORUMLULUK_MERKEZLERI"
    },
    CmbPersonelGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI,'' AS SOYADI UNION ALL SELECT PER1.cari_per_kod AS KODU,PER1.cari_per_adi AS ADI,PER1.cari_per_soyadi AS SOYADI " +
                "FROM CARI_PERSONEL_TANIMLARI AS PER1 INNER JOIN CARI_PERSONEL_TANIMLARI AS PER2 ON " +
                "PER1.cari_per_kod = PER2.cari_per_kod --AND PER1.cari_per_tip = 0 "
    },
    PersonelTipGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI,'' AS SOYADI,'' AS TIP UNION ALL SELECT PER1.cari_per_kod AS KODU,PER1.cari_per_adi AS ADI,PER1.cari_per_soyadi AS SOYADI,PER1.cari_per_tip AS TIP " +
                "FROM CARI_PERSONEL_TANIMLARI AS PER1 INNER JOIN CARI_PERSONEL_TANIMLARI AS PER2 ON " +
                "PER1.cari_per_kod = PER2.cari_per_kod where PER1.cari_per_tip in(@TIP,2) " ,
                param : ['TIP'],
                type : ['int'] 
    },
    CmbProjeGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT pro_kodu AS KODU,pro_adi AS ADI FROM PROJELER"
    },
    CmbOdemePlanGetir : 
    {
        query : "SELECT '0' AS KODU, 'PEŞİN' AS ADI UNION ALL SELECT odp_no AS KODU, " +
                "odp_adi  AS ADI FROM ODEME_PLANLARI"
    },
    CmbBirimGetir : 
    {
        query : "SELECT sto_birimID AS BIRIMPNTR, " + 
                "sto_birim_ad AS BIRIM, " + 
                "CASE WHEN sto_birim_katsayi > 0 THEN sto_birim_katsayi ELSE sto_birim_katsayi * -1 END AS KATSAYI " + 
                "FROM STOK_BIRIM_TANIMLARI_DIKEY WHERE sto_kod = @sto_kod", 
        param : ['sto_kod'],
        type : ['string|25']
    }, 
    CmbMarkaGetir :
    {
        query : "SELECT mrk_kod AS KODU,mrk_ismi AS ADI FROM STOK_MARKALARI"
    },
    CmbKasaGetir : 
    {
        query : "SELECT kas_kod AS KODU,kas_isim AS ADI,kas_doviz_cinsi AS DOVIZCINSI,(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(kas_doviz_cinsi,0),2)) AS DOVIZKUR, CASE kas_doviz_cinsi WHEN 0 THEN 'TL' WHEN 1 THEN 'USD' WHEN 2 THEN 'EURO' END AS DOVIZSEMBOL FROM KASALAR WHERE kas_tip = @KASTIP" ,
        param : ['KASTIP'],
        type : ['int']
    }, 
    CmbBankaGetir : 
    {
        query : "SELECT ban_kod AS KODU,ban_ismi AS ADI, ban_doviz_cinsi AS DOVIZCINSI,(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(ban_doviz_cinsi,0),2)) AS DOVIZKUR FROM BANKALAR " ,
    },
    CmbAdresNo : 
    {
        query : "SELECT " +
                "adr_adres_no AS KODU, " +
                "adr_cadde AS ADI  " +
                "FROM CARI_HESAP_ADRESLERI " +
                "WHERE adr_cari_kod = @adr_cari_kod" ,
        param : ['adr_cari_kod'],
        type : ['string|25']
    },
    CariListeGetir : 
    {
        query : "SELECT " +
                "KODU, " +
                "CKILIT, " +
                "UNVAN1, " +
                "UNVAN2, " +
                "DOVIZCINSI, " +
                "DOVIZCINSI1, " +
                "DOVIZCINSI2, " +
                "VDADI, " +
                "VDNO, " +
                "SATISFK, " +
                "ISKONTOKOD, " +
                "SEKTOR, " +
                "BOLGE, " +
                "GRUP, " +
                "TEMSILCI, " +
                "TEMSILCIADI, " +
                "DOVIZSEMBOL, " +
                "DOVIZSEMBOL1, " +
                "DOVIZSEMBOL2, " +
                "DOVIZKUR, " +
                "DOVIZKUR1, " +
                "DOVIZKUR2, " +
                "ALTDOVIZKUR, " +
                //"RISK, " +
                //"RISKLIMIT, " +
                "ODEMEPLANI, " +
                "ISNULL(CONVERT(NVARCHAR,CAST(BAKIYE AS DECIMAL(10,2))),0) AS BAKIYE, " +
                "BELGETARIH, " +
                "ADRES, " +
                "ADRES1, " +
                "ADRES2, " +
                "TELNOLGE, " +
                "TELNO1, " +
                "VERGISIZ, " +
                "EFATURA " +
                "FROM  " +
                "(SELECT cari_kod AS KODU, " +
                "cari_cari_kilitli_flg As CKILIT, " +
                "cari_unvan1 AS UNVAN1, " +
                "cari_unvan2 AS UNVAN2, " +
                "cari_doviz_cinsi AS DOVIZCINSI, " +
                "cari_doviz_cinsi1 AS DOVIZCINSI1, " +
                "cari_doviz_cinsi2 AS DOVIZCINSI2, " +
                "cari_vdaire_adi AS VDADI, " +
                "cari_vdaire_no AS VDNO, " +
                "cari_satis_fk AS SATISFK, " +
                "cari_satis_isk_kod AS ISKONTOKOD, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI, " +
                "ISNULL((SELECT cari_per_adi FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = CARI.cari_temsilci_kodu),'') AS TEMSILCIADI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR, " +
                "ISNULL((SELECT ROUND(SUM([msg_S_1475\\T]),2) FROM dbo.fn_CariDovizCinsindenRiskFoyu(0,cari_kod,CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),0,'',0)),0) AS RISK, " +
                "ISNULL((SELECT ROUND(SUM([msg_S_1479\\T]),2) FROM dbo.fn_CariDovizCinsindenRiskFoyu(0,cari_kod,CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),0,'',0)),0) AS RISKLIMIT, " +
                "cari_odemeplan_no AS ODEMEPLANI, " +
                "(SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)) AS BAKIYE, " +
                "ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo,'') as BELGENO, ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi,GETDATE()) as BELGETARIH, " +
                "ISNULL((SELECT adr_ilce + '-' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES, " +
                "ISNULL((SELECT adr_cadde FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES1, " +
                "ISNULL((SELECT adr_sokak FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES2, " +
                "ISNULL((SELECT adr_tel_bolge_kodu FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS TELNOLGE, " +
                "ISNULL((SELECT adr_tel_no1 FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS TELNO1, " +
                "cari_BUV_tabi_fl AS VERGISIZ, " +
                "cari_efatura_fl AS EFATURA  " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR AS CARI ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI.cari_kod " +
                "WHERE ((UPPER(CARI.cari_kod) LIKE UPPER(@KODU) + '%' ) OR (@KODU = '')) AND ((UPPER(CARI.cari_unvan1) LIKE  UPPER(@ADI) + '%' OR UPPER(cari_unvan2) LIKE UPPER(@ADI) + '%' ) OR (@ADI = '')) AND ((CARI.cari_temsilci_kodu IN(SELECT value FROM STRING_SPLIT(@PLASIYERKODU,','))) OR (@PLASIYERKODU = ''))) AS TBL ORDER BY KODU " ,
            param : ['KODU','ADI','PLASIYERKODU'],
            type : ['string|25','string|127','string|25']
    },
    CariGetir : 
    {
        query : "SELECT cari_kod AS KODU, " +
                "cari_cari_kilitli_flg As CKILIT," +
                "cari_unvan1 AS UNVAN1," +
                "cari_unvan2 AS UNVAN2," +
                "cari_doviz_cinsi AS DOVIZCINSI," +
                "cari_doviz_cinsi1 AS DOVIZCINSI1," +
                "cari_doviz_cinsi2 AS DOVIZCINSI2," +
                "cari_vdaire_adi AS VDADI," +
                "cari_vdaire_no AS VDNO," +
                "cari_satis_fk AS SATISFK," +
                "cari_satis_isk_kod AS ISKONTOKOD," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_bolge_kodu AS BOLGE," +
                "CASE cari_doviz_cinsi WHEN 0 THEN 'TL' WHEN 1 THEN 'USD' WHEN 2 THEN 'EURO' END AS DOVIZCINS, " +
                "cari_grup_kodu AS GRUP," +
                "cari_temsilci_kodu AS TEMSILCI," +
                "ISNULL((SELECT cari_per_adi FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = CARI.cari_temsilci_kodu),'') AS TEMSILCIADI," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1," + 
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR," +
                "ISNULL((SELECT ROUND(SUM([msg_S_1475\\T]),2) FROM dbo.fn_CariDovizCinsindenRiskFoyu(0,cari_kod,CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),0,'',0)),0) AS RISK, " +
                "ISNULL((SELECT ROUND(SUM([msg_S_1479\\T]),2) FROM dbo.fn_CariDovizCinsindenRiskFoyu(0,cari_kod,CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),CONVERT(NVARCHAR,GETDATE(),112),0,'',0)),0) AS RISKLIMIT, " +
                "cari_odemeplan_no AS ODEMEPLANI," +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) AS BAKIYE," +
                "ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo,'') as BELGENO, ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi,GETDATE()) as BELGETARIH," +
                "ISNULL((SELECT adr_ilce + '-' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES," +
                "ISNULL((SELECT adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS IL," +
                "ISNULL((SELECT adr_cadde FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES1, " +
                "ISNULL((SELECT adr_sokak FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES2, " +
                "cari_BUV_tabi_fl AS VERGISIZ," +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR AS CARI ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI.cari_kod " +
                "WHERE ((CARI.cari_kod = @KODU) OR (@KODU = '')) AND ((CARI.cari_unvan1 = @ADI) OR (@ADI = '')) AND ((CARI.cari_temsilci_kodu = @PLASIYERKODU) OR (@PLASIYERKODU = '')) ORDER BY cari_kod ASC",
            param : ['KODU','ADI','PLASIYERKODU'],
            type : ['string|25','string|127','string|25']
    },
    IsMerkeziGetir:
    {
        query: "SELECT IsM_Kodu as KODU, IsM_Aciklama as ADI FROM IS_MERKEZLERI"
    },
    BarkodGetir:
    {
        query : "SELECT sto_kod AS KODU, " +
                "sto_isim AS ADI, " +
                "ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = STOK.sto_sat_cari_kod),'') AS UNVAN1, " +
                "ISNULL((SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = STOK.sto_sat_cari_kod),'') AS UNVAN2, " +
                "sto_sat_cari_kod AS CARIKODU, " +
                "ISNULL(sto_birim2_katsayi * -1,0) AS MIKTAR, " +
                "sto_kisa_ismi AS KISAAD, " +
                "sto_yabanci_isim AS YABANCIAD, " +
                "sto_doviz_cinsi AS DOVIZCINSI, " +
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sto_doviz_cinsi,0),2)),1) AS DOVIZCINSKURU, " +
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " +
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " +
                "sto_altgrup_kod AS ALTGRUP, " +
                "ISNULL((SELECT TOP 1 sta_isim FROM STOK_ALT_GRUPLARI WHERE sta_kod = sto_altgrup_kod),'') AS ALTGRUPADI, " +
                "sto_anagrup_kod AS ANAGRUP, " +
                "ISNULL((SELECT TOP 1 san_isim FROM STOK_ANA_GRUPLARI WHERE san_kod = sto_anagrup_kod),'') AS ANAGRUPADI, " +
                "sto_uretici_kodu AS URETICI, " +
                "sto_sektor_kodu AS SEKTOR, " +
                "sto_reyon_kodu AS REYON, " +
                "ISNULL((SELECT TOP 1 ryn_ismi FROM STOK_REYONLARI WHERE STOK_REYONLARI.ryn_kod = sto_reyon_kodu),'') AS REYONADI, " +
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " +
                "sto_renk_kodu AS RENKKODU, " +
                "sto_pasif_fl AS AKTIFPASIF, " +
                "bar_kodu AS BARKOD, " +
                "bar_birimpntr AS BIRIMPNTR, " +
                "bar_bedenpntr AS BEDENPNTR, " +
                "bar_renkpntr AS RENKPNTR, " +
                "bar_partikodu AS PARTI, " +
                "bar_lotno AS LOT, " +
                "bar_barkodtipi AS BARKODTIP, " +
                "ISNULL((SELECT dbo.fn_beden_kirilimi (bar_bedenpntr,sto_beden_kodu)),0) AS BEDEN, " +
                "ISNULL((SELECT dbo.fn_renk_kirilimi (bar_renkpntr,sto_renk_kodu)),0) AS RENK, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (sto_kod,bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_StokBirimi (sto_kod,bar_birimpntr)) AS BIRIM, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "ISNULL(( SELECT  msg_S_0165  FROM [dbo].[fn_DepolardakiRenkBedenDetayliMiktar] ( sto_kod ,@DEPONO,GETDATE()) WHERE msg_S_0062=CASE WHEN bar_renkpntr=0 THEN bar_bedenpntr ELSE CASE WHEN bar_bedenpntr=0 THEN (bar_renkpntr-1)*40+1 ELSE (bar_renkpntr-1)*40+bar_bedenpntr END  END),0) AS KIRILIMMIKTAR, " +
                "sto_siparis_dursun AS SIPARISDURSUN, " +
                "sto_malkabul_dursun as MALKABULDURSUN, " +
                "sto_otvtutar AS OTVTUTAR, " +
                "0 AS DOVIZ, " + 
                "'' AS DOVIZSEMBOL, " + 
                "1 AS DOVIZKUR " + 
                "FROM STOKLAR AS STOK WITH (NOLOCK,INDEX=NDX_STOKLAR_02) " +
                "LEFT JOIN BARKOD_TANIMLARI AS BARKOD WITH (NOLOCK,INDEX=NDX_BARKOD_TANIMLARI_02) ON " +
                "STOK.sto_kod = BARKOD.bar_stokkodu " +
                "WHERE BARKOD.bar_kodu = @BARKOD" ,
        param : ['BARKOD','DEPONO'],
        type : ['string|50','int']
    },
    StokGetir:
    {
        query : "SELECT " +
                "KODU AS KODU, " +
                "ADI AS ADI, " +
                "UNVAN1 AS UNVAN1, " +
                "UNVAN2 AS UNVAN2, " + 
                "CARIKODU AS CARIKODU," + 
                "MAX(MIKTAR) AS MIKTAR," +
                "KISAAD AS KISAAD," +
                "YABANCIAD AS YABANCIAD," +
                "MAX(DOVIZCINSI) AS DOVIZCINSI," +
                "MAX(DOVIZCINSKURU) AS DOVIZCINSKURU," +
                "MAX(PERAKENDEVERGIPNTR) AS PERAKENDEVERGIPNTR," +
                "MAX(TOPTANVERGIPNTR) AS TOPTANVERGIPNTR," +
                "ALTGRUP AS ALTGRUP," +
                "ALTGRUPADI AS ALTGRUPADI," +
                "ANAGRUP AS ANAGRUP," +
                "ANAGRUPADI AS ANAGRUPADI," +
                "MAX(URETICI) AS URETICI," +
                "MAX(SEKTOR) AS SEKTOR," +
                "MAX(REYON) AS REYON," +
                "MAX(REYONADI) AS REYONADI," +
                "MAX(MARKA) AS MARKA," +
                "MAX(BEDENKODU) AS BEDENKODU," +
                "MAX(RENKKODU) AS RENKKODU," +
                "MAX(BARKOD) AS BARKOD," +
                "MAX(BIRIMPNTR) AS BIRIMPNTR," +
                "MAX(BEDENPNTR) AS BEDENPNTR," +
                "MAX(RENKPNTR) AS RENKPNTR," +
                "MAX(PARTI) AS PARTI," +
                "MAX(LOT) AS LOT," +
                "MAX(BARKODTIP) AS BARKODTIP," +
                "MAX(BEDEN) AS BEDEN," +
                "MAX(RENK) AS RENK," +
                "MAX(PERAKENDEVERGI) AS PERAKENDEVERGI," +
                "MAX(TOPTANVERGI) AS TOPTANVERGI," +
                "MAX(KATSAYI) AS KATSAYI," +
                "MAX(BIRIM) AS BIRIM," +
                "MAX(DETAYTAKIP) AS DETAYTAKIP," +
                "MAX(DEPOMIKTAR) AS DEPOMIKTAR," +
                "BEDENMIKTAR AS BEDENMIKTAR," +
                "RENKMIKTAR AS RENKMIKTAR," +
                "MAX(KIRILIMMIKTAR) AS KIRILIMMIKTAR, " +
                "MAX(SIPARISDURSUN) AS SIPARISDURSUN, " +
                "MAX(MALKABULDURSUN) AS MALKABULDURSUN, " +
                "MAX(OTVTUTAR) AS OTVTUTAR," +
                "MAX(DOVIZ) AS DOVIZ," +
                "MAX(DOVIZSEMBOL) AS DOVIZSEMBOL, " +
                "MAX(DOVIZKUR) AS DOVIZKUR " +
                "FROM (SELECT " +
                "sto_kod AS KODU, " +
                "sto_isim AS ADI, " +
                "ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = STOK.sto_sat_cari_kod),'') AS UNVAN1, " +
                "ISNULL((SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = STOK.sto_sat_cari_kod),'') AS UNVAN2, " +
                "sto_sat_cari_kod AS CARIKODU, " +
                "ISNULL(sto_birim2_katsayi * -1,0) AS MIKTAR, " +
                "sto_kisa_ismi AS KISAAD, " +
                "sto_yabanci_isim AS YABANCIAD, " +
                "sto_doviz_cinsi AS DOVIZCINSI, " +
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sto_doviz_cinsi,0),2)),1) AS DOVIZCINSKURU, " +
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " +
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " +
                "sto_altgrup_kod AS ALTGRUP, " +
                "ISNULL((SELECT TOP 1 sta_isim FROM STOK_ALT_GRUPLARI WHERE sta_kod = sto_altgrup_kod),'') AS ALTGRUPADI, " +
                "sto_anagrup_kod AS ANAGRUP, " +
                "ISNULL((SELECT TOP 1 san_isim FROM STOK_ANA_GRUPLARI WHERE san_kod = sto_anagrup_kod),'') AS ANAGRUPADI, " +
                "sto_uretici_kodu AS URETICI, " +
                "sto_sektor_kodu AS SEKTOR, " +
                "sto_reyon_kodu AS REYON, " +
                "ISNULL((SELECT TOP 1 ryn_ismi FROM STOK_REYONLARI WHERE STOK_REYONLARI.ryn_kod = sto_reyon_kodu),'') AS REYONADI, " +
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " +
                "sto_renk_kodu AS RENKKODU, " +
                "sto_pasif_fl AS AKTIFPASIF, " +
                "'' AS BARKOD, " +
                "1 AS BIRIMPNTR, " +
                "0 AS BEDENPNTR, " +
                "0 AS RENKPNTR, " +
                "'' AS PARTI, " +
                "0 AS LOT, " +
                "0 AS BARKODTIP, " +
                "'' AS BEDEN, " +
                "'' AS RENK, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "1 AS KATSAYI, " +
                "'' AS BIRIM, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "0 AS RENKMIKTAR," +
                "0 AS BEDENMIKTAR," +
                "0 AS KIRILIMMIKTAR, " +
                "sto_siparis_dursun AS SIPARISDURSUN, " +
                "sto_malkabul_dursun as MALKABULDURSUN, " +
                "sto_otvtutar AS OTVTUTAR, " +
                "0 AS DOVIZ,  " +
                " '' AS DOVIZSEMBOL,  " +
                "1 AS DOVIZKUR  " +
                "FROM STOKLAR AS STOK WITH (NOLOCK,INDEX=NDX_STOKLAR_02) " +
                "WHERE ((UPPER(sto_kod) LIKE  UPPER(@KODU) + '%') OR (@KODU = '')) AND ((UPPER(sto_isim) LIKE UPPER(@ADI) + '%' ) OR (@ADI = '')) " +
                "AND ((sto_marka_kodu LIKE @MKODU) OR (@MKODU = ''))" +
                ") AS TMP " +
                "GROUP BY BIRIM,UNVAN1,UNVAN2,ADI,CARIKODU,KISAAD,KODU,YABANCIAD,ALTGRUP,ALTGRUPADI,ANAGRUP,ANAGRUPADI,BEDENMIKTAR,RENKMIKTAR ORDER BY KODU" ,
        param : ['KODU',"ADI",'DEPONO','MKODU'],
        type : ['string|25','string|50','int','string|25']
    },    
    StokAdiGetir : 
    {
        query : "SELECT " +
                "sto_kod AS KODU, " +
                "sto_isim AS ADI, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar(sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "sto_birim1_ad AS BIRIM1, " +
                "CASE sto_doviz_cinsi WHEN 0 THEN 'TL' WHEN 1 THEN 'USD' WHEN 2 THEN 'EURO' END AS DOVIZCINS, " +
                "sto_kod AS BARKOD " +
                "FROM STOKLAR " +
                "WHERE ((sto_kod LIKE   @KODU ) OR (@KODU = '')) AND ((sto_isim LIKE '%' + @ADI + '%' ) OR (@ADI = '')) " ,
        param : ['KODU',"ADI",'DEPONO'],
        type :  ['string|25','string|50','int']

    },
    CariAdiGetir : 
    {
        quert : "SELECT  " +
                " cari_kod  AS KODU, " +
                " cari_unvan1 AS UNVAN1, " +
                " CASE cari_doviz_cinsi WHEN 0 THEN 'TL' WHEN 1 THEN 'USD' WHEN 2 THEN 'EURO' END AS DOVIZCINS, " +
                " ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) AS BAKIYE" +
                " FROM CARI_HESAPLAR WHERE  ((cari_kod = @KODU) OR (@KODU = '')) AND ((cari_unvan1 = @ADI) OR (@ADI = '')) " ,
        param : ['KODU','ADI'],
        type : ['string|25','string|127']
    },
    FiyatGetir : 
    {
        query : "SELECT TOP 1 " + 
                "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) " + 
                "ELSE " + 
                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                "END AS FIYAT, " + 
                "sfiyat_doviz AS DOVIZ, " + 
                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                "sfiyat_iskontokod AS ISKONTOKOD " + 
                "FROM STOK_SATIS_FIYAT_LISTELERI " +
                "WHERE sfiyat_stokkod = @KODU AND sfiyat_listesirano = @LISTENO AND sfiyat_deposirano IN (0,@DEPO) " +
                "ORDER BY sfiyat_deposirano DESC " , 
        param : ['KODU','LISTENO','DEPO'],
        type : ['string|25','int','int']
    },
    FiyatListeGetir :
    {
        query : "SELECT  sfl_sirano AS LISTENO, sfl_aciklama AS LISTEADI FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI "
    },
    IskontoMatrisGetir : 
    {
        query : "SELECT " + 
                "isk_isk1_yuzde AS ORAN1, " + 
                "isk_isk2_yuzde AS ORAN2, " + 
                "isk_isk3_yuzde AS ORAN3, " + 
                "isk_isk4_yuzde AS ORAN4, " + 
                "isk_isk5_yuzde AS ORAN5, " + 
                "isk_isk6_yuzde AS ORAN6 " + 
                "FROM STOK_CARI_ISKONTO_TANIMLARI WHERE isk_stok_kod = @STOK AND isk_cari_kod = @CARI AND isk_uygulama_odeme_plani = @ODEME", 
        param : ['STOK','CARI','ODEME'],
        type : ['string|25','string|25','int']
    },
    SonAlisFiyatGetir : 
    {
        query : "SELECT sth_cari_kodu AS CARI,sth_stok_kod AS STOK, " + 
                "sth_tutar / sth_miktar  AS SONFIYAT, " + 
                "sth_har_doviz_cinsi AS DOVIZ, " + 
                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sth_har_doviz_cinsi,0))),'TL') AS DOVIZSEMBOL, " + 
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sth_har_doviz_cinsi,0),2)),1) AS DOVIZKUR " + 
                "FROM STOK_HAREKETLERI AS Hesaplama WHERE sth_evraktip IN (13,3) AND  " + 
                "sth_Guid = (SELECT TOP 1 sth_Guid FROM STOK_HAREKETLERI AS Hesaplama1  " + 
                "WHERE Hesaplama1.sth_evraktip IN (13,3) AND Hesaplama1.sth_cari_kodu = Hesaplama.sth_cari_kodu AND Hesaplama1.sth_stok_kod = Hesaplama.sth_stok_kod  " + 
                "ORDER BY sth_create_date DESC) AND Hesaplama.sth_cari_kodu  = @sth_cari_kodu AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_cari_kodu','sth_stok_kod'],
        type : ['string|25','string|25']
    },
    TumSonAlisGetir :
    {
        query : "SELECT sth_cari_kodu AS CARI,sth_stok_kod AS STOK, " + 
        "ROUND((sth_tutar / sth_miktar),0)  AS SONFIYAT, " + 
        "sth_har_doviz_cinsi AS DOVIZ, " + 
        "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sth_har_doviz_cinsi,0))),'TL') AS DOVIZSEMBOL, " + 
        "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sth_har_doviz_cinsi,0),2)),1) AS DOVIZKUR " + 
        "FROM STOK_HAREKETLERI AS Hesaplama WHERE sth_evraktip IN (13,3) AND  " + 
        "sth_Guid = (SELECT TOP 1 sth_Guid FROM STOK_HAREKETLERI AS Hesaplama1  " + 
        "WHERE Hesaplama1.sth_evraktip IN (13,3)  AND Hesaplama1.sth_stok_kod = Hesaplama.sth_stok_kod  " + 
        "ORDER BY sth_create_date DESC) AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_stok_kod'],
        type  : ['string|25']
    },
    StokDetay : 
    {
        query : "SELECT sth_cari_kodu AS CARI,sth_stok_kod AS STOK, " + 
                "IIF(sth_tutar = 0, 1,sth_tutar) / IIF(sth_miktar = 0,1,sth_miktar) AS SONFIYAT, " +
                "sth_har_doviz_cinsi AS DOVIZ, " + 
                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sth_har_doviz_cinsi,0))),'TL') AS DOVIZSEMBOL, " + 
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sth_har_doviz_cinsi,0),2)),1) AS DOVIZKUR, " +
                "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=2) = 0 THEN " +
                "dbo.fn_StokSatisFiyati(sth_stok_kod,2,sth_giris_depo_no,0) " +
                "ELSE  " +
                "dbo.fn_StokSatisFiyati(sth_stok_kod,2,sth_giris_depo_no,0) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sth_stok_kod)) / 100) + 1) " +
                "END AS FIYAT " +
                "FROM STOK_HAREKETLERI AS Hesaplama WHERE sth_evraktip IN (1,4) AND  " + 
                "sth_Guid = (SELECT TOP 1 sth_Guid FROM STOK_HAREKETLERI AS Hesaplama1  " + 
                "WHERE Hesaplama1.sth_evraktip IN (1,4) AND Hesaplama1.sth_stok_kod = Hesaplama.sth_stok_kod  " + 
                "ORDER BY sth_create_date DESC)" , 
        param : ['1'],
        type : ['string|25']
    },
    SatisSartiGetir : 
    {
        query : "SELECT sat_stok_kod AS STOKKOD " +
                ",sat_cari_kod AS CARIKOD " +
                ",sat_bitis_tarih AS BITIS " +
                ",sat_basla_tarih AS BASLANGIC " +
                ",sat_brut_fiyat -(sat_det_isk_miktar1 + sat_det_isk_miktar2 + sat_det_isk_miktar3 + sat_det_isk_miktar4 + sat_det_isk_miktar5 + sat_det_isk_miktar6) AS FIYAT " +
                ",sat_det_isk_miktar1 AS ISKONTOM1 " +
                ",sat_det_isk_miktar2 AS ISKONTOM2 " +
                ",sat_det_isk_miktar3 AS ISKONTOM3 " +
                ",sat_det_isk_miktar4 AS ISKONTOM4 " +
                ",sat_det_isk_miktar5 AS ISKONTOM5 " +
                ",sat_det_isk_miktar6 AS ISKONTOM6 " +
                ",sat_det_isk_yuzde1 AS ISKONTOY1 " +
                ",sat_det_isk_yuzde2 AS ISKONTOY2 " +
                ",sat_det_isk_yuzde3 AS ISKONTOY3 " +
                ",sat_det_isk_yuzde4 AS ISKONTOY4 " +
                ",sat_det_isk_yuzde5 AS ISKONTOY5 " +
                ",sat_det_isk_yuzde6 AS ISKONTOY6 " +
                ",sat_odeme_plan AS ODEPLAN " +
                ",sat_doviz_cinsi AS DOVIZ " +
                ",sat_depo_no AS DEPO " +
                ",sat_fiyat_liste_no AS LISTENO " +
                ",(SELECT dbo.fn_DovizSembolu(ISNULL(sat_doviz_cinsi,0))) AS DOVIZSEMBOL " +
                ",(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sat_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM SATIS_SARTLARI " +
                "WHERE sat_basla_tarih <= GETDATE() AND (sat_bitis_tarih >= GETDATE() OR sat_bitis_tarih = '18991230') " +
                "AND sat_cari_kod = @sat_cari_kod AND sat_stok_kod = @sat_stok_kod AND (sat_depo_no = @sat_depo_no OR sat_depo_no = 0) " +
                "ORDER BY sat_basla_tarih,sat_depo_no DESC , sat_bitis_tarih ASC" , 
        param : ['sat_cari_kod','sat_stok_kod','sat_depo_no'],
        type : ['string|25','string|25','int']
    },
    AlisSartiGetir : 
    {
        query : "SELECT sas_stok_kod AS STOKKOD, " +
                "sas_cari_kod AS CARIKOD, " +
                "sas_bitis_tarih AS BITIS, " +
                "sas_basla_tarih AS BASLANGIC, " +
                "sas_brut_fiyat AS FIYAT, " +
                "sas_isk_miktar1 AS ISKONTOM1, " +
                "sas_isk_miktar2 AS ISKONTOM2, " +
                "sas_isk_miktar3 AS ISKONTOM3, " +
                "sas_isk_miktar4 AS ISKONTOM4, " +
                "sas_isk_miktar5 AS ISKONTOM5, " +
                "sas_isk_yuzde1 AS ISKONTOY1, " +
                "sas_isk_yuzde2 AS ISKONTOY2, " +
                "sas_isk_yuzde3 AS ISKONTOY3, " +
                "sas_isk_yuzde4 AS ISKONTOY4, " +
                "sas_isk_yuzde5 AS ISKONTOY5, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_doviz_cinsi AS DOVIZ, " + 
                "sas_depo_no AS DEPO, " +
                "1 AS LISTENO, " +
                "(SELECT     dbo.fn_DovizSembolu(ISNULL(sas_doviz_cinsi, 0))) AS DOVIZSEMBOL, " +
                "(SELECT     dbo.fn_KurBul(CONVERT(VARCHAR(10), GETDATE(), 112), ISNULL(sas_doviz_cinsi, 0), 2)) AS DOVIZKUR " +
                "FROM SATINALMA_SARTLARI " +
                "WHERE sas_basla_tarih <= GETDATE() AND (sas_bitis_tarih >= GETDATE() OR sas_bitis_tarih = '18991230') " +
                "AND sas_cari_kod = @sas_cari_kod AND sas_stok_kod = @sas_stok_kod AND (sas_depo_no = @sas_depo_no OR sas_depo_no = 0) " +
                "ORDER BY sas_basla_tarih,sas_depo_no DESC, sas_bitis_tarih ASC" , 
        param : ['sas_cari_kod','sas_stok_kod','sas_depo_no'],
        type : ['string|25','string|25','int']
    },
    PartiLotGetir :
    {
        query : "SELECT pl_partikodu AS PARTI, " + 
                "pl_lotno AS LOT, " +
                "pl_stokkodu AS STOK, " +
                "ISNULL((SELECT [dbo].[fn_DepodakiPartiliMiktar] (pl_stokkodu,@DepoNo,GETDATE(),pl_partikodu,pl_lotno)),0) AS MIKTAR, " +
                "0 AS KALAN, " +
                "pl_son_kullanim_tar AS SKTTARIH " + 
                "FROM PARTILOT " +
                "WHERE pl_stokkodu = @pl_stokkodu " +
                "AND ((pl_partikodu = @pl_partikodu) OR (@pl_partikodu = '')) AND ((pl_lotno = @pl_lotno) OR (@pl_lotno = 0)) " +
                "ORDER BY pl_partikodu ASC ",
        param : ['pl_stokkodu','DepoNo','pl_partikodu','pl_lotno'],
        type : ['string|25','int','string|25','int']
    },
    PartiLotInsert :
    {
        query : "INSERT INTO [dbo].[PARTILOT] " +
           "([pl_DBCno] " +
            ",[pl_SpecRECno] " +
            ",[pl_iptal] " +
            ",[pl_fileid] " +
            ",[pl_hidden] " +
            ",[pl_kilitli] " +
            ",[pl_degisti] " +
            ",[pl_checksum] " +
            ",[pl_create_user] " +
            ",[pl_create_date] " +
            ",[pl_lastup_user] " +
            ",[pl_lastup_date] " +
            ",[pl_ozelkod1] " +
            ",[pl_ozelkod2] " +
            ",[pl_ozelkod3] " +
            ",[pl_partikodu] " +
            ",[pl_lotno] " +
            ",[pl_stokkodu] " +
            ",[pl_aciklama] " +
            ",[pl_olckalkdeg_deg1] " +
            ",[pl_olckalkdeg_deg2] " +
            ",[pl_olckalkdeg_deg3] " +
            ",[pl_olckalkdeg_deg4] " +
            ",[pl_olckalkdeg_deg5] " +
            ",[pl_olckalkdeg_deg6] " +
            ",[pl_olckalkdeg_deg7] " +
            ",[pl_olckalkdeg_deg8] " +
            ",[pl_olckalkdeg_deg9] " +
            ",[pl_olckalkdeg_deg10] " +
            ",[pl_olckalkdeg_aciklama1] " +
            ",[pl_olckalkdeg_aciklama2] " +
            ",[pl_olckalkdeg_aciklama3] " +
            ",[pl_olckalkdeg_aciklama4] " +
            ",[pl_olckalkdeg_aciklama5] " +
            ",[pl_olckalkdeg_aciklama6] " +
            ",[pl_olckalkdeg_aciklama7] " +
            ",[pl_olckalkdeg_aciklama8] " +
            ",[pl_olckalkdeg_aciklama9] " +
            ",[pl_olckalkdeg_aciklama10] " +
            ",[pl_son_kullanim_tar] " +
            ",[pl_DaraliKilo] " +
            ",[pl_SafiKilo] " +
            ",[pl_En] " +
            ",[pl_Boy] " +
            ",[pl_Yukseklik] " +
            ",[pl_OzgulAgirlik] " +
            ",[pl_kod1] " +
            ",[pl_kod2] " +
            ",[pl_kod3] " +
            ",[pl_kod4] " +
            ",[pl_kod5] " +
            ",[pl_kod6] " +
            ",[pl_kod7] " +
            ",[pl_kod8] " +
            ",[pl_kod9] " +
            ",[pl_kod10] " +
            ",[pl_uretim_tar]) " +
            "VALUES " +
            "(0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",153 \n" +
            ",0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",@pl_create_user						--<pl_create_user, smallint,> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_create_date, datetime,> \n" +
            ",@pl_lastup_user						--<pl_lastup_user, smallint,> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_lastup_date, datetime,> \n" +
            ",''									--<pl_ozelkod1, nvarchar(4),> \n" +
            ",''									--<pl_ozelkod2, nvarchar(4),> \n" +
            ",''									--<pl_ozelkod3, nvarchar(4),> \n" +
            ",@pl_partikodu						--<pl_partikodu, nvarchar(25),> \n" +
            ",@pl_lotno							--<pl_lotno, int,> \n" +
            ",@pl_stokkodu						--<pl_stokkodu, nvarchar(25),> \n" +
            ",''									--<pl_aciklama, nvarchar(50),> \n" +
            ",0									--<pl_olckalkdeg_deg1, float,> \n" +
            ",0									--<pl_olckalkdeg_deg2, float,> \n" +
            ",0									--<pl_olckalkdeg_deg3, float,> \n" +
            ",0									--<pl_olckalkdeg_deg4, float,> \n" +
            ",0									--<pl_olckalkdeg_deg5, float,> \n" +
            ",0									--<pl_olckalkdeg_deg6, float,> \n" +
            ",0									--<pl_olckalkdeg_deg7, float,> \n" +
            ",0									--<pl_olckalkdeg_deg8, float,> \n" +
            ",0									--<pl_olckalkdeg_deg9, float,> \n" +
            ",0									--<pl_olckalkdeg_deg10, float,> \n" +
            ",''									--<pl_olckalkdeg_aciklama1, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama2, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama3, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama4, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama5, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama6, nvarchar(25),> \n" + 
            ",''									--<pl_olckalkdeg_aciklama7, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama8, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama9, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama10, nvarchar(25),> \n" +
            ",@pl_son_kullanim_tar						--<pl_son_kullanim_tar, datetime,> \n" +
            ",0									--<pl_DaraliKilo, float,> \n" +
            ",0									--<pl_SafiKilo, float,> \n" +
            ",0									--<pl_En, float,> \n" +
            ",0									--<pl_Boy, float,> \n" +
            ",0									--<pl_Yukseklik, float,> \n" +
            ",0									--<pl_OzgulAgirlik, float,> \n" +
            ",''									--<pl_kod1, nvarchar(25),> \n" +
            ",''									--<pl_kod2, nvarchar(25),> \n" +
            ",''									--<pl_kod3, nvarchar(25),> \n" +
            ",''									--<pl_kod4, nvarchar(25),> \n" +
            ",''									--<pl_kod5, nvarchar(25),> \n" +
            ",''									--<pl_kod6, nvarchar(25),> \n" +
            ",''									--<pl_kod7, nvarchar(25),> \n" +
            ",''									--<pl_kod8, nvarchar(25),> \n" +
            ",''									--<pl_kod9, nvarchar(25),> \n" +
            ",''									--<pl_kod10, nvarchar(25),> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)									--<pl_uretim_tar, datetime,> \n" +
            ")",
        param : ['pl_create_user:int','pl_lastup_user:int','pl_partikodu:string|25','pl_lotno:int','pl_stokkodu:string|25','pl_son_kullanim_tar:date']
    },
    MaxPartiLot : 
    {
        query : "SELECT ISNULL(MAX(pl_lotno),0) + 1 AS LOT " +
                "FROM PARTILOT  WHERE pl_partikodu = @pl_partikodu " ,
        param : ['pl_partikodu'],
        type : ['string|25']
    },
    RenkGetir :
    {
        query : "SELECT rnk_kirilimID AS PNTR , rnk_kirilim AS KIRILIM " +
                "FROM STOK_RENK_TANIMLARI_DIKEY WHERE rnk_kodu = @rnk_kodu " ,
        param : ['rnk_kodu'],
        type : ['string|25']
    },
    BedenGetir :
    {
        query : "SELECT bdn_kirilimID AS PNTR , bdn_kirilim AS KIRILIM " +
                "FROM STOK_BEDEN_TANIMLARI_DIKEY WHERE bdn_kodu = @bdn_kodu " ,
        param : ['bdn_kodu'],
        type : ['string|25']
    },
    SiparisKabulListele : 
    {
        query : "SELECT " +
                "CONVERT(VARCHAR(10),SIPARIS.sip_teslim_tarih,104) AS TESLIMTARIH, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SUM(SIPARIS.sip_miktar) AS SIPMIKTAR, " +                     
                "SUM(SIPARIS.sip_teslim_miktar) AS TESLIMMIKTAR, " + 
                "SIPARIS.sip_depono AS DEPO, " + 
                "SIPARIS.sip_adresno AS ADRESNO, " +                    
                "SUM(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar) AS BMIKTAR, " +
                "COUNT(SIPARIS.sip_satirno) AS SATIR, " +
                "CARI_HESAPLAR.cari_kod AS CARIKOD, " +             
                "CARI_HESAPLAR.cari_unvan1 AS CARIADI, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "MAX(SIPARIS.sip_cari_sormerk) AS SORUMLULUK, " +
                "MAX(SIPARIS.sip_satici_kod) AS PERSONEL, " +
                "MAX(sip_projekodu) AS PROJE, " +
                "MAX(CARI_HESAPLAR.cari_temsilci_kodu) AS TEMSILCIKODU, " +
                "MAX(SIPARIS.sip_opno) AS ODEMENO, " +
                "SIPARIS.sip_aciklama AS ACIKLAMA " +
                "FROM SIPARISLER AS SIPARIS INNER JOIN " +
                "BARKOD_TANIMLARI AS BARKOD ON SIPARIS.sip_stok_kod = BARKOD.bar_stokkodu " +
                "AND SIPARIS.sip_teslim_miktar < SIPARIS.sip_miktar INNER JOIN " +
                "CARI_HESAPLAR ON SIPARIS.sip_musteri_kod = CARI_HESAPLAR.cari_kod " +
                "WHERE SIPARIS.sip_teslim_tarih>=@ILKTARIH AND SIPARIS.sip_teslim_tarih<=@SONTARIH AND " +
                "((CARI_HESAPLAR.cari_temsilci_kodu = @PLASIYERKODU) OR (@PLASIYERKODU = '')) AND SIPARIS.sip_OnaylayanKulNo <> @ONAYLAYANKULNO AND ((SIPARIS.sip_musteri_kod = @CARIKODU) OR (@CARIKODU = '')) " +
                "AND SIPARIS.sip_depono=@DEPONO AND SIPARIS.sip_tip=@TIP " +
                "GROUP BY SIPARIS.sip_teslim_tarih,SIPARIS.sip_evrakno_seri,SIPARIS.sip_evrakno_sira,SIPARIS.sip_depono, " +
                "SIPARIS.sip_adresno,CARI_HESAPLAR.cari_kod,CARI_HESAPLAR.cari_unvan1,SIPARIS.sip_aciklama,SIPARIS.sip_doviz_cinsi " +
                "HAVING SUM(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar) > 0 " +
                "ORDER BY sip_teslim_tarih",
        param : ['ILKTARIH','SONTARIH','DEPONO','TIP','PLASIYERKODU','ONAYLAYANKULNO','CARIKODU'],
        type : ['date','date','int','int','string|25','int','string|25']
    }, 
    SiparisSeriSiraListele : 
    {
        query : "SELECT " +
                "CONVERT(VARCHAR(10),SIPARIS.sip_teslim_tarih,104) AS TESLIMTARIH, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SUM(SIPARIS.sip_miktar) AS SIPMIKTAR, " +                     
                "SUM(SIPARIS.sip_teslim_miktar) AS TESLIMMIKTAR, " + 
                "SIPARIS.sip_depono AS DEPO, " + 
                "SIPARIS.sip_adresno AS ADRESNO, " +                    
                "SUM(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar) AS BMIKTAR, " +
                "COUNT(SIPARIS.sip_satirno) AS SATIR, " +
                "CARI_HESAPLAR.cari_kod AS CARIKOD, " +             
                "CARI_HESAPLAR.cari_unvan1 AS CARIADI, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "MAX(SIPARIS.sip_cari_sormerk) AS SORUMLULUK, " +
                "MAX(SIPARIS.sip_satici_kod) AS PERSONEL, " +
                "MAX(sip_projekodu) AS PROJE, " +
                "MAX(SIPARIS.sip_opno) AS ODEMENO, " +
                "SIPARIS.sip_aciklama AS ACIKLAMA " +
                "FROM SIPARISLER AS SIPARIS INNER JOIN " +
                "BARKOD_TANIMLARI AS BARKOD ON SIPARIS.sip_stok_kod = BARKOD.bar_stokkodu " +
                "AND SIPARIS.sip_teslim_miktar < SIPARIS.sip_miktar INNER JOIN " +
                "CARI_HESAPLAR ON SIPARIS.sip_musteri_kod = CARI_HESAPLAR.cari_kod " +
                "WHERE SIPARIS.sip_evrakno_seri = @SERI AND SIPARIS.sip_evrakno_sira = @SIRA " +
                " AND SIPARIS.sip_tip=@TIP " +
                "GROUP BY SIPARIS.sip_teslim_tarih,SIPARIS.sip_evrakno_seri,SIPARIS.sip_evrakno_sira,SIPARIS.sip_depono,SIPARIS.sip_belgeno, " +
                "SIPARIS.sip_adresno,CARI_HESAPLAR.cari_kod,CARI_HESAPLAR.cari_unvan1,SIPARIS.sip_aciklama,SIPARIS.sip_doviz_cinsi " +
                "HAVING SUM(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar) > 0 " +
                "ORDER BY sip_teslim_tarih",
        param : ['SERI','SIRA','TIP'],
        type : ['string|25','int','int']
    },  
    NakliyeListele :
    {
        query: "SELECT " +
        "NAKLIYE.sth_evraktip AS TIP, " +
        "NAKLIYE.sth_tarih AS TARIH, " +
        "NAKLIYE.sth_birim_pntr AS BIRIMPNTR," +
        "NAKLIYE.sth_evrakno_seri AS SERI, " +
        "NAKLIYE.sth_evrakno_sira AS SIRA, " +              
        "NAKLIYE.sth_giris_depo_no AS   GDEPO, " +
        "NAKLIYE.sth_cikis_depo_no AS   CDEPO, " +
        "NAKLIYE.sth_nakliyedeposu AS   NDEPO,    " +   
        "(SELECT dep_adi FROM DEPOLAR WHERE dep_no =  NAKLIYE.sth_giris_depo_no) AS   GDEPOADI ,"  +       
        "(SELECT dep_adi FROM DEPOLAR WHERE dep_no =  NAKLIYE.sth_cikis_depo_no) AS   CDEPOADI ,"  +       
        "(SELECT dep_adi FROM DEPOLAR WHERE dep_no =  NAKLIYE.sth_nakliyedeposu) AS   NDEPOADI "  +       
        "FROM STOK_HAREKETLERI AS NAKLIYE  " +
        "WHERE NAKLIYE.sth_tarih>=@ILKTARIH AND  NAKLIYE.sth_tarih<=@SONTARIH and NAKLIYE.sth_evraktip = 17 AND NAKLIYE.sth_evraktip=@TIP and NAKLIYE.sth_nakliyedurumu = 0 " +
        "GROUP BY NAKLIYE.sth_tarih,NAKLIYE.sth_evrakno_seri, NAKLIYE.sth_evrakno_sira," +
        "NAKLIYE.sth_giris_depo_no,NAKLIYE.sth_cikis_depo_no,NAKLIYE.sth_nakliyedeposu,NAKLIYE.sth_evraktip,NAKLIYE.sth_birim_pntr " ,
        param : ['ILKTARIH','SONTARIH','TIP'],
        type : ['date','date','int']

    },  
    SiparisStokGetir :
    {
        query : "SELECT " +
                "CONVERT(NVARCHAR(50),SIPARIS.sip_Guid) AS RECNO, " +
                "ISNULL(MAX(BARKOD.bar_kodu),'') AS BARKOD, " +
                "SIPARIS.sip_stok_kod AS KODU, " +
                "STOK.sto_isim AS ADI, " +
                "SIPARIS.sip_tarih AS TARIH, " +
                "SIPARIS.sip_teslim_tarih AS TESLIMTARIH, " +
                "SIPARIS.sip_tip AS TIP, " +
                "SIPARIS.sip_cins AS CINS, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SIPARIS.sip_satirno AS SATIRNO, " +
                "SIPARIS.sip_belgeno AS BELGENO, " +
                "SIPARIS.sip_belge_tarih AS BELGETARIH, " +
                "SIPARIS.sip_satici_kod AS SATICIKOD, " +
                "SIPARIS.sip_musteri_kod AS CARI, " +
                "ROUND(SIPARIS.sip_b_fiyat * SIPARIS.sip_doviz_kuru,2)  AS FIYAT, " +
                "ISNULL(BEDENHAR.BdnHar_HarGor,SIPARIS.sip_miktar) AS SIPMIKTAR, " +
                "BARKOD.bar_birimpntr AS BIRIMPNTR, " +
                "ISNULL(BEDENHAR.BdnHar_TesMik,SIPARIS.sip_teslim_miktar) AS TESLIMMIKTAR, " +
                "SIPARIS.sip_tutar AS TUTAR, " +
                "SIPARIS.sip_iskonto_1 AS ISKONTO_1, " +
                "SIPARIS.sip_iskonto_2 AS ISKONTO_2, " +
                "SIPARIS.sip_iskonto_3 AS ISKONTO_3, " +
                "SIPARIS.sip_iskonto_4 AS ISKONTO_4, " +
                "SIPARIS.sip_iskonto_5 AS ISKONTO_5, " +
                "SIPARIS.sip_iskonto_6 AS ISKONTO_6, " +
                "SIPARIS.sip_vergi_pntr AS TOPTANVERGIPNTR, " +
                "SIPARIS.sip_vergi AS VERGI, " +
                "SIPARIS.sip_opno AS ODEMENO, " +
                "SIPARIS.sip_depono AS DEPO, " +
                "SIPARIS.sip_cari_sormerk AS CARISORUMLU, " +
                "SIPARIS.sip_stok_sormerk AS STOKSORUMLU, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "SIPARIS.sip_doviz_kuru AS DOVIZKURU, " +
                "SIPARIS.sip_alt_doviz_kuru AS ALTDOVIZKURU, " +
                "SIPARIS.sip_adresno AS ADRESNO, " +
                "SIPARIS.sip_iskonto1 AS ISKONTO1, " +
                "SIPARIS.sip_iskonto2 AS ISKONTO2, " +
                "SIPARIS.sip_iskonto3 AS ISKONTO3, " +
                "SIPARIS.sip_iskonto4 AS ISKONTO4, " +
                "SIPARIS.sip_iskonto5 AS ISKONTO5, " +
                "SIPARIS.sip_iskonto6 AS ISKONTO6, " +
                "SIPARIS.sip_isk1 AS ISK1, " +
                "SIPARIS.sip_isk2 AS ISK2, " +
                "SIPARIS.sip_isk3 AS ISK3, " +
                "SIPARIS.sip_isk4 AS ISK4, " +
                "SIPARIS.sip_isk5 AS ISK5, " +
                "SIPARIS.sip_isk6 AS ISK6, " +
                "ISNULL((BEDENHAR.BdnHar_HarGor - BEDENHAR.BdnHar_TesMik)	,(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar)) AS BMIKTAR, " +
                "(SELECT dbo.fn_beden_kirilimi (dbo.fn_bedenharnodan_beden_no_bul(BEDENHAR.BdnHar_BedenNo),STOK.sto_beden_kodu)) AS BEDEN, " +
                "(SELECT dbo.fn_renk_kirilimi (dbo.fn_bedenharnodan_renk_no_bul(BEDENHAR.BdnHar_BedenNo),STOK.sto_renk_kodu)) AS RENK, " +
                "ISNULL(BEDENHAR.BdnHar_BedenNo,0) AS BEDENNO, " +
                "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO  ,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "(SELECT dbo.fn_StokBirimi (SIPARIS.sip_stok_kod,SIPARIS.sip_birim_pntr)) AS BIRIM, " +
                "ISNULL(dbo.fn_bedenharnodan_beden_no_bul(BEDENHAR.BdnHar_BedenNo),0) AS BEDENPNTR, " +
                "ISNULL(dbo.fn_bedenharnodan_renk_no_bul(BEDENHAR.BdnHar_BedenNo),0) AS RENKPNTR, " +
                "STOK.sto_beden_kodu AS BEDENKODU, " +
                "STOK.sto_renk_kodu AS RENKKODU, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (SIPARIS.sip_stok_kod,BARKOD.bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_VergiYuzde (SIPARIS.sip_vergi_pntr)) AS TOPTANVERGI, " +
                "STOK.sto_detay_takip AS DETAYTAKIP, " +
                "STOK.sto_siparis_dursun AS SIPARISDURSUN, " +
                "STOK.sto_malkabul_dursun AS MALKABULDURSUN, " +
                "MAX(sip_aciklama) AS ACIKLAMA, " +
                "MAX(sip_aciklama2) AS ACIKLAMA2, " +
                "MAX(sip_projekodu) AS PROJE, " +
                "MAX(CONVERT(NVARCHAR(50),sip_yetkili_uid)) AS YETKILI, " +
                "sip_Exp_Imp_Kodu AS EXIMKODU, " +
                "ISNULL(BARKOD.bar_partikodu,sip_parti_kodu) AS PARTI, " +
                "ISNULL(BARKOD.bar_lotno,sip_lot_no) AS LOT " +
                "FROM SIPARISLER AS SIPARIS  " +
                "LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON " +
                "BEDENHAR.[BdnHar_Tipi] = 9 AND BEDENHAR.BdnHar_Har_uid = SIPARIS.sip_Guid " +
                "INNER JOIN STOKLAR AS STOK ON " +
                "STOK.sto_kod = SIPARIS.sip_stok_kod " +
                "LEFT OUTER JOIN BARKOD_TANIMLARI AS BARKOD ON " +
                "BARKOD.bar_stokkodu = SIPARIS.sip_stok_kod AND BARKOD.bar_bedenpntr = " +
                "CASE WHEN STOK.sto_beden_kodu <> '' THEN ISNULL(dbo.fn_bedenharnodan_beden_no_bul(BEDENHAR.BdnHar_BedenNo),0) ELSE 0 END " +
                "AND BARKOD.bar_renkpntr = CASE WHEN STOK.sto_renk_kodu <> '' THEN  ISNULL(dbo.fn_bedenharnodan_renk_no_bul(BEDENHAR.BdnHar_BedenNo),0) ELSE 0 END " +
                "WHERE SIPARIS.sip_musteri_kod = @CARI " + 
                "AND ((SIPARIS.sip_evrakno_seri = @SERI OR (@SERI = '')) AND ((SIPARIS.sip_evrakno_sira = @SIRA) OR (@SIRA = 0))) " +
                "AND ((BARKOD.bar_kodu = @BARKOD OR STOK.sto_kod = @BARKOD) OR (@BARKOD = '')) " +
                "AND ISNULL(BEDENHAR.BdnHar_HarGor,SIPARIS.sip_miktar) > ISNULL(BEDENHAR.BdnHar_TesMik,SIPARIS.sip_teslim_miktar) " +
                "AND ((SELECT dbo.fn_beden_kirilimi (dbo.fn_bedenharnodan_beden_no_bul(BEDENHAR.BdnHar_BedenNo),STOK.sto_beden_kodu)) IS NOT NULL " +
                "OR (SELECT dbo.fn_renk_kirilimi (dbo.fn_bedenharnodan_renk_no_bul(BEDENHAR.BdnHar_BedenNo),STOK.sto_renk_kodu)) IS NOT NULL) " +
                "GROUP BY " + 
                "SIPARIS.sip_Guid, " +
                "SIPARIS.sip_stok_kod, " +
                "STOK.sto_isim, " +
                "SIPARIS.sip_tarih, " +
                "SIPARIS.sip_teslim_tarih, " +
                "SIPARIS.sip_tip, " +
                "SIPARIS.sip_cins, " +
                "SIPARIS.sip_evrakno_seri, " +
                "SIPARIS.sip_evrakno_sira, " +
                "SIPARIS.sip_satirno, " +
                "SIPARIS.sip_belgeno, " +
                "SIPARIS.sip_belge_tarih, " +
                "SIPARIS.sip_satici_kod, " +
                "SIPARIS.sip_musteri_kod, " +
                "SIPARIS.sip_b_fiyat, " +
                "SIPARIS.sip_miktar, " +
                "SIPARIS.sip_birim_pntr, " +
                "SIPARIS.sip_teslim_miktar, " +
                "SIPARIS.sip_tutar, " +
                "SIPARIS.sip_iskonto_1, " +
                "SIPARIS.sip_iskonto_2, " +
                "SIPARIS.sip_iskonto_3, " +
                "SIPARIS.sip_iskonto_4, " +
                "SIPARIS.sip_iskonto_5, " +
                "SIPARIS.sip_iskonto_6, " +
                "SIPARIS.sip_vergi_pntr, " +
                "SIPARIS.sip_vergi, " +
                "SIPARIS.sip_opno, " +
                "SIPARIS.sip_depono, " +
                "SIPARIS.sip_cari_sormerk, " +
                "SIPARIS.sip_stok_sormerk, " +
                "SIPARIS.sip_doviz_cinsi, " +
                "SIPARIS.sip_doviz_kuru, " +
                "SIPARIS.sip_alt_doviz_kuru, " +
                "SIPARIS.sip_adresno, " +
                "SIPARIS.sip_iskonto1, " +
                "SIPARIS.sip_iskonto2, " +
                "SIPARIS.sip_iskonto3, " +
                "SIPARIS.sip_iskonto4, " +
                "SIPARIS.sip_iskonto5, " +
                "SIPARIS.sip_iskonto6, " +
                "SIPARIS.sip_isk1, " +
                "SIPARIS.sip_isk2, " +
                "SIPARIS.sip_isk3, " +
                "SIPARIS.sip_isk4, " +
                "SIPARIS.sip_isk5, " +
                "SIPARIS.sip_isk6, " +
                "BARKOD.bar_bedenpntr, " +
                "BARKOD.bar_renkpntr, " +
                "STOK.sto_detay_takip, " +
                "STOK.sto_siparis_dursun, " +
                "STOK.sto_malkabul_dursun, " +
                "sip_Exp_Imp_Kodu, " +
                "bar_partikodu, " +
                "bar_lotno, " +
                "BARKOD.bar_birimpntr, " +
                "STOK.sto_beden_kodu, " +
                "STOK.sto_renk_kodu, " +
                "BEDENHAR.BdnHar_BedenNo, " +
                "STOK.sto_kod, " +
                "sip_aciklama2, " +
                "BEDENHAR.BdnHar_HarGor, " +
                "BEDENHAR.BdnHar_TesMik," +
                "sip_parti_kodu," +
                "sip_lot_no " ,
        param : ['DEPONO','CARI','SERI','SIRA','BARKOD'],
        type : ['int','string|25','string|10','int','string|25']
    },
    EslestirmeOtukmaSayı :
    {
        query: "SELECT COUNT(sth_stok_kod) AS OKUTULAN FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @SERI AND sth_evrakno_sira = @SIRA  AND sth_stok_kod = @sth_stok_kod AND sth_evraktip = 1 ",
        param : ['SERI','SIRA','sth_stok_kod'],
        type : ['string|20','int','string|20']
    },
    //Sipariş
    SiparisInsert : 
    {
        query : "DECLARE @UIDTABLE table([sip_Guid] [uniqueidentifier]) " +
                "INSERT INTO [SIPARISLER] " +
                "([sip_DBCno] " +
                ",[sip_SpecRECno] " +
                ",[sip_iptal] " +
                ",[sip_fileid] " +
                ",[sip_hidden] " +
                ",[sip_kilitli] " +
                ",[sip_degisti] " +
                ",[sip_checksum] " +
                ",[sip_create_user] " +
                ",[sip_create_date] " +
                ",[sip_lastup_user] " +
                ",[sip_lastup_date] " +
                ",[sip_special1] " +
                ",[sip_special2] " +
                ",[sip_special3] " +
                ",[sip_firmano] " +
                ",[sip_subeno] " +
                ",[sip_tarih] " +
                ",[sip_teslim_tarih] " +
                ",[sip_tip] " +
                ",[sip_cins] " +
                ",[sip_evrakno_seri] " +
                ",[sip_evrakno_sira] " +
                ",[sip_satirno] " +
                ",[sip_belgeno] " +
                ",[sip_belge_tarih] " +
                ",[sip_satici_kod] " +
                ",[sip_musteri_kod] " +
                ",[sip_stok_kod] " +
                ",[sip_b_fiyat] " +
                ",[sip_miktar] " +
                ",[sip_birim_pntr] " +
                ",[sip_teslim_miktar] " +
                ",[sip_tutar] " +
                ",[sip_iskonto_1] " +
                ",[sip_iskonto_2] " +
                ",[sip_iskonto_3] " +
                ",[sip_iskonto_4] " +
                ",[sip_iskonto_5] " +
                ",[sip_iskonto_6] " +
                ",[sip_masraf_1] " +
                ",[sip_masraf_2] " +
                ",[sip_masraf_3] " +
                ",[sip_masraf_4] " +
                ",[sip_vergi_pntr] " +
                ",[sip_vergi] " +
                ",[sip_masvergi_pntr] " +
                ",[sip_masvergi] " +
                ",[sip_opno] " +
                ",[sip_aciklama] " +
                ",[sip_aciklama2] " +
                ",[sip_depono] " +
                ",[sip_OnaylayanKulNo] " +
                ",[sip_vergisiz_fl] " +
                ",[sip_kapat_fl] " +
                ",[sip_cari_sormerk] " +
                ",[sip_stok_sormerk] " +
                ",[sip_cari_grupno] " +
                ",[sip_doviz_cinsi] " +
                ",[sip_doviz_kuru] " +
                ",[sip_alt_doviz_kuru] " +
                ",[sip_adresno] " +
                ",[sip_teslimturu] " +
                ",[sip_cagrilabilir_fl] " +
                ",[sip_prosip_uid] " +
                ",[sip_iskonto1] " +
                ",[sip_iskonto2] " +
                ",[sip_iskonto3] " +
                ",[sip_iskonto4] " +
                ",[sip_iskonto5] " +
                ",[sip_iskonto6] " +
                ",[sip_masraf1] " +
                ",[sip_masraf2] " +
                ",[sip_masraf3] " +
                ",[sip_masraf4] " +
                ",[sip_isk1] " +
                ",[sip_isk2] " +
                ",[sip_isk3] " +
                ",[sip_isk4] " +
                ",[sip_isk5] " +
                ",[sip_isk6] " +
                ",[sip_mas1] " +
                ",[sip_mas2] " +
                ",[sip_mas3] " +
                ",[sip_mas4] " +
                ",[sip_Exp_Imp_Kodu] " +
                ",[sip_kar_orani] " +
                ",[sip_durumu] " +
                ",[sip_stal_uid] " +
                ",[sip_planlananmiktar] " +
                ",[sip_teklif_uid] " +
                ",[sip_parti_kodu] " +
                ",[sip_lot_no] " +
                ",[sip_projekodu] " +
                ",[sip_fiyat_liste_no] " +
                ",[sip_Otv_Pntr] " +
                ",[sip_Otv_Vergi] " +
                ",[sip_otvtutari] " +
                ",[sip_OtvVergisiz_Fl] " +
                ",[sip_paket_kod] " +
                ",[sip_Rez_uid] " +
                ",[sip_harekettipi] " +
                ",[sip_yetkili_uid] " +
                ",[sip_kapatmanedenkod] " +
                ",[sip_gecerlilik_tarihi] " +
                ",[sip_onodeme_evrak_tip] " +
                ",[sip_onodeme_evrak_seri] " +
                ",[sip_onodeme_evrak_sira] " +
                ",[sip_rezervasyon_miktari] " +
                ",[sip_rezerveden_teslim_edilen] " +
                ",[sip_HareketGrupKodu1] " +
                ",[sip_HareketGrupKodu2] " +
                ",[sip_HareketGrupKodu3] " +
                ") " +
                "OUTPUT INSERTED.[sip_Guid] INTO @UIDTABLE " +
                "VALUES ( " +
                "0							                    --<sip_DBCno, smallint,> \n" +
                ",0							                    --<sip_SpecRECno, int,> \n" +
                ",0							                    --<sip_iptal, bit,> \n" +
                ",21						                    --<sip_fileid, smallint,> \n" +
                ",0							                    --<sip_hidden, bit,> \n" +
                ",0							                    --<sip_kilitli, bit,> \n" +
                ",0							                    --<sip_degisti, bit,> \n" +
                ",0							                    --<sip_checksum, int,> \n" +
                ",@sip_create_user			                    --<sip_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)		    --<sip_create_date, datetime,> \n" +
                ",@sip_lastup_user			                    --<sip_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)		    --<sip_lastup_date, datetime,> \n" +
                ",''							                --<sip_special1, varchar(4),> \n" +
                ",''							                --<sip_special2, varchar(4),> \n" +
                ",''							                --<sip_special3, varchar(4),> \n" +
                ",@sip_firmano					                --<sip_firmano, int,> \n" +
                ",@sip_subeno						            --<sip_subeno, int,> \n" +
                ",@sip_tarih					                --<sip_tarih, datetime,> \n" +
                ",@sip_teslim_tarih			                    --<sip_teslim_tarih, datetime,> \n" +
                ",@sip_tip					                    --<sip_tip, tinyint,> \n" +
                ",@sip_cins					                    --<sip_cins, tinyint,> \n" +
                ",@sip_evrakno_seri			                    --<sip_evrakno_seri, varchar(4),> \n" +
                ",@sip_evrakno_sira			                    --<sip_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sip_satirno),-1) + 1 AS SATIRNO FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip AND sip_cins = @sip_cins)				                    --<sip_satirno, int,> \n" +
                ",@sip_belgeno				                    --<sip_belgeno, varchar(15),> \n" +
                ",@sip_belge_tarih			                    --<sip_belge_tarih, datetime,> \n" +
                ",@sip_satici_kod				                --<sip_satici_kod, varchar(25),> \n" +
                ",@sip_musteri_kod			                    --<sip_musteri_kod, varchar(25),> \n" +
                ",@sip_stok_kod				                    --<sip_stok_kod, varchar(25),> \n" +
                ",@sip_b_fiyat				                    --<sip_b_fiyat, float,> \n" +
                ",@sip_miktar					                --<sip_miktar, float,> \n" +
                ",@sip_birim_pntr				                --<sip_birim_pntr, tinyint,> \n" +
                ",@sip_teslim_miktar			                --<sip_teslim_miktar, float,> \n" +
                ",@sip_tutar					                --<sip_tutar, float,> \n" +
                ",@sip_iskonto_1				                --<sip_iskonto_1, float,> \n" +
                ",@sip_iskonto_2				                --<sip_iskonto_2, float,> \n" +
                ",@sip_iskonto_3				                --<sip_iskonto_3, float,> \n" +
                ",@sip_iskonto_4				                --<sip_iskonto_4, float,> \n" +
                ",@sip_iskonto_5				                --<sip_iskonto_5, float,> \n" +
                ",@sip_iskonto_6				                --<sip_iskonto_6, float,> \n" +
                ",0							                    --<sip_masraf_1, float,> \n" +
                ",0							                    --<sip_masraf_2, float,> \n" +
                ",0							                    --<sip_masraf_3, float,> \n" +
                ",0							                    --<sip_masraf_4, float,> \n" +
                ",@sip_vergi_pntr				                --<sip_vergi_pntr, tinyint,> \n" +
                ",@sip_vergi					                --<sip_vergi, float,> \n" +
                ",0							                    --<sip_masvergi_pntr, tinyint,> \n" +
                ",0							                    --<sip_masvergi, float,> \n" +
                ",@sip_opno					                    --<sip_opno, int,> \n" +
                ",@sip_aciklama				                    --<sip_aciklama, varchar(40),> \n" +
                ",''							                --<sip_aciklama2, varchar(40),> \n" +
                ",@sip_depono					                --<sip_depono, int,> \n" +
                ",@sip_OnaylayanKulNo					        --<sip_OnaylayanKulNo, smallint,> \n" +
                ",0							                    --<sip_vergisiz_fl, bit,> \n" +
                ",0							                    --<sip_kapat_fl, bit,> \n" +
                ",@sip_cari_sormerk			                    --<sip_cari_sormerk, varchar(25),> \n" +
                ",@sip_stok_sormerk			                    --<sip_stok_sormerk, varchar(25),> \n" +
                ",0							                    --<sip_cari_grupno, tinyint,> \n" +
                ",@sip_doviz_cinsi			                    --<sip_doviz_cinsi, tinyint,> \n" +
                ",@sip_doviz_kuru				                --<sip_doviz_kuru, float,> \n" +
                ",@sip_alt_doviz_kuru			                --<sip_alt_doviz_kuru, float,> \n" +
                ",@sip_adresno							        --<sip_adresno, int,> \n" +
                ",''							                --<sip_teslimturu, varchar(4),> \n" +
                ",1							                    --<sip_cagrilabilir_fl, bit,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_prosip_uid> \n" +
                ",@sip_iskonto1				                    --<sip_iskonto1, tinyint,> \n" +
                ",@sip_iskonto2				                    --<sip_iskonto2, tinyint,> \n" +
                ",@sip_iskonto3				                    --<sip_iskonto3, tinyint,> \n" +
                ",@sip_iskonto4				                    --<sip_iskonto4, tinyint,> \n" +
                ",@sip_iskonto5				                    --<sip_iskonto5, tinyint,> \n" +
                ",@sip_iskonto6				                    --<sip_iskonto6, tinyint,> \n" +
                ",1							                    --<sip_masraf1, tinyint,> \n" +
                ",1							                    --<sip_masraf2, tinyint,> \n" +
                ",1							                    --<sip_masraf3, tinyint,> \n" +
                ",1							                    --<sip_masraf4, tinyint,> \n" +
                ",@sip_isk1					                    --<sip_isk1, bit,> \n" +
                ",@sip_isk2					                    --<sip_isk2, bit,> \n" +
                ",@sip_isk3					                    --<sip_isk3, bit,> \n" +
                ",@sip_isk4					                    --<sip_isk4, bit,> \n" +
                ",@sip_isk5					                    --<sip_isk5, bit,> \n" +
                ",@sip_isk6					                    --<sip_isk6, bit,> \n" +
                ",0							                    --<sip_mas1, bit,> \n" +
                ",0							                    --<sip_mas2, bit,> \n" +
                ",0							                    --<sip_mas3, bit,> \n" +
                ",0							                    --<sip_mas4, bit,> \n" +
                ",''							                --<sip_Exp_Imp_Kodu, varchar(25),> \n" +
                ",0							                    --<sip_kar_orani, float,> \n" +
                ",0							                    --<sip_durumu, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_stal_uid> \n" +
                ",0							                    --<sip_planlananmiktar, float,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_teklif_uid> \n" +
                ",@sip_parti_kodu					            --<sip_parti_kodu, varchar(25),> \n" +
                ",@sip_lot_no						            --<sip_lot_no, int,> \n" +
                ",@sip_projekodu					            --<sip_projekodu, varchar(25),> \n" +
                ",@sip_fiyat_liste_no					        --<sip_fiyat_liste_no, int,> \n" +
                ",0							                    --<sip_Otv_Pntr, tinyint,> \n" +
                ",0							                    --<sip_Otv_Vergi, float,> \n" +
                ",0							                    --<sip_otvtutari, float,> \n" +
                ",0							                    --<sip_OtvVergisiz_Fl, tinyint,> \n" +
                ",''							                --<sip_paket_kod, varchar(25),> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_Rez_uid> \n" +
                ",0                                             --<sip_harekettipi, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)	--<sip_yetkili_uid> \n" +
                ",''							                --<sip_kapatmanedenkod> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)			--<sip_gecerlilik_tarihi> \n" +
                ",0							                    --<sip_onodeme_evrak_tip> \n" +
                ",''							                --<sip_onodeme_evrak_seri> \n" +
                ",0							                    --<sip_onodeme_evrak_sira> \n" +
                ",@sip_rezervasyon_miktari 				        --<sip_rezervasyon_miktari> \n" +
                ",@sip_rezerveden_teslim_edilen			        --<sip_rezerveden_teslim_edilen> \n" +
                ",''							                --<sip_HareketGrupKodu1> \n" +
                ",''							                --<sip_HareketGrupKodu2> \n" +
                ",''							                --<sip_HareketGrupKodu3> \n" +
                ") " +
                "SELECT [sip_Guid] FROM @UIDTABLE ",
        param : ['sip_create_user:int','sip_lastup_user:int','sip_firmano:int','sip_subeno:int','sip_tarih:date','sip_teslim_tarih:date','sip_tip:int',
                 'sip_cins:int','sip_evrakno_seri:string|4','sip_evrakno_sira:int','sip_belgeno:string|15','sip_belge_tarih:date','sip_satici_kod:string|25',
                 'sip_musteri_kod:string|25','sip_stok_kod:string|25','sip_b_fiyat:float','sip_miktar:float','sip_birim_pntr:int','sip_teslim_miktar:float',
                 'sip_tutar:float','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float','sip_iskonto_4:float','sip_iskonto_5:float',
                 'sip_iskonto_6:float','sip_vergi_pntr:int','sip_vergi:float','sip_opno:int','sip_aciklama:string|40','sip_depono:int','sip_OnaylayanKulNo:int',
                 'sip_cari_sormerk:string|25','sip_stok_sormerk:string|25','sip_doviz_cinsi:int','sip_doviz_kuru:float','sip_alt_doviz_kuru:float',
                 'sip_adresno:int','sip_iskonto1:int','sip_iskonto2:int','sip_iskonto3:int','sip_iskonto4:int','sip_iskonto5:int','sip_iskonto6:int',
                 'sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit','sip_isk5:bit','sip_isk6:bit','sip_parti_kodu:string|25','sip_lot_no:int',
                 'sip_projekodu:string|25','sip_fiyat_liste_no:int','sip_rezervasyon_miktari:float','sip_rezerveden_teslim_edilen:float']
    },
    SiparisGetir:
    {
        query:  "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod),'') AS ADI, " +
                "ROUND((sip_tutar / sip_miktar),2) AS FIYAT, " +
                "ROUND(sip_tutar,2) AS TUTAR, " +
                "ROW_NUMBER() OVER(ORDER BY sip_Guid) AS NO, " +
                "(SELECT som_isim FROM SORUMLULUK_MERKEZLERI WHERE som_kod = sip_stok_sormerk) AS SORUMLUMERADI ," +
                "(SELECT cari_per_adi FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = sip_satici_kod) AS PERSONELADI," +
                "(SELECT dbo.fn_VergiYuzde (sip_vergi_pntr)) AS VERGIPNTR, " +
                "(SELECT dbo.fn_StokBirimi(sip_stok_kod,sip_birim_pntr)) AS BIRIMADI, " +
                "(SELECT dbo.fn_StokBirimHesapla(sip_stok_kod,1,sip_miktar,sip_birim_pntr)) AS BIRIM, " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sip_Guid AND BdnHar_Tipi = 9),0) AS RENKPNTR , " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sip_Guid AND BdnHar_Tipi = 9),0) AS BEDENPNTR , " +
                "* FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND " +
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins " +
                "ORDER BY sip_satirno ASC",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisEvrDelete:
    {
        query:  "DELETE FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND " + 
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisSatirDelete:
    {
        query:  "DELETE FROM SIPARISLER WHERE sip_Guid = @sip_Guid",
        param:  ['sip_Guid'],
        type:   ['string|50']
    },
    SiparisUpdate:
    {
        query:  "UPDATE SIPARISLER " +
                "SET sip_b_fiyat=@sip_b_fiyat " + 
                ",sip_miktar=@sip_miktar " +
                ",sip_tutar=@sip_tutar " +
                ",sip_vergi = (@sip_tutar - (@sip_iskonto_1 + @sip_iskonto_2 + @sip_iskonto_3 + @sip_iskonto_4 + @sip_iskonto_5))  * (SELECT [dbo].[fn_VergiYuzde] (@sip_vergi_pntr) / 100) " +
                ",sip_iskonto_1=@sip_iskonto_1 " +
                ",sip_iskonto_2=@sip_iskonto_2 " +
                ",sip_iskonto_3=@sip_iskonto_3 " +
                ",sip_iskonto_4=@sip_iskonto_4 " +
                ",sip_iskonto_5=@sip_iskonto_5 " +
                ",sip_iskonto_6=@sip_iskonto_6 " +
                ",sip_isk1=@sip_isk1 " +
                ",sip_isk2=@sip_isk2 " +
                ",sip_isk3=@sip_isk3 " +
                ",sip_isk4=@sip_isk4 " +
                ",sip_isk5=@sip_isk5 " +
                ",sip_isk6=@sip_isk6 " +
                "WHERE sip_Guid = @sip_Guid",
        param : ['sip_b_fiyat:float','sip_miktar:float','sip_tutar:float','sip_vergi_pntr:int','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float',
        'sip_iskonto_4:float','sip_iskonto_5:float','sip_iskonto_6:float','sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit',
        'sip_isk5:bit','sip_isk6:bit','sip_Guid:string|50']
    },
    StokHarSiparisUpdate :
    {
        query : "UPDATE SIPARISLER SET sip_teslim_miktar = sip_teslim_miktar + @sip_teslim_miktar WHERE sip_Guid = @sip_Guid " +  
                "UPDATE BEDEN_HAREKETLERI SET BdnHar_TesMik = BdnHar_TesMik + @sip_teslim_miktar WHERE BdnHar_Har_uid = @sip_Guid AND BdnHar_BedenNo = @BdnHar_BedenNo",
        param : ['sip_teslim_miktar:int','sip_Guid:string|50','BdnHar_BedenNo:int']
    },
    StokHarDepoSiparisUpdate :
    {
        query : "UPDATE DEPOLAR_ARASI_SIPARISLER SET ssip_teslim_miktar = ssip_teslim_miktar + @sip_teslim_miktar WHERE ssip_Guid = @sip_Guid " ,
        param : ['sip_teslim_miktar:int','sip_Guid:string|50']
    },
    SiparisDeleteUpdate :
    {
        query : "UPDATE SIPARISLER SET sip_teslim_miktar = sip_teslim_miktar - @sip_teslim_miktar WHERE sip_Guid = @sip_Guid " +
                "UPDATE BEDEN_HAREKETLERI SET BdnHar_TesMik = BdnHar_TesMik - @sip_teslim_miktar WHERE BdnHar_Har_uid = @sip_Guid AND BdnHar_BedenNo = ISNULL((SELECT BdnHar_BedenNo FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = @sth_Guid),0)",
        param : ['sip_teslim_miktar:int','sip_Guid:string|50','sth_Guid:string|50']
    },
    MaxSiparisSira : 
    {
        query : "SELECT ISNULL(MAX(sip_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM SIPARISLER " +
                "WHERE sip_evrakno_seri=@sip_evrakno_seri AND sip_tip=@sip_tip AND sip_cins=@sip_cins " ,
        param : ['sip_evrakno_seri','sip_tip','sip_cins'],
        type : ['string|20','int','int']
    },
    SiparisListeGetir :
    {
        query : "SELECT " +
                "(sip_miktar - sip_teslim_miktar) AS BMIKTAR, " +
                "(SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod) AS ADI, " +
                "sip_stok_kod AS KODU, " +
                "BdnHar_BedenNo, " +
                "ISNULL((dbo.fn_renk_kirilimi (dbo.fn_bedenharnodan_renk_no_bul (BdnHar_BedenNo),(SELECT sto_renk_kodu FROM STOKLAR WHERE STOKLAR.sto_kod = SIPARISLER.sip_stok_kod))),'') AS RENK, " +
                "ISNULL((dbo.fn_beden_kirilimi (dbo.fn_bedenharnodan_beden_no_bul (BdnHar_BedenNo),(SELECT sto_beden_kodu FROM STOKLAR WHERE STOKLAR.sto_kod = SIPARISLER.sip_stok_kod))),'') AS BEDEN " +
                "FROM SIPARISLER LEFT OUTER JOIN BEDEN_HAREKETLERI ON sip_Guid = BdnHar_Har_uid " +
                "WHERE sip_depono =@sip_depono AND sip_musteri_kod =@sip_musteri_kod AND ((sip_evrakno_seri = @sip_evrakno_seri) OR (@sip_evrakno_seri = '')) AND ((sip_evrakno_sira = @sip_evrakno_sira) OR (@sip_evrakno_sira = 0)) AND sip_tip = @sip_tip and (sip_miktar - sip_teslim_miktar) > 0",
        param : ['sip_depono','sip_musteri_kod','sip_evrakno_seri','sip_evrakno_sira','sip_tip'],
        type : ['string|15','string|25','string|10','int','int']       
    },
    SipBedenHarGetir:
    {
        query:  "SELECT * FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid IN ((SELECT sip_Guid FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip)) AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','BdnHar_Tipi'],
        type:   ['string|20','int','int','int']
    },
    //Beden Hareket
    BedenHarInsert :
    {
        query:  "INSERT INTO [BEDEN_HAREKETLERI] ( " +
                "[BdnHar_DBCno] " + 
                ",[BdnHar_Spec_Rec_no] " +
                ",[BdnHar_iptal] " +
                ",[BdnHar_fileid] " +
                ",[BdnHar_hidden] " +
                ",[BdnHar_kilitli] " +
                ",[BdnHar_degisti] " +
                ",[BdnHar_checksum] " +
                ",[BdnHar_create_user] " +
                ",[BdnHar_create_date] " +
                ",[BdnHar_lastup_user] " +
                ",[BdnHar_lastup_date] " +
                ",[BdnHar_special1] " +
                ",[BdnHar_special2] " +
                ",[BdnHar_special3] " +
                ",[BdnHar_Tipi] " +
                ",[BdnHar_Har_uid] " +
                ",[BdnHar_BedenNo] " +
                ",[BdnHar_HarGor] " +
                ",[BdnHar_KnsIsGor] " +
                ",[BdnHar_KnsFat] " +
                ",[BdnHar_TesMik] " +
                ",[BdnHar_rezervasyon_miktari] " +
                ",[BdnHar_rezerveden_teslim_edilen] " +
                ") VALUES ( " +
                "0			 		                    --BdnHar_DBCno,  smallint,> \n" +
                ",0					                    --<BdnHar_Spec_Rec_no, int,> \n" +
                ",0		 			                    --<BdnHar_iptal, bit,> \n" +
                ",113		 		                    --<BdnHar_fileid, smallint,> \n" +
                ",0		 			                    --<BdnHar_hidden, bit,> \n" +
                ",0					                    --<BdnHar_kilitli, bit,> \n" +
                ",0		 			                    --<BdnHar_degisti, bit,> \n" +
                ",0		 			                    --<BdnHar_checksum, int,> \n" +
                ",@BdnHar_create_user 		            --<BdnHar_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_create_date, datetime,> \n" +
                ",@BdnHar_lastup_user 		            --<BdnHar_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_lastup_date, datetime,> \n" +
                ",''		 			                --<BdnHar_special1, varchar(4),> \n" +
                ",''		 			                --<BdnHar_special2, varchar(4),> \n" +
                ",''		 			                --<BdnHar_special3, varchar(4),> \n" +
                ",@BdnHar_Tipi		                    --<BdnHar_Tipi, char(1),> \n" +
                ",@BdnHar_Har_uid    		            --<BdnHar_Har_uid, int,> \n" +
                ",@BdnHar_BedenNo 			            --<BdnHar_BedenNo, smallint,> \n" +
                ",@BdnHar_HarGor 			            --<BdnHar_HarGor, float,> \n" +
                ",0		 			                    --<BdnHar_KnsIsGor, float,> \n" +
                ",0		 			                    --<BdnHar_KnsFat, float,> \n" +
                ",0             	                    --<BdnHar_TesMik, float,> \n" +
                ",@BdnHar_rezervasyon_miktari			--<BdnHar_rezervasyon_miktari, float,>\n" +
                ",@BdnHar_rezerveden_teslim_edilen		--<BdnHar_rezerveden_teslim_edilen, float,>\n" +
                ")",
        param:  ['BdnHar_create_user:int','BdnHar_lastup_user:int','BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
    },
    BedenHarUpdate :
    {
        query:  "UPDATE BEDEN_HAREKETLERI " +
                "SET BdnHar_HarGor=@BdnHar_HarGor " +
                ",BdnHar_rezervasyon_miktari=@BdnHar_rezervasyon_miktari " + 
                ",BdnHar_rezerveden_teslim_edilen=@BdnHar_rezerveden_teslim_edilen " +
                "WHERE  BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi AND BdnHar_BedenNo = @BdnHar_BedenNo",
        param:  ['BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
    },
    BedenHarDelete : 
    {
        query:  "DELETE BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['BdnHar_Har_uid','BdnHar_Tipi'],
        type:   ['string|50','int']
    },
    BedenHarGorUpdate :
    {
        query: "UPDATE BEDEN_HAREKETLERI SET BdnHar_HarGor = BdnHar_HarGor + @BdnHar_HarGor WHERE BdnHar_Guid = @BdnHar_Guid ",
        param: ['BdnHar_HarGor','BdnHar_Guid'],
        type: ['int','string|50']
    },
    //Sayım
    SayimGetir : 
    {
        query: "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sym_Stokkodu),'') AS ADI, " +
                "ROW_NUMBER() OVER(ORDER BY sym_Guid) AS NO, " +
                "* FROM SAYIM_SONUCLARI " +
                "WHERE sym_depono = @sym_depono AND sym_evrakno = @sym_evrakno AND sym_tarihi = @sym_tarihi ORDER BY sym_lastup_date DESC" ,
        param: ['sym_depono','sym_evrakno','sym_tarihi'],
        type:  ['int','int','date'] 
    },
    SayimInsert :
    {
        query : "DECLARE @sym_satirno AS INT " +
                "SET @sym_satirno = (SELECT ISNULL(MAX(sym_satirno),-1) + 1 FROM SAYIM_SONUCLARI WHERE sym_evrakno=@sym_evrakno AND sym_depono=@sym_depono AND sym_tarihi=@sym_tarihi) " +
                "INSERT INTO [SAYIM_SONUCLARI] " +
                "([sym_DBCno] " +
                ",[sym_SpecRECno] " +
                ",[sym_iptal] " +
                ",[sym_fileid] " +
                ",[sym_hidden] " +
                ",[sym_kilitli] " +
                ",[sym_degisti] " +
                ",[sym_checksum] " +
                ",[sym_create_user] " +
                ",[sym_create_date] " +
                ",[sym_lastup_user] " +
                ",[sym_lastup_date] " +
                ",[sym_special1] " +
                ",[sym_special2] " +
                ",[sym_special3] " +
                ",[sym_tarihi] " +
                ",[sym_depono] " +
                ",[sym_evrakno] " +
                ",[sym_satirno] " +
                ",[sym_Stokkodu] " +
                ",[sym_reyonkodu] " +
                ",[sym_koridorkodu] " +
                ",[sym_rafkodu] " +
                ",[sym_miktar1] " + 
                ",[sym_miktar2] " +
                ",[sym_miktar3] " +
                ",[sym_miktar4] " +
                ",[sym_miktar5] " +
                ",[sym_birim_pntr] " +
                ",[sym_barkod] " +
                ",[sym_renkno] " +
                ",[sym_bedenno] " +
                ",[sym_parti_kodu] " +
                ",[sym_lot_no] " +
                ",[sym_serino] " +
                ") VALUES ( " +
                "0					--<sym_DBCno, int,> \n" +
                ",0		 			--<sym_SpecRECno, int,> \n" +
                ",0	 				--<sym_iptal, bit,> \n" +
                ",28		 			--<sym_fileid, smallint,> \n" +
                ",0		 			--<sym_hidden, bit,> \n" +
                ",0		 			--<sym_kilitli, bit,> \n" +
                ",0		 			--<sym_degisti, bit,> \n" +
                ",0		 			--<sym_checksum, int,> \n" +
                ",@sym_create_user 			--<sym_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<sym_create_date, datetime,> \n" +
                ",@sym_lastup_user 				--<sym_lastup_user, smallint,> \n" +
                ",GETDATE()		--<sym_lastup_date, datetime,> \n" +
                ",''		 			--<sym_special1, varchar(4),> \n" +
                ",''		 			--<sym_special2, varchar(4),> \n" +
                ",''		 			--<sym_special3, varchar(4),> \n" +
                ",@sym_tarihi 			--<sym_tarihi, datetime,> \n" +
                ",@sym_depono 			--<sym_depono, int,> \n" +
                ",@sym_evrakno 			--<sym_evrakno, int,> \n" +
                ",@sym_satirno			--<sym_satirno, int,> \n" +
                ",@sym_Stokkodu 		--<sym_Stokkodu, varchar(25),> \n" +
                ",''		 		--<sym_reyonkodu, varchar(4),> \n" +
                ",''		 		--<sym_koridorkodu, varchar(4),> \n" +
                ",''		 		--<sym_rafkodu, varchar(4),> \n" +
                ",@sym_miktar1 		--<sym_miktar1, float,> \n" +
                ",@sym_miktar2		 		--<sym_miktar2, float,> \n" +
                ",0		 		--<sym_miktar3, float,> \n" +
                ",0		 		--<sym_miktar4, float,> \n" +
                ",0		 		--<sym_miktar5, float,> \n" +
                ",@sym_birim_pntr 		--<sym_birim_pntr, tinyint,> \n" +
                ",@sym_barkod 		--<sym_barkod, varchar(25),> \n" +
                ",@sym_renkno 		--<sym_renkno, int,> \n" +
                ",@sym_bedenno 		--<sym_bedenno, int,> \n" +
                ",@sym_parti_kodu 		--<sym_parti_kodu, varchar(25),> \n" +
                ",@sym_lot_no	 		--<sym_lot_no, int,> \n" +
                ",@sym_serino			--<sym_serino, varchar(25),> \n" +
                ") " +
                "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sym_Stokkodu),'') AS ADI, " +
                "ROW_NUMBER() OVER(ORDER BY sym_Guid) AS NO,*  FROM SAYIM_SONUCLARI WHERE sym_tarihi = @sym_tarihi AND " +
                "sym_depono = @sym_depono AND sym_evrakno = @sym_evrakno AND sym_satirno = @sym_satirno ",
            param : ["sym_create_user:int","sym_lastup_user:int","sym_tarihi:date","sym_depono:int","sym_evrakno:int","sym_Stokkodu:string|25",
                    "sym_miktar1:float","sym_miktar2:float","sym_birim_pntr:int","sym_barkod:string|25","sym_renkno:int","sym_bedenno:int","sym_parti_kodu:string|25",
                    "sym_lot_no:int","sym_serino:string|25"]
    },
    SayimEvrDelete :
    {
        query: "DELETE FROM SAYIM_SONUCLARI WHERE sym_evrakno = @sym_evrakno AND " +
                "sym_tarihi=@sym_tarihi and sym_depono = @sym_depono",
        param:  ['sym_evrakno','sym_tarihi','sym_depono'],
        type:   ["int","date","int"]
    },
    SayimSatirDelete :
    {
        query : "DELETE FROM SAYIM_SONUCLARI WHERE sym_Guid = @sym_Guid",
        param : ['sym_Guid'],
        type : ['string|50']
    },
    SayimUpdate : 
    {
        query : "UPDATE SAYIM_SONUCLARI " +
                "SET sym_miktar1 = @sym_miktar1 " +
                ",sym_miktar2 = @sym_miktar2 " +
                ",sym_miktar3 = @sym_miktar3 " +
                ",sym_miktar4 = @sym_miktar4 " +
                ",sym_miktar5 = @sym_miktar5 " +
                ",sym_lastup_date = GETDATE() " +
                "WHERE CONVERT(NVARCHAR(50),sym_Guid) = @sym_Guid",
        param : ['sym_miktar1','sym_miktar2','sym_miktar3','sym_miktar4','sym_miktar5','sym_Guid'],
        type : ['int','int','int','int','int','string|50']
    },
    MaxSayimSira :
    {
        query : "SELECT ISNULL(MAX(sym_evrakno),0) + 1 AS MAXEVRSIRA FROM SAYIM_SONUCLARI " +
                "WHERE sym_depono = @sym_depono AND sym_tarihi = @sym_tarihi " ,
        param : ['sym_depono','sym_tarihi'],
        type : ['int','date']
    },
    //Stok Hareket
    StokHarGetir : 
    {
        query:  "SELECT CONVERT(VARCHAR(10),GETDATE(),112) AS sth_kur_tarihi , " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=sth_stok_kod),'') AS ADI , " +
                "CASE WHEN sth_tutar <> 0 AND sth_miktar <> 0 THEN ROUND((sth_tutar / sth_miktar),2) ELSE 0 END AS FIYAT, " +
                "(select cari_unvan1 from CARI_HESAPLAR WHERE cari_kod=sth_cari_kodu) AS CARIADI, " +
                "(select som_isim from SORUMLULUK_MERKEZLERI where som_kod=sth_stok_srm_merkezi) AS SORUMLUMERADI, " +
                "(select cari_per_adi from CARI_PERSONEL_TANIMLARI where cari_per_kod=sth_plasiyer_kodu) AS PERSONELADI," +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "ROUND(sth_tutar,2) AS TUTAR, " + 
                "CASE WHEN sth_iskonto1 <> 0 AND sth_tutar <> 0 THEN (100 * sth_iskonto1) / sth_tutar ELSE 0 END AS ISKYUZDE , " +
                "(SELECT dbo.fn_StokBirimi(sth_stok_kod,sth_birim_pntr)) AS BIRIMADI, " +
                "(SELECT dbo.fn_StokBirimHesapla(sth_stok_kod,1,sth_miktar,sth_birim_pntr)) AS BIRIM," +
                "ISNULL((SELECT sto_birim1_ad as ADET FROM STOKLAR WHERE sto_kod = sth_stok_kod),'') AS BIRIM1, " +
                "ROW_NUMBER() OVER(ORDER BY sth_Guid) AS NO, " +
                "(SELECT dbo.fn_VergiYuzde (sth_vergi_pntr)) AS TOPTANVERGI, " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0) AS RENKPNTR , " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0) AS BEDENPNTR , " +
                "ISNULL((SELECT TOP 1 BdnHar_Guid FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),'00000000-0000-0000-0000-000000000000') AS BEDENGUID , " +
                "(SELECT dbo.fn_renk_kirilimi(ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0),(SELECT TOP 1 sto_renk_kodu FROM STOKLAR WHERE sto_kod = sth_stok_kod))) AS RENK ," +
                "(SELECT dbo.fn_beden_kirilimi(ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = sth_Guid AND BdnHar_Tipi = 11),0),(SELECT TOP 1 sto_beden_kodu FROM STOKLAR WHERE sto_kod = sth_stok_kod))) AS BEDEN ," +
                "ISNULL((SELECT sip_evrakno_seri from SIPARISLER WHERE sip_Guid = sth_sip_uid),'') AS SIPSERI ," +
                "ISNULL((SELECT sip_evrakno_sira from SIPARISLER WHERE sip_Guid = sth_sip_uid),0) AS SIPSIRA ," +
                "CASE sth_tip WHEN 0 THEN 'GIREN' WHEN 1 THEN 'CIKAN' END AS VIRMANTIP, " +
                "* FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri=@sth_evrakno_seri AND sth_evrakno_sira=@sth_evrakno_sira AND sth_evraktip=@sth_evraktip ORDER BY sth_satirno " ,
        param:   ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type:    ['string|20','int','int']
    },
    StokHarInsert : 
    {
        query : "DECLARE @UIDTABLE table([sth_Guid] [uniqueidentifier]) " +
                "INSERT INTO [STOK_HAREKETLERI] " +
                "([sth_DBCno] " +
                ",[sth_SpecRECno] " +
                ",[sth_iptal] " +
                ",[sth_fileid] " +
                ",[sth_hidden] " +
                ",[sth_kilitli] " +
                ",[sth_degisti] " +
                ",[sth_checksum] " +
                ",[sth_create_user] " +
                ",[sth_create_date] " +
                ",[sth_lastup_user] " +
                ",[sth_lastup_date] " +
                ",[sth_special1] " +
                ",[sth_special2] " +
                ",[sth_special3] " +
                ",[sth_firmano] " +
                ",[sth_subeno] " +
                ",[sth_tarih] " +
                ",[sth_tip] " +
                ",[sth_cins] " +
                ",[sth_normal_iade] " +
                ",[sth_evraktip] " +
                ",[sth_evrakno_seri] " +
                ",[sth_evrakno_sira] " +
                ",[sth_satirno] " +
                ",[sth_belge_no] " +
                ",[sth_belge_tarih] " +
                ",[sth_stok_kod] " +
                ",[sth_isk_mas1] " +
                ",[sth_isk_mas2] " +
                ",[sth_isk_mas3] " +
                ",[sth_isk_mas4] " +
                ",[sth_isk_mas5] " +
                ",[sth_isk_mas6] " +
                ",[sth_isk_mas7] " +
                ",[sth_isk_mas8] " +
                ",[sth_isk_mas9] " +
                ",[sth_isk_mas10] " +
                ",[sth_sat_iskmas1] " +
                ",[sth_sat_iskmas2] " +
                ",[sth_sat_iskmas3] " +
                ",[sth_sat_iskmas4] " +
                ",[sth_sat_iskmas5] " +
                ",[sth_sat_iskmas6] " +
                ",[sth_sat_iskmas7] " +
                ",[sth_sat_iskmas8] " +
                ",[sth_sat_iskmas9] " +
                ",[sth_sat_iskmas10] " +
                ",[sth_pos_satis] " +
                ",[sth_promosyon_fl] " +
                ",[sth_cari_cinsi] " +
                ",[sth_cari_kodu] " +
                ",[sth_cari_grup_no] " +
                ",[sth_isemri_gider_kodu] " +
                ",[sth_plasiyer_kodu] " +
                ",[sth_har_doviz_cinsi] " +
                ",[sth_har_doviz_kuru] " +
                ",[sth_alt_doviz_kuru] " +
                ",[sth_stok_doviz_cinsi] " +
                ",[sth_stok_doviz_kuru] " +
                ",[sth_miktar] " +
                ",[sth_miktar2] " +
                ",[sth_birim_pntr] " +
                ",[sth_tutar] " +
                ",[sth_iskonto1] " +
                ",[sth_iskonto2] " +
                ",[sth_iskonto3] " +
                ",[sth_iskonto4] " +
                ",[sth_iskonto5] " +
                ",[sth_iskonto6] " +
                ",[sth_masraf1] " +
                ",[sth_masraf2] " +
                ",[sth_masraf3] " +
                ",[sth_masraf4] " +
                ",[sth_vergi_pntr] " +
                ",[sth_vergi] " +
                ",[sth_masraf_vergi_pntr] " +
                ",[sth_masraf_vergi] " +
                ",[sth_netagirlik] " +
                ",[sth_odeme_op] " +
                ",[sth_aciklama] " +
                ",[sth_sip_uid] " +
                ",[sth_fat_uid] " +
                ",[sth_giris_depo_no] " +
                ",[sth_cikis_depo_no] " +
                ",[sth_malkbl_sevk_tarihi] " +
                ",[sth_cari_srm_merkezi] " +
                ",[sth_stok_srm_merkezi] " +
                ",[sth_fis_tarihi] " +
                ",[sth_fis_sirano] " +
                ",[sth_vergisiz_fl] " +
                ",[sth_maliyet_ana] " +
                ",[sth_maliyet_alternatif] " +
                ",[sth_maliyet_orjinal] " +
                ",[sth_adres_no] " +
                ",[sth_parti_kodu] " +
                ",[sth_lot_no] " +
                ",[sth_kons_uid] " +
                ",[sth_proje_kodu] " +
                ",[sth_exim_kodu] " +
                ",[sth_otv_pntr] " +
                ",[sth_otv_vergi] " +
                ",[sth_brutagirlik] " +
                ",[sth_disticaret_turu] " +
                ",[sth_otvtutari] " +
                ",[sth_otvvergisiz_fl] " +
                ",[sth_oiv_pntr] " +
                ",[sth_oiv_vergi] " +
                ",[sth_oivvergisiz_fl] " +
                ",[sth_fiyat_liste_no] " +
                ",[sth_oivtutari] " +
                ",[sth_Tevkifat_turu] " +
                ",[sth_nakliyedeposu] " +
                ",[sth_nakliyedurumu] " +
                ",[sth_yetkili_uid] " +
                ",[sth_taxfree_fl] " +
                ",[sth_ilave_edilecek_kdv] " + 
                ",[sth_ismerkezi_kodu]  " +
                ",[sth_HareketGrupKodu1] " +
                ",[sth_HareketGrupKodu2] " +
                ",[sth_HareketGrupKodu3]   " +
                ",[sth_Olcu1]   " +
                ",[sth_Olcu2]   " +
                ",[sth_Olcu3]   " +
                ",[sth_Olcu4]   " +
                ",[sth_Olcu5]   " +
                ",[sth_FormulMiktarNo]   " +
                ",[sth_FormulMiktar]   " +
                ") " +
                "OUTPUT INSERTED.[sth_Guid] INTO @UIDTABLE " + 
                "VALUES ( " +
                "0					--<sth_DBCno, smallint,> \n" +
                ",0					--<sth_SpecRECno, int,> \n" +
                ",0	 				--<sth_iptal, bit,> \n" +
                ",16					 --<sth_fileid, smallint,> \n" +
                ",0		 			--<sth_hidden, bit,> \n" +
                ",0		 			--<sth_kilitli, bit,> \n" +
                ",0		 			--<sth_degisti, bit,> \n" +
                ",0		 			--<sth_checksum, int,> \n" +
                ",@sth_create_user 			--<sth_create_user, smallint,> \n" +
                ",GETDATE() 			--<sth_create_date, datetime,> \n" +
                ",@sth_lastup_user 			--<sth_lastup_user, smallint,> \n" +
                ",GETDATE() 			--<sth_lastup_date, datetime,> \n" +
                ",''		 			--<sth_special1, varchar(4),> \n" +
                ",''		 			--<sth_special2, varchar(4),> \n" +
                ",''		 			--<sth_special3, varchar(4),> \n" +
                ",@sth_firmano 			--<sth_firmano, int,> \n" +
                ",@sth_subeno 			--<sth_subeno, int,> \n" +
                ",@sth_tarih 				--<sth_tarih, datetime,> \n" +
                ",@sth_tip 				--<sth_tip, tinyint,> \n" +
                ",@sth_cins 				--<sth_cins, tinyint,> \n" +
                ",@sth_normal_iade 			--<sth_normal_iade, tinyint,> \n" +
                ",@sth_evraktip 			--<sth_evraktip, tinyint,> \n" +
                ",@sth_evrakno_seri 			--<sth_evrakno_seri, varchar(4),> \n" +
                ",@sth_evrakno_sira 			--<sth_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sth_satirno),-1) + 1 AS SATIRNO FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)	--<sip_satirno, int,> \n" +
                ",@sth_belge_no 			--sth_belge_no, varchar(15),> \n" +
                ",@sth_belge_tarih 			--<sth_belge_tarih, datetime,> \n" +
                ",@sth_stok_kod 			--<sth_stok_kod, varchar(25),> \n" +
                ",@sth_isk_mas1 			--<sth_isk_mas1, tinyint,> \n" +
                ",@sth_isk_mas2 			--<sth_isk_mas2, tinyint,> \n" +
                ",@sth_isk_mas3 			--<sth_isk_mas3, tinyint,> \n" +
                ",@sth_isk_mas4 			--<sth_isk_mas4, tinyint,> \n" +
                ",@sth_isk_mas5 			--<sth_isk_mas5, tinyint,> \n" +
                ",@sth_isk_mas6 			--<sth_isk_mas6, tinyint,> \n" +
                ",@sth_isk_mas7 			--<sth_isk_mas7, tinyint,> \n" +
                ",@sth_isk_mas8 			--<sth_isk_mas8, tinyint,> \n" +
                ",@sth_isk_mas9 			--<sth_isk_mas9, tinyint,> \n" +
                ",@sth_isk_mas10 			--<sth_isk_mas10, tinyint,> \n" +
                ",@sth_sat_iskmas1 			--<sth_sat_iskmas1, bit,> \n" +
                ",@sth_sat_iskmas2 			--<sth_sat_iskmas2, bit,> \n" +
                ",@sth_sat_iskmas3 			--<sth_sat_iskmas3, bit,> \n" +
                ",@sth_sat_iskmas4 			--<sth_sat_iskmas4, bit,> \n" +
                ",@sth_sat_iskmas5 			--<sth_sat_iskmas5, bit,> \n" +
                ",@sth_sat_iskmas6 			--<sth_sat_iskmas6, bit,> \n" +
                ",@sth_sat_iskmas7 			--<sth_sat_iskmas7, bit,> \n" +
                ",@sth_sat_iskmas8 			--<sth_sat_iskmas8, bit,> \n" +
                ",@sth_sat_iskmas9 			--<sth_sat_iskmas9, bit,> \n" +
                ",@sth_sat_iskmas10 			--<sth_sat_iskmas10, bit,> \n" +
                ",0					--<sth_pos_satis, bit,> \n" +
                ",0					--<sth_promosyon_fl, bit,> \n" +
                ",@sth_cari_cinsi 			--<sth_cari_cinsi, tinyint,> \n" +
                ",@sth_cari_kodu 			--<sth_cari_kodu, varchar(25),> \n" +
                ",0		 			--<sth_cari_grup_no, tinyint,> \n" +
                ",@sth_isemri_gider_kodu			 		--<sth_isemri_gider_kodu, varchar(25),> \n" +
                ",@sth_plasiyer_kodu 			--<sth_plasiyer_kodu, varchar(25),> \n" +
                ",@sth_har_doviz_cinsi 		--<sth_har_doviz_cinsi, tinyint,> \n" +
                ",@sth_har_doviz_kuru 		--<sth_har_doviz_kuru, float,> \n" +
                ",@sth_alt_doviz_kuru 		--<sth_alt_doviz_kuru, float,> \n" +
                ",@sth_stok_doviz_cinsi 		--<sth_stok_doviz_cinsi, tinyint,> \n" +
                ",@sth_stok_doviz_kuru 		--<sth_stok_doviz_kuru, float,> \n" +
                ",@sth_miktar 			--<sth_miktar, float,> \n" +
                ",@sth_miktar2 			--<sth_miktar2, float,> \n" +
                ",@sth_birim_pntr 			--<sth_birim_pntr, tinyint,> \n" +
                ",@sth_tutar	 			--<sth_tutar, float,> \n" +
                ",@sth_iskonto1 			--<sth_iskonto1, float,> \n" +
                ",@sth_iskonto2 			--<sth_iskonto2, float,> \n" +
                ",@sth_iskonto3 			--<sth_iskonto3, float,> \n" +
                ",@sth_iskonto4 			--<sth_iskonto4, float,> \n" +
                ",@sth_iskonto5 			--<sth_iskonto5, float,> \n" +
                ",@sth_iskonto6 			--<sth_iskonto6, float,> \n" +
                ",@sth_masraf1 			--<sth_masraf1, float,> \n" +
                ",@sth_masraf2 			--<sth_masraf2, float,> \n" +
                ",@sth_masraf3 			--<sth_masraf3, float,> \n" +
                ",@sth_masraf4 			--<sth_masraf4, float,> \n" +
                ",@sth_vergi_pntr 			--<sth_vergi_pntr, tinyint,> \n" +
                ",@sth_vergi 				--<sth_vergi, float,> \n" +
                ",@sth_masraf_vergi_pntr 		--<sth_masraf_vergi_pntr, tinyint,> \n" +
                ",@sth_masraf_vergi 			--<sth_masraf_vergi, float,> \n" +
                ",0		 			--<sth_netagirlik, float,> \n" +
                ",@sth_odeme_op 			--<sth_odeme_op, int,> \n" +
                ",@sth_aciklama 			--<sth_aciklama, varchar(50),> \n" +
                ",CONVERT(NVARCHAR(50),@sth_sip_uid)			 		--<sth_sip_uid, int,> \n" +
                ",CONVERT(NVARCHAR(50),@sth_fat_uid)  		--<sth_fat_uid, int,> \n" +
                ",@sth_giris_depo_no 			--<sth_giris_depo_no, int,> \n" +
                ",@sth_cikis_depo_no 			--<sth_cikis_depo_no, int,> \n" +
                ",@sth_malkbl_sevk_tarihi 		--<sth_malkbl_sevk_tarihi, datetime,> \n" +
                ",@sth_cari_srm_merkezi 		--<sth_cari_srm_merkezi, varchar(25),> \n" +
                ",@sth_stok_srm_merkezi 		--<sth_stok_srm_merkezi, varchar(25),> \n" +
                ",'18991230'	 			--<sth_fis_tarihi, datetime,> \n" +
                ",0		 			--<sth_fis_sirano, int,> \n" +
                ",@sth_vergisiz_fl		 			--<sth_vergisiz_fl, bit,> \n" +
                ",0		 			--<sth_maliyet_ana, float,> \n" +
                ",0			 		--<sth_maliyet_alternatif, float,> \n" +
                ",0			 		--<sth_maliyet_orjinal, float,> \n" +
                ",@sth_adres_no 			--<sth_adres_no, int,> \n" +
                ",@sth_parti_kodu 			--<sth_parti_kodu, varchar(25),> \n" +
                ",@sth_lot_no	 			--<sth_lot_no, int,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)						--<sth_kons_uid, smallint,> \n" +
                ",@sth_proje_kodu		--<sth_proje_kodu, varchar(25),> \n" +
                ",@sth_exim_kodu 			--<sth_exim_kodu, varchar(25),> \n" +
                ",0		 			--<sth_otv_pntr, tinyint,> \n" +
                ",0		 			--<sth_otv_vergi, float,> \n" +
                ",0		 			--<sth_brutagirlik, float,> \n" +
                ",@sth_disticaret_turu		--<sth_disticaret_turu, tinyint,> \n" +
                ",0		 			--<sth_otvtutari, float,> \n" +
                ",@sth_otvvergisiz_fl			--<sth_otvvergisiz_fl, bit,> \n" +
                ",0					--<sth_oiv_pntr, tinyint,> \n" +
                ",0		 			--<sth_oiv_vergi, float,> \n" +
                ",@sth_oivvergisiz_fl	 		--<sth_oivvergisiz_fl, bit,> \n" +
                ",@sth_fiyat_liste_no 		--<sth_fiyat_liste_no, int,> \n" +
                ",0			 		--<sth_oivtutari, float,> \n" +
                ",0			 		--<sth_Tevkifat_turu, tinyint,> \n" +
                ",@sth_nakliyedeposu					--<sth_nakliyedeposu, int,> \n" +
                ",@sth_nakliyedurumu					--<sth_nakliyedurumu, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)					--<sth_yetkili_uid, int,> \n" +
                ",0					--<sth_taxfree_fl, bit,>  \n" +
                ",0					--<sth_ilave_edilecek_kdv,float,> \n" +
                ",''					--<sth_ismerkezi_kodu> \n" +
                ",''					--<sth_HareketGrupKodu1, varchar(25),> \n" + 
                ",''					--<sth_HareketGrupKodu2, varchar(25),>  \n" +
                ",''					--<sth_HareketGrupKodu3, varchar(25),>  \n" +
                ",0					--<sth_Olcu1, float,> \n" +
                ",0					--<sth_Olcu2, float,> \n" +
                ",0					--<sth_Olcu3, float,> \n" +
                ",0					--<sth_Olcu4, float,> \n" +
                ",0					--<sth_Olcu5, float,> \n" +
                ",0					--<sth_FormulMiktarNo, tinyint,> \n" +
                ",0					--<sth_FormulMiktar, float,> \n" +
                ") " +
                "SELECT [sth_Guid] FROM @UIDTABLE ",
        param : ['sth_create_user:int','sth_lastup_user:int','sth_firmano:int','sth_subeno:int','sth_tarih:date','sth_tip:int','sth_cins:int',
            'sth_normal_iade:int','sth_evraktip:int','sth_evrakno_seri:string|25','sth_evrakno_sira:int','sth_belge_no:string|25','sth_belge_tarih:date',
            'sth_stok_kod:string|25','sth_isk_mas1:int','sth_isk_mas2:int','sth_isk_mas3:int','sth_isk_mas4:int','sth_isk_mas5:int','sth_isk_mas6:int','sth_isk_mas7:int',
            'sth_isk_mas8:int','sth_isk_mas9:int','sth_isk_mas10:int','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit','sth_sat_iskmas5:bit',
            'sth_sat_iskmas6:bit','sth_sat_iskmas7:bit','sth_sat_iskmas8:bit','sth_sat_iskmas9:bit','sth_sat_iskmas10:bit','sth_cari_cinsi:int','sth_cari_kodu:string|50','sth_isemri_gider_kodu:string|50',
            'sth_plasiyer_kodu:string|50','sth_har_doviz_cinsi:int','sth_har_doviz_kuru:float','sth_alt_doviz_kuru:float','sth_stok_doviz_cinsi:int','sth_stok_doviz_kuru:float',
            'sth_miktar:float','sth_miktar2:float','sth_birim_pntr:int','sth_tutar:float','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float','sth_iskonto4:float',
            'sth_iskonto5:float','sth_iskonto6:float','sth_masraf1:float','sth_masraf2:float','sth_masraf3:float','sth_masraf4:float','sth_vergi_pntr:int','sth_vergi:float','sth_masraf_vergi_pntr:int',
            'sth_masraf_vergi:float','sth_odeme_op:int','sth_aciklama:string|25','sth_sip_uid:string|50','sth_fat_uid:string|50','sth_giris_depo_no:int','sth_cikis_depo_no:int','sth_malkbl_sevk_tarihi:date',
            'sth_cari_srm_merkezi:string|25','sth_stok_srm_merkezi:string|25','sth_vergisiz_fl:bit','sth_adres_no:int','sth_parti_kodu:string|25','sth_lot_no:int','sth_proje_kodu:string|25',
            'sth_exim_kodu:string|25','sth_disticaret_turu:int','sth_otvvergisiz_fl:bit','sth_oivvergisiz_fl:bit','sth_fiyat_liste_no:int','sth_nakliyedeposu:int','sth_nakliyedurumu:int']
    },
    StokHarEkInsert : 
    {
        query : "INSERT INTO [dbo].[STOK_HAREKETLERI_EK]  " +
           "([sthek_Guid] " +
            ",[sthek_DBCno] " +
           ",[sthek_SpecRECno] " +
           ",[sthek_iptal] " +
           ",[sthek_fileid] " +
           ",[sthek_hidden] " +
           ",[sthek_kilitli] " +
           ",[sthek_degisti] " +
           ",[sthek_checksum] " +
           ",[sthek_create_user] " +
           ",[sthek_create_date] " +
           ",[sthek_lastup_user] " +
           ",[sthek_lastup_date] " +
           ",[sthek_special1] " +
           ",[sthek_special2] " +
           ",[sthek_special3] " +
           ",[sthek_related_uid] " +
           ",[sth_subesip_uid] " +
           ",[sth_bkm_uid] " +
           ",[sth_karsikons_uid] " +
           ",[sth_rez_uid] " +
           ",[sth_optamam_uid] " +
           ",[sth_iadeTlp_uid] " +
           ",[sth_HalSatis_uid] " +
           ",[sth_ciroprim_uid] " +
           ",[sth_iade_evrak_seri] " +
           ",[sth_iade_evrak_sira] " +
           ",[sth_yat_tes_kodu] " +
           ",[sth_ihracat_kredi_kodu] " +
           ",[sth_diib_belge_no] " +
           ",[sth_diib_satir_no] " +
           ",[sth_mensey_ulke_tipi] " +
           ",[sth_mensey_ulke_kodu] " +
           ",[sth_halrehmiktari] " +
           ",[sth_halrehfiyati] " +
           ",[sth_halsandikmiktari] " +
           ",[sth_halsandikfiyati] " +
           ",[sth_halsandikkdvtutari] " +
           ",[sth_HalKomisyonuKdv] " +
           ",[sth_HalRusum] " +
           ",[sth_satistipi] " +
           ",[sth_vardiya_tarihi] " +
           ",[sth_vardiya_no] " +
           ",[sth_direkt_iscilik_1] " +
           ",[sth_direkt_iscilik_2] " +
           ",[sth_direkt_iscilik_3] " +
           ",[sth_direkt_iscilik_4] " +
           ",[sth_direkt_iscilik_5] " +
           ",[sth_genel_uretim_1] " +
           ",[sth_genel_uretim_2] " +
           ",[sth_genel_uretim_3] " +
           ",[sth_genel_uretim_4] " +
           ",[sth_genel_uretim_5] " +
           ",[sth_fis_tarihi2] " +
           ",[sth_fis_sirano2] " +
           ",[sth_fiyfark_esas_evrak_seri] " +
           ",[sth_fiyfark_esas_evrak_sira] " +
           ",[sth_fiyfark_esas_satir_no] " +
           ",[sth_istisna] " +
           ",[sth_otv_tevkifat_turu] " +
           ",[sth_otv_tevkifat_tutari] " +
           ",[sth_servishar_uid] " +
           ",[sth_bakimsarf_uid] " +
           ",[sth_utsbildirimturu] " +
           ",[sth_utshekzayiatturu] " +
           ",[sth_utsimhabertarafgerekcesi] " +
           ",[sth_utsdigergerekceaciklamasi] "  +
           ") " +
            "VALUES " +
           "(NEWID()                    --<sthek_Guid, uniqueidentifier,> \n" +
           ",0                    --<sthek_DBCno, smallint,> \n" +
           ",0                    --<sthek_SpecRECno, int,> \n" +
           ",0                    --<sthek_iptal, bit,> \n" +
           ",590                    --<sthek_fileid, smallint,> \n" +
           ",0                  --<sthek_hidden, bit,> \n" +
           ",0                    --<sthek_kilitli, bit,> \n" +
           ",0                    --<sthek_degisti, bit,> \n" +
           ",0                    --<sthek_checksum, int,> \n" +
           ",@sthek_create_user                    --<sthek_create_user, smallint,> \n" +
           ",GETDATE()                    --<sthek_create_date, datetime,> \n" +
           ",@sthek_lastup_user                    --<sthek_lastup_user, smallint,> \n" +
           ",GETDATE()                    --<sthek_lastup_date, datetime,> \n" +
           ",''                    --<sthek_special1, nvarchar(4),> \n" +
           ",''                    --<sthek_special2, nvarchar(4),> \n" +
           ",''                    --<sthek_special3, nvarchar(4),> \n" +
           ",@sthek_related_uid                    --<sthek_related_uid, uniqueidentifier,> \n" +
           ",@sth_subesip_uid                    --<sth_subesip_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_bkm_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_karsikons_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_rez_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_optamam_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_iadeTlp_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_HalSatis_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_ciroprim_uid, uniqueidentifier,> \n" +
           ",''                    --<sth_iade_evrak_seri, [dbo].[evrakseri_str],> \n" +
           ",0                    --<sth_iade_evrak_sira, int,> \n" +
           ",''                    --<sth_yat_tes_kodu, nvarchar(25),> \n" +
           ",''                    --<sth_ihracat_kredi_kodu, nvarchar(4),> \n" +
           ",''                    --<sth_diib_belge_no, nvarchar(25),> \n" +
           ",0                    --<sth_diib_satir_no, tinyint,> \n" +
           ",0                    --<sth_mensey_ulke_tipi, tinyint,> \n" +
           ",''                    --<sth_mensey_ulke_kodu, nvarchar(4),> \n" +
           ",0                    --<sth_halrehmiktari, float,> \n" +
           ",0                    --<sth_halrehfiyati, float,> \n" +
           ",0                    --<sth_halsandikmiktari, float,> \n" +
           ",0                    --<sth_halsandikfiyati, float,> \n" +
           ",0                    --<sth_halsandikkdvtutari, float,> \n" +
           ",0                    --<sth_HalKomisyonuKdv, float,> \n" +
           ",0                    --<sth_HalRusum, float,> \n" +
           ",0                    --<sth_satistipi, tinyint,> \n" +
           ",'1899-12-30 00:00:00.000'                    --<sth_vardiya_tarihi, datetime,> \n" +
           ",0                    --<sth_vardiya_no, tinyint,> \n" +
           ",0                    --<sth_direkt_iscilik_1, float,> \n" +
           ",0                    --<sth_direkt_iscilik_2, float,> \n" +
           ",0                    --<sth_direkt_iscilik_3, float,> \n" +
           ",0                    --<sth_direkt_iscilik_4, float,> \n" +
           ",0                    --<sth_direkt_iscilik_5, float,> \n" +
           ",0                    --<sth_genel_uretim_1, float,> \n" +
           ",0                    --<sth_genel_uretim_2, float,> \n" +
           ",0                    --<sth_genel_uretim_3, float,> \n" +
           ",0                    --<sth_genel_uretim_4, float,> \n" +
           ",0                    --<sth_genel_uretim_5, float,> \n" +
           ",'1899-12-30 00:00:00.000'                    --<sth_fis_tarihi2, datetime,> \n" +
           ",0                    --<sth_fis_sirano2, int,> \n" +
           ",''                    --<sth_fiyfark_esas_evrak_seri, [dbo].[evrakseri_str],> \n" +
           ",0                    --<sth_fiyfark_esas_evrak_sira, int,> \n" +
           ",0                    --<sth_fiyfark_esas_satir_no, int,> \n" +
           ",''                    --<sth_istisna, nvarchar(5),> \n" +
           ",0                    --<sth_otv_tevkifat_turu, tinyint,> \n" +
           ",0                    --<sth_otv_tevkifat_tutari, float,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_servishar_uid, uniqueidentifier,> \n" +
           ",'00000000-0000-0000-0000-000000000000'                    --<sth_bakimsarf_uid, uniqueidentifier,> \n" +
           ",0                    --<sth_utsbildirimturu, tinyint,> \n" +
           ",0                    --<sth_utshekzayiatturu, tinyint,> \n" +
           ",0                    --<sth_utsimhabertarafgerekcesi, tinyint,> \n" +
           ",''                   --<sth_utsdigergerekceaciklamasi, nvarchar(50),> \n" +
           " ) ",
           param : ['sthek_create_user','sthek_lastup_user','sthek_related_uid','sth_subesip_uid'],
           type : ['int','int','string|50','string|50']
    },                  
    StokHarEvrDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND " +
                "sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip" ,
        param : ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type : ['string|20','int','int']
    },
    StokHarSatirDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_Guid = @sth_Guid ",
        param : ['sth_Guid'],
        type : ['string|50']
    },
    StokHarUpdate:
    {
        query:  "UPDATE STOK_HAREKETLERI " +
                "SET sth_miktar=@sth_miktar " +
                ",sth_miktar2=@sth_miktar2 " +  
                ",sth_tutar=@sth_tutar " +
                ",sth_vergi= (@sth_tutar - (@sth_iskonto1 + @sth_iskonto2 + @sth_iskonto3 + @sth_iskonto4 + @sth_iskonto5)) *  (SELECT [dbo].[fn_VergiYuzde] (@sth_vergi_pntr) / 100) " +
                ",sth_iskonto1=@sth_iskonto1 " +
                ",sth_iskonto2=@sth_iskonto2 " +
                ",sth_iskonto3=@sth_iskonto3 " +
                ",sth_iskonto4=@sth_iskonto4 " +
                ",sth_iskonto5=@sth_iskonto5 " +
                ",sth_iskonto6=@sth_iskonto6 " +
                ",sth_sat_iskmas1=@sth_sat_iskmas1 " +
                ",sth_sat_iskmas2=@sth_sat_iskmas2 " +
                ",sth_sat_iskmas3=@sth_sat_iskmas3 " +
                ",sth_sat_iskmas4=@sth_sat_iskmas4 " +
                ",sth_sat_iskmas5=@sth_sat_iskmas5 " +
                ",sth_sat_iskmas6=@sth_sat_iskmas6 " +
                ",sth_fat_uid=@sth_fat_uid" +
                " WHERE  sth_Guid = @sth_Guid",
        param : ['sth_miktar:float','sth_miktar2:float','sth_tutar:float','sth_vergi_pntr:int','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float',
        'sth_iskonto4:float','sth_iskonto5:float','sth_iskonto6:float','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit',
        'sth_sat_iskmas5:bit','sth_sat_iskmas6:bit','sth_Guid:string|50','sth_fat_uid:string|50']
    },
    MaxStokHarSira :
    {
        query: "SELECT ISNULL(MAX(sth_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evraktip = @sth_evraktip " ,
        param : ['sth_evrakno_seri','sth_evraktip'],
        type : ['string|25','int']
    },
    StokBedenHarGetir:
    {
        query:  "SELECT * FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid IN ((SELECT sth_Guid FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)) AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip','BdnHar_Tipi'],
        type:   ['string|20','int','int','int']
    },
    NakliyeOnayUpdate :
    {
        query: "UPDATE STOK_HAREKETLERI " +
                "SET sth_special1 = @sth_special1, sth_nakliyedurumu = @sth_nakliyedurumu " +
                "WHERE CONVERT(NVARCHAR(50),sth_Guid) = @sth_Guid",
            param : ['sth_special1','sth_nakliyedurumu','sth_Guid'],
            type : ['int','int','string|50']
    },
    NakliyeOnayKaydet :
    {

        query: "UPDATE STOK_HAREKETLERI " +
        "SET sth_miktar = @sth_special1, sth_nakliyedurumu = @sth_nakliyedurumu, sth_nakliyedeposu = @sth_nakliyedeposu, sth_giris_depo_no = @sth_giris_depo_no " +
        "WHERE sth_Guid = @sth_Guid",
    param : ['sth_special1','sth_nakliyedurumu','sth_nakliyedeposu','sth_giris_depo_no','sth_Guid'],
    type : ['int','int','int','int','string|50']
    }, 
    //Cari Hareket
    CariHarGetir : 
    {
        query:  "SELECT *, " +
                "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod=cha_kod) AS CARIADI, " +
                "ROUND(cha_meblag,2) AS TUTAR, " +
                "CASE cha_evrak_tip WHEN 34 THEN ISNULL((SELECT ban_ismi FROM BANKALAR WHERE ban_kod = cha_kasa_hizkod),'') END AS BANKAADI, " +
                "CASE cha_cinsi WHEN 19 THEN ISNULL((SELECT ban_ismi FROM BANKALAR WHERE ban_kod = cha_kasa_hizkod),'') " +
                "ELSE ISNULL((SELECT kas_isim FROM KASALAR WHERE kas_kod = cha_kasa_hizkod),'') END AS KASAADI, " +
                "CONVERT(VARCHAR(10),GETDATE(),112) AS cha_d_kurtar " +
                "FROM CARI_HESAP_HAREKETLERI " +
                "WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira " +
                "AND cha_evrak_tip=@cha_evrak_tip" ,
        param:   ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type:    ['string|20','int','int']
    },
    CariHarInsert : 
    {
        query:  "DECLARE @cha_satir_no AS INT " + 
                "SET @cha_satir_no = (SELECT ISNULL(MAX(cha_satir_no),-1) + 1 AS SATIRNO FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip) " + 
                "INSERT INTO [CARI_HESAP_HAREKETLERI] " +
                "([cha_DBCno] " +
                ",[cha_SpecRecNo] " +
                ",[cha_iptal] " +
                ",[cha_fileid] " +
                ",[cha_hidden] " +
                ",[cha_kilitli] " +
                ",[cha_degisti] " +
                ",[cha_CheckSum] " +
                ",[cha_create_user] " +
                ",[cha_create_date] " +
                ",[cha_lastup_user] " +
                ",[cha_lastup_date] " +
                ",[cha_special1] " +
                ",[cha_special2] " +
                ",[cha_special3] " +
                ",[cha_firmano] " +
                ",[cha_subeno] " +
                ",[cha_evrak_tip] " +
                ",[cha_evrakno_seri] " +
                ",[cha_evrakno_sira] " +
                ",[cha_satir_no] " +
                ",[cha_tarihi] " +
                ",[cha_tip] " +
                ",[cha_cinsi] " +
                ",[cha_normal_Iade] " +
                ",[cha_tpoz] " +
                ",[cha_ticaret_turu] " +
                ",[cha_belge_no] " +
                ",[cha_belge_tarih] " +
                ",[cha_aciklama] " +
                ",[cha_satici_kodu] " +
                ",[cha_EXIMkodu] " +
                ",[cha_projekodu] " +
                ",[cha_yat_tes_kodu] " +
                ",[cha_cari_cins] " +
                ",[cha_kod] " +
                ",[cha_ciro_cari_kodu] " +
                ",[cha_d_cins] " +
                ",[cha_d_kur] " +
                ",[cha_altd_kur] " +
                ",[cha_grupno] " +
                ",[cha_srmrkkodu] " +
                ",[cha_kasa_hizmet] " +
                ",[cha_kasa_hizkod] " +
                ",[cha_karsidcinsi] " +
                ",[cha_karsid_kur] " +
                ",[cha_karsidgrupno] " +
                ",[cha_karsisrmrkkodu] " +
                ",[cha_miktari] " +
                ",[cha_meblag] " +
                ",[cha_aratoplam] " +
                ",[cha_vade] " +
                ",[cha_Vade_Farki_Yuz] " +
                ",[cha_ft_iskonto1] " +
                ",[cha_ft_iskonto2] " +
                ",[cha_ft_iskonto3] " +
                ",[cha_ft_iskonto4] " +
                ",[cha_ft_iskonto5] " +
                ",[cha_ft_iskonto6] " +
                ",[cha_ft_masraf1] " +
                ",[cha_ft_masraf2] " +
                ",[cha_ft_masraf3] " +
                ",[cha_ft_masraf4] " +
                ",[cha_isk_mas1] " +
                ",[cha_isk_mas2] " +
                ",[cha_isk_mas3] " +
                ",[cha_isk_mas4] " +
                ",[cha_isk_mas5] " +
                ",[cha_isk_mas6] " +
                ",[cha_isk_mas7] " +
                ",[cha_isk_mas8] " +
                ",[cha_isk_mas9] " +
                ",[cha_isk_mas10] " +
                ",[cha_sat_iskmas1] " +
                ",[cha_sat_iskmas2] " +
                ",[cha_sat_iskmas3] " +
                ",[cha_sat_iskmas4] " +
                ",[cha_sat_iskmas5] " +
                ",[cha_sat_iskmas6] " +
                ",[cha_sat_iskmas7] " +
                ",[cha_sat_iskmas8] " +
                ",[cha_sat_iskmas9] " +
                ",[cha_sat_iskmas10] " +
                ",[cha_yuvarlama] " +
                ",[cha_StFonPntr] " +
                ",[cha_stopaj] " +
                ",[cha_savsandesfonu] " +
                ",[cha_avansmak_damgapul] " +
                ",[cha_vergipntr] " +
                ",[cha_vergi1] " +
                ",[cha_vergi2] " +
                ",[cha_vergi3] " +
                ",[cha_vergi4] " +
                ",[cha_vergi5] " +
                ",[cha_vergi6] " +
                ",[cha_vergi7] " +
                ",[cha_vergi8] " +
                ",[cha_vergi9] " +
                ",[cha_vergi10] " +
                ",[cha_vergisiz_fl] " +
                ",[cha_otvtutari] " +
                ",[cha_otvvergisiz_fl] " +
                ",[cha_oiv_pntr] " +
                ",[cha_oivtutari] " +
                ",[cha_oiv_vergi] " +
                ",[cha_oivergisiz_fl] " +
                ",[cha_fis_tarih] " +
                ",[cha_fis_sirano] " +
                ",[cha_trefno] " +
                ",[cha_sntck_poz] " +
                ",[cha_reftarihi] " +
                ",[cha_istisnakodu] " +
                ",[cha_pos_hareketi] " +
                ",[cha_meblag_ana_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_alt_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_orj_doviz_icin_gecersiz_fl] " +
                ",[cha_sip_uid] " +
                ",[cha_kirahar_uid] " +
                ",[cha_vardiya_tarihi] " +
                ",[cha_vardiya_no] " +
                ",[cha_vardiya_evrak_ti] " +
                ",[cha_ebelge_turu] " +
                ",[cha_tevkifat_toplam] " +
                ",[cha_ilave_edilecek_kdv1] " +
                ",[cha_ilave_edilecek_kdv2] " +
                ",[cha_ilave_edilecek_kdv3] " +
                ",[cha_ilave_edilecek_kdv4] " +
                ",[cha_ilave_edilecek_kdv5] " +
                ",[cha_ilave_edilecek_kdv6] " +
                ",[cha_ilave_edilecek_kdv7] " +
                ",[cha_ilave_edilecek_kdv8] " +
                ",[cha_ilave_edilecek_kdv9] " +
                ",[cha_ilave_edilecek_kdv10] " +
                ",[cha_e_islem_turu] " +
                ",[cha_fatura_belge_turu] " +
                ",[cha_diger_belge_adi] " +
                ",[cha_uuid] " +
                ",[cha_adres_no] " +
                ",[cha_vergifon_toplam] " +
                ",[cha_ilk_belge_tarihi] " +
                ",[cha_ilk_belge_doviz_kuru] " +
                ",[cha_HareketGrupKodu1] " +
                ",[cha_HareketGrupKodu2] " +
                ",[cha_HareketGrupKodu3] " +
                ") " + 
                "VALUES " +
                "(0												--<cha_DBCno, smallint,> \n" + 
                ",0												--<cha_SpecRecNo, int,> \n" + 
                ",0												--<cha_iptal, bit,> \n" + 
                ",51												--<cha_fileid, smallint,> \n" + 
                ",0												--<cha_hidden, bit,> \n" + 
                ",0												--<cha_kilitli, bit,> \n" + 
                ",0												--<cha_degisti, bit,> \n" + 
                ",0												--<cha_CheckSum, int,> \n" + 
                ",@cha_create_user								--<cha_create_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_create_date, datetime,> \n" + 
                ",@cha_lastup_user								--<cha_lastup_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_lastup_date, datetime,> \n" + 
                ",''											--<cha_special1, nvarchar(4),> \n" + 
                ",''											--<cha_special2, nvarchar(4),> \n" + 
                ",''											--<cha_special3, nvarchar(4),> \n" + 
                ",@cha_firmano									--<cha_firmano, int,> \n" + 
                ",@cha_subeno									--<cha_subeno, int,> \n" + 
                ",@cha_evrak_tip								--<cha_evrak_tip, tinyint,> \n" + 
                ",@cha_evrakno_seri								--<cha_evrakno_seri, nvarchar_evrakseri,> \n" + 
                ",@cha_evrakno_sira								--<cha_evrakno_sira, int,> \n" + 
                ",@cha_satir_no				--<cha_satir_no, int,> \n" + 
                ",@cha_tarihi									--<cha_tarihi, datetime,> \n" + 
                ",@cha_tip										--<cha_tip, tinyint,> \n" + 
                ",@cha_cinsi									--<cha_cinsi, tinyint,> \n" + 
                ",@cha_normal_Iade								--<cha_normal_Iade, tinyint,> \n" + 
                ",@cha_tpoz										--<cha_tpoz, tinyint,> \n" + 
                ",@cha_ticaret_turu								--<cha_ticaret_turu, tinyint,> \n" + 
                ",@cha_belge_no									--<cha_belge_no, nvarchar_belgeno,> \n" + 
                ",@cha_belge_tarih								--<cha_belge_tarih, datetime,> \n" + 
                ",@cha_aciklama									--<cha_aciklama, nvarchar(40),> \n" + 
                ",@cha_satici_kodu								--<cha_satici_kodu, nvarchar(25),> \n" + 
                ",@cha_EXIMkodu									--<cha_EXIMkodu, nvarchar(25),> \n" + 
                ",@cha_projekodu								--<cha_projekodu, nvarchar(25),> \n" + 
                ",''											--<cha_yat_tes_kodu, nvarchar(25),> \n" + 
                ",@cha_cari_cins								--<cha_cari_cins, tinyint,> \n" + 
                ",@cha_kod										--<cha_kod, nvarchar(25),> \n" + 
                ",@cha_ciro_cari_kodu							--<cha_ciro_cari_kodu, nvarchar(25),> \n" + 
                ",@cha_d_cins									--<cha_d_cins, tinyint,> \n" + 
                ",@cha_d_kur									--<cha_d_kur, float,> \n" + 
                ",@cha_altd_kur									--<cha_altd_kur, float,> \n" + 
                ",@cha_grupno									--<cha_grupno, tinyint,> \n" + 
                ",@cha_srmrkkodu								--<cha_srmrkkodu, nvarchar(25),> \n" + 
                ",@cha_kasa_hizmet								--<cha_kasa_hizmet, tinyint,> \n" + 
                ",@cha_kasa_hizkod								--<cha_kasa_hizkod, nvarchar(25),> \n" + 
                ",@cha_kasaidcinsi												--<cha_karsidcinsi, tinyint,> \n" + 
                ",@cha_kasaid_kur												--<cha_karsid_kur, float,> \n" + 
                ",@cha_karsidgrupno								--<cha_karsidgrupno, tinyint,> \n" + 
                ",@cha_karsisrmrkkodu											--<cha_karsisrmrkkodu, nvarchar(25),> \n" + 
                ",0												--<cha_miktari, float,> \n" + 
                ",@cha_meblag									--<cha_meblag, float,> \n" + 
                ",@cha_aratoplam								--<cha_aratoplam, float,> \n" + 
                ",(SELECT CAST(DATEPART(YYYY,@cha_vade) AS [CHAR](4)) + RIGHT('0' + CAST(DATEPART(M,@cha_vade) AS [VARCHAR](2)),2) + RIGHT('0' + CAST(DATEPART(D,@cha_vade) AS [VARCHAR](2)),2))	--<cha_vade, int,> \n" + 
                ",0												--<cha_Vade_Farki_Yuz, float,> \n" + 
                ",@cha_ft_iskonto1								--<cha_ft_iskonto1, float,> \n" + 
                ",@cha_ft_iskonto2								--<cha_ft_iskonto2, float,> \n" + 
                ",@cha_ft_iskonto3								--<cha_ft_iskonto3, float,> \n" + 
                ",@cha_ft_iskonto4								--<cha_ft_iskonto4, float,> \n" + 
                ",@cha_ft_iskonto5								--<cha_ft_iskonto5, float,> \n" + 
                ",@cha_ft_iskonto6								--<cha_ft_iskonto6, float,> \n" + 
                ",@cha_ft_masraf1								--<cha_ft_masraf1, float,> \n" + 
                ",@cha_ft_masraf2								--<cha_ft_masraf2, float,> \n" + 
                ",@cha_ft_masraf3								--<cha_ft_masraf3, float,> \n" + 
                ",@cha_ft_masraf4								--<cha_ft_masraf4, float,> \n" + 
                ",0												--<cha_isk_mas1, tinyint,> \n" + 
                ",0												--<cha_isk_mas2, tinyint,> \n" + 
                ",0												--<cha_isk_mas3, tinyint,> \n" + 
                ",0												--<cha_isk_mas4, tinyint,> \n" + 
                ",0												--<cha_isk_mas5, tinyint,> \n" + 
                ",0												--<cha_isk_mas6, tinyint,> \n" + 
                ",0												--<cha_isk_mas7, tinyint,> \n" + 
                ",0												--<cha_isk_mas8, tinyint,> \n" + 
                ",0												--<cha_isk_mas9, tinyint,> \n" + 
                ",0												--<cha_isk_mas10, tinyint,> \n" + 
                ",0												--<cha_sat_iskmas1, bit,> \n" + 
                ",0												--<cha_sat_iskmas2, bit,> \n" + 
                ",0												--<cha_sat_iskmas3, bit,> \n" + 
                ",0												--<cha_sat_iskmas4, bit,> \n" + 
                ",0												--<cha_sat_iskmas5, bit,> \n" + 
                ",0												--<cha_sat_iskmas6, bit,> \n" + 
                ",0												--<cha_sat_iskmas7, bit,> \n" + 
                ",0												--<cha_sat_iskmas8, bit,> \n" + 
                ",0												--<cha_sat_iskmas9, bit,> \n" + 
                ",0												--<cha_sat_iskmas10, bit,> \n" + 
                ",0												--<cha_yuvarlama, float,> \n" + 
                ",0												--<cha_StFonPntr, tinyint,> \n" + 
                ",0												--<cha_stopaj, float,> \n" + 
                ",0												--<cha_savsandesfonu, float,> \n" + 
                ",0												--<cha_avansmak_damgapul, float,> \n" + 
                ",@cha_vergipntr								--<cha_vergipntr, tinyint,> \n" + 
                ",@cha_vergi1									--<cha_vergi1, float,> \n" + 
                ",@cha_vergi2									--<cha_vergi2, float,> \n" + 
                ",@cha_vergi3									--<cha_vergi3, float,> \n" + 
                ",@cha_vergi4									--<cha_vergi4, float,> \n" + 
                ",@cha_vergi5									--<cha_vergi5, float,> \n" + 
                ",@cha_vergi6									--<cha_vergi6, float,> \n" + 
                ",@cha_vergi7									--<cha_vergi7, float,> \n" + 
                ",@cha_vergi8									--<cha_vergi8, float,> \n" + 
                ",@cha_vergi9									--<cha_vergi9, float,> \n" + 
                ",@cha_vergi10									--<cha_vergi10, float,> \n" + 
                ",@cha_vergisiz_fl								--<cha_vergisiz_fl, bit,> \n" + 
                ",@cha_otvtutari								--<cha_otvtutari, float,> \n" + 
                ",@cha_otvvergisiz_fl							--<cha_otvvergisiz_fl, bit,> \n" + 
                ",0												--<cha_oiv_pntr, tinyint,> \n" + 
                ",0												--<cha_oivtutari, float,> \n" + 
                ",0												--<cha_oiv_vergi, float,> \n" + 
                ",@cha_oivergisiz_fl							--<cha_oivergisiz_fl, bit,> \n" + 
                ",'18991230'									--<cha_fis_tarih, datetime,> \n" + 
                ",0												--<cha_fis_sirano, int,> \n" + 
                ",@cha_trefno									--<cha_trefno, nvarchar(25),> \n" + 
                ",@cha_sntck_poz								--<cha_sntck_poz, tinyint,> \n" + 
                ",'18991230'									--<cha_reftarihi, datetime,> \n" + 
                ",0												--<cha_istisnakodu, tinyint,> \n" + 
                ",0												--<cha_pos_hareketi, bit,> \n" + 
                ",0												--<cha_meblag_ana_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_alt_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_orj_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_sip_uid, int,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_kirahar_recid_recno, int,> \n" + 
                ",'18991230'									--<cha_vardiya_tarihi, datetime,> \n" + 
                ",0												--<cha_vardiya_no, tinyint,> \n" + 
                ",0												--<cha_vardiya_evrak_ti, tinyint,> \n" + 
                ",0                                             --<cha_ebelge_turu,tinyint> \n" + 
                ",0												--<cha_tevkifat_toplam, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv1, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv2, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv3, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv4, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv5, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv6, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv7, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv8, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv9, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv10, float,> \n" + 
                ",@cha_e_islem_turu								--<cha_e_islem_turu, tinyint,> \n" + 
                ",0												--<cha_fatura_belge_turu, tinyint,> \n" + 
                ",''											--<cha_diger_belge_adi, nvarchar(50),> \n" + 
                ",NEWID() 									    --<cha_uuid, nvarchar(40),> \n" + 
                ",1												--<cha_adres_no, int,> \n" + 
                ",0												--<cha_vergifon_toplam, float,> \n" + 
                ",'18991230'									--<cha_ilk_belge_tarihi> \n" + 
                ",0												--<cha_ilk_belge_doviz_kuru> \n" + 
                ",''											--<cha_HareketGrupKodu1> \n" + 
                ",''											--<cha_HareketGrupKodu2> \n" + 
                ",''											--<cha_HareketGrupKodu3> \n" + 
                ") " +
                "SELECT cha_Guid FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira " +
                "AND cha_evrak_tip=@cha_evrak_tip AND cha_satir_no = @cha_satir_no",
        param : ['cha_create_user:int','cha_lastup_user:int','cha_firmano:int','cha_subeno:int','cha_evrak_tip:int','cha_evrakno_seri:string|25','cha_evrakno_sira:int',
                 'cha_tarihi:date','cha_tip:int','cha_cinsi:int','cha_normal_Iade:int','cha_tpoz:int','cha_ticaret_turu:int','cha_belge_no:string|25','cha_belge_tarih:date',
                 'cha_aciklama:string|40','cha_satici_kodu:string|25','cha_EXIMkodu:string|25','cha_projekodu:string|25','cha_cari_cins:int','cha_kod:string|25','cha_ciro_cari_kodu:string|25',
                 'cha_d_cins:int','cha_d_kur:float','cha_altd_kur:float','cha_grupno:int','cha_srmrkkodu:string|25','cha_kasa_hizmet:int','cha_kasa_hizkod:string|25','cha_kasaidcinsi:int','cha_kasaid_kur:float','cha_karsidgrupno:int','cha_karsisrmrkkodu:string|25',
                 'cha_meblag:float','cha_aratoplam:float','cha_vade:string|10','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float','cha_ft_iskonto4:float','cha_ft_iskonto5:float',
                 'cha_ft_iskonto6:float','cha_ft_masraf1:float','cha_ft_masraf2:float','cha_ft_masraf3:float','cha_ft_masraf4:float','cha_vergipntr:int','cha_vergi1:float','cha_vergi2:float',
                 'cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float','cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_vergisiz_fl:bit',
                 'cha_otvtutari:float','cha_otvvergisiz_fl:bit','cha_oivergisiz_fl:bit','cha_trefno:string|25','cha_sntck_poz:int','cha_e_islem_turu:int']
    },
    CariHarEvrDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type : ['string|20','int','int']
    },
    CariHarSatirDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_Guid=@cha_Guid",
        param : ['cha_Guid'],
        type : ['string|50']
    },
    CariHarUpdate:
    {
        query:  "UPDATE CARI_HESAP_HAREKETLERI " +
                "SET cha_meblag=@cha_meblag " +
                ",cha_aratoplam=@cha_aratoplam " +
                ",cha_vergi1=@cha_vergi1 " +
                ",cha_vergi2=@cha_vergi2 " +
                ",cha_vergi3=@cha_vergi3 " + 
                ",cha_vergi4=@cha_vergi4 " + 
                ",cha_vergi5=@cha_vergi5 " + 
                ",cha_vergi6=@cha_vergi6 " + 
                ",cha_vergi7=@cha_vergi7 " + 
                ",cha_vergi8=@cha_vergi8 " + 
                ",cha_vergi9=@cha_vergi9 " + 
                ",cha_vergi10=@cha_vergi10 " +
                ",cha_ft_iskonto1=@cha_ft_iskonto1 " +
                ",cha_ft_iskonto2=@cha_ft_iskonto2 " +
                ",cha_ft_iskonto3=@cha_ft_iskonto3 " +
                ",cha_ft_iskonto4=@cha_ft_iskonto4 " +
                ",cha_ft_iskonto5=@cha_ft_iskonto5 " +
                ",cha_ft_iskonto6=@cha_ft_iskonto6 " +
                ",cha_otvtutari = @cha_otvtutari " +
                "WHERE  cha_Guid = @cha_Guid ",
        param : ['cha_meblag:float','cha_aratoplam:float','cha_vergi1:float','cha_vergi2:float','cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float',
                 'cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float',
                 'cha_ft_iskonto4:float','cha_ft_iskonto5:float','cha_ft_iskonto6:float','cha_otvtutari:float','cha_Guid:string|50']
    },
    MaxCariHarSira : 
    {
        query: "SELECT ISNULL(MAX(cha_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrak_tip'],
        type : ['string|25','int']
    },
    //Odeme Emirleri
    CekHarInsert:
    {
        query:  "INSERT INTO [dbo].[ODEME_EMIRLERI] " + 
                "([sck_DBCno] " +
                ",[sck_SpecRECno] " +
                ",[sck_iptal] " +
                ",[sck_fileid] " +
                ",[sck_hidden] " +
                ",[sck_kilitli] " +
                ",[sck_degisti] " +
                ",[sck_checksum] " +
                ",[sck_create_user] " +
                ",[sck_create_date] " +
                ",[sck_lastup_user] " +
                ",[sck_lastup_date] " +
                ",[sck_special1] " +
                ",[sck_special2] " +
                ",[sck_special3] " +
                ",[sck_firmano] " +
                ",[sck_subeno] " +
                ",[sck_tip] " +
                ",[sck_refno] " +
                ",[sck_bankano] " +
                ",[sck_borclu] " +
                ",[sck_vdaire_no] " +
                ",[sck_vade] " +
                ",[sck_tutar] " +
                ",[sck_doviz] " +
                ",[sck_odenen] " +
                ",[sck_degerleme_islendi] " +
                ",[sck_banka_adres1] " +
                ",[sck_sube_adres2] " +
                ",[sck_borclu_tel] " +
                ",[sck_hesapno_sehir] " +
                ",[sck_no] " +
                ",[sck_duzen_tarih] " +
                ",[sck_sahip_cari_cins] " +
                ",[sck_sahip_cari_kodu] " +
                ",[sck_sahip_cari_grupno] " +
                ",[sck_nerede_cari_cins] " +
                ",[sck_nerede_cari_kodu] " +
                ",[sck_nerede_cari_grupno] " +
                ",[sck_ilk_hareket_tarihi] " +
                ",[sck_ilk_evrak_seri] " +
                ",[sck_ilk_evrak_sira_no] " +
                ",[sck_ilk_evrak_satir_no] " +
                ",[sck_son_hareket_tarihi] " +
                ",[sck_doviz_kur] " +
                ",[sck_sonpoz] " +
                ",[sck_imza] " +
                ",[sck_srmmrk] " +
                ",[sck_kesideyeri] " +
                ",[Sck_TCMB_Banka_kodu] " +
                ",[Sck_TCMB_Sube_kodu] " +
                ",[Sck_TCMB_il_kodu] " +
                ",[SckTasra_fl] " +
                ",[sck_projekodu] " +
                ",[sck_masraf1] " +
                ",[sck_masraf1_isleme] " +
                ",[sck_masraf2] " +
                ",[sck_masraf2_isleme] " +
                ",[sck_odul_katkisi_tutari] " +
                ",[sck_servis_komisyon_tutari] " +
                ",[sck_erken_odeme_faiz_tutari] " +
                ",[sck_odul_katkisi_tutari_islendi_fl] " +
                ",[sck_servis_komisyon_tutari_islendi_fl] " +
                ",[sck_erken_odeme_faiz_tutari_islendi_fl] " +
                ",[sck_kredi_karti_tipi] " +
                ",[sck_taksit_sayisi] " +
                ",[sck_kacinci_taksit] " +
                ",[sck_uye_isyeri_no] " +
                ",[sck_kredi_karti_no] " +
                ",[sck_provizyon_kodu]) " +
                "VALUES " +
                "(0                         --<sck_DBCno, smallint,> \n" + 
                ",0                         --<sck_SpecRECno, int,> \n" + 
                ",0                         --<sck_iptal, bit,> \n" + 
                ",54                        --<sck_fileid, smallint,> \n" + 
                ",0                         --<sck_hidden, bit,> \n" + 
                ",0                         --<sck_kilitli, bit,> \n" + 
                ",0                         --<sck_degisti, bit,> \n" + 
                ",0                         --<sck_checksum, int,> \n" + 
                ",@sck_create_user          --<sck_create_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_create_date, datetime,> \n" + 
                ",@sck_lastup_user          --<sck_lastup_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_lastup_date, datetime,> \n" + 
                ",''                        --<sck_special1, nvarchar(4),> \n" + 
                ",''                        --<sck_special2, nvarchar(4),> \n" + 
                ",''                        --<sck_special3, nvarchar(4),> \n" + 
                ",@sck_firmano              --<sck_firmano, int,> \n" + 
                ",@sck_subeno               --<sck_subeno, int,> \n" + 
                ",@sck_tip                  --<sck_tip, tinyint,> \n" + 
                ",@sck_refno                --<sck_refno, nvarchar(25),> \n" + 
                ",''                        --<sck_bankano, nvarchar(25),> \n" + 
                ",@sck_borclu               --<sck_borclu, nvarchar(50),> \n" + 
                ",''                        --<sck_vdaire_no, nvarchar(40),> \n" + 
                ",@sck_vade                 --<sck_vade, datetime,> \n" + 
                ",@sck_tutar                --<sck_tutar, float,> \n" + 
                ",@sck_doviz                --<sck_doviz, tinyint,> \n" + 
                ",@sck_odenen               --<sck_odenen, float,> \n" + 
                ",0                         --<sck_degerleme_islendi, tinyint,> \n" + 
                ",''                        --<sck_banka_adres1, nvarchar(50),> \n" + 
                ",''                        --<sck_sube_adres2, nvarchar(50),> \n" + 
                ",''                        --<sck_borclu_tel, nvarchar(15),> \n" + 
                ",''                        --<sck_hesapno_sehir, nvarchar(30),> \n" + 
                ",''                        --<sck_no, nvarchar(25),> \n" + 
                ",'18991230'                --<sck_duzen_tarih, datetime,> \n" + 
                ",@sck_sahip_cari_cins      --<sck_sahip_cari_cins, tinyint,> \n" + 
                ",@sck_sahip_cari_kodu      --<sck_sahip_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_sahip_cari_grupno    --<sck_sahip_cari_grupno, tinyint,> \n" + 
                ",@sck_nerede_cari_cins     --<sck_nerede_cari_cins, tinyint,> \n" + 
                ",@sck_nerede_cari_kodu     --<sck_nerede_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_nerede_cari_grupno   --<sck_nerede_cari_grupno, tinyint,> \n" + 
                ",@sck_ilk_hareket_tarihi   --<sck_ilk_hareket_tarihi, datetime,> \n" + 
                ",@sck_ilk_evrak_seri       --<sck_ilk_evrak_seri, [dbo].[evrakseri_str],> \n" + 
                ",@sck_ilk_evrak_sira_no    --<sck_ilk_evrak_sira_no, int,> \n" + 
                ",@sck_ilk_evrak_satir_no   --<sck_ilk_evrak_satir_no, int,> \n" +
                ",@sck_son_hareket_tarihi   --<sck_son_hareket_tarihi, datetime,> \n" + 
                ",@sck_doviz_kur            --<sck_doviz_kur, float,> \n" + 
                ",@sck_sonpoz               --<sck_sonpoz, tinyint,> \n" + 
                ",0                         --<sck_imza, tinyint,> \n" + 
                ",@sck_srmmrk               --<sck_srmmrk, nvarchar(25),> \n" + 
                ",''                        --<sck_kesideyeri, nvarchar(14),> \n" + 
                ",''                        --<Sck_TCMB_Banka_kodu, nvarchar(4),> \n" + 
                ",''                        --<Sck_TCMB_Sube_kodu, nvarchar(8),> \n" + 
                ",''                        --<Sck_TCMB_il_kodu, nvarchar(3),> \n" + 
                ",0                         --<SckTasra_fl, bit,> \n" + 
                ",@sck_projekodu            --<sck_projekodu, nvarchar(25),> \n" + 
                ",0                         --<sck_masraf1, float,> \n" + 
                ",0                         --<sck_masraf1_isleme, tinyint,> \n" + 
                ",0                         --<sck_masraf2, float,> \n" + 
                ",0                         --<sck_masraf2_isleme, tinyint,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari, float,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari, float,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari, float,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_kredi_karti_tipi, tinyint,> \n" + 
                ",0                         --<sck_taksit_sayisi, smallint,> \n" + 
                ",0                         --<sck_kacinci_taksit, smallint,> \n" + 
                ",''                        --<sck_uye_isyeri_no, nvarchar(25),> \n" + 
                ",''                        --<sck_kredi_karti_no, nvarchar(16),> \n" + 
                ",''                        --<sck_provizyon_kodu, nvarchar(10),> \n" + 
                ")",
        param : ['sck_create_user:int','sck_lastup_user:int','sck_firmano:int','sck_subeno:int','sck_tip:int','sck_refno:string|25','sck_borclu:string|25',
                 'sck_vade:date','sck_tutar:float','sck_doviz:int','sck_odenen:float','sck_sahip_cari_cins:int','sck_sahip_cari_kodu:string|25','sck_sahip_cari_grupno:int','sck_nerede_cari_cins:int',
                 'sck_nerede_cari_kodu:string|25','sck_nerede_cari_grupno:int','sck_ilk_hareket_tarihi:date','sck_ilk_evrak_seri:string|25','sck_ilk_evrak_sira_no:int',
                 'sck_ilk_evrak_satir_no:int','sck_son_hareket_tarihi:date','sck_doviz_kur:float','sck_sonpoz:int','sck_srmmrk:string|25','sck_projekodu:string|25']
    },
    CekHarUpdate:
    {
        query:  "UPDATE ODEME_EMIRLERI " +
                "SET sck_tutar = @sck_tutar " +
                "WHERE sck_refno = @sck_refno " ,
        param : ['sck_tutar:float','sck_refno:string|50']
    },
    CekHarDelete:
    {
        query:  "DELETE FROM ODEME_EMIRLERI WHERE sck_ilk_evrak_seri = @sck_ilk_evrak_seri AND sck_ilk_evrak_sira_no = @sck_ilk_evrak_sira_no" ,
        param : ['sck_ilk_evrak_seri','sck_ilk_evrak_sira_no'],
        type : ['string|20','int']
    },
    MaxCekRefNo : 
    {
        query: "SELECT TIP + '-000-000-' + CONVERT(NVARCHAR(20),YEAR(GETDATE())) + '-' +  REPLACE(STR(CONVERT(NVARCHAR(10),ISNULL(REFNO,0)), 8), SPACE(1), '0') AS MAXREFNO " +
                "FROM (SELECT " +
                "CASE @sck_tip WHEN 0 THEN 'MC' WHEN 1 THEN 'MS' WHEN 6 THEN 'MK' END AS TIP, " +
                "MAX(CONVERT(INT,SUBSTRING(sck_refno,17,25))) + 1 AS REFNO " +
                "FROM ODEME_EMIRLERI WHERE sck_tip = @sck_tip ) AS TBL" ,
        param : ['sck_tip'],
        type : ['int']
    },
    //CariListe
    RptCariListe :
    {
        query :"SELECT cari_unvan1 AS CARIAD, cari_kod AS CARIKOD, " +
                "(SELECT ISNULL(adr_sokak+' '+adr_cadde+' '+adr_ilce+' '+adr_il,+'') FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1) AS ADRES " +
                "FROM CARI_HESAPLAR " 
    },
    CariInsert : 
    {
        query : "INSERT INTO [dbo].[CARI_HESAPLAR] " +
            "([cari_DBCno] " +
            ",[cari_SpecRECno] " +
            ",[cari_iptal] " +
            ",[cari_fileid] " +
            ",[cari_hidden] " +
            ",[cari_kilitli] " + 
            ",[cari_degisti] " +
            ",[cari_checksum] " +
            ",[cari_create_user] " +
            ",[cari_create_date] " +
            ",[cari_lastup_user] " + 
            ",[cari_lastup_date] " +
            ",[cari_special1] " +
            ",[cari_special2] " +
            ",[cari_special3] " +
            ",[cari_kod] " +
            ",[cari_unvan1] " +
            ",[cari_unvan2] " +
            ",[cari_hareket_tipi] " +
            ",[cari_baglanti_tipi] " +
            ",[cari_stok_alim_cinsi] " +
            ",[cari_stok_satim_cinsi] " +
            ",[cari_muh_kod] " +
            ",[cari_muh_kod1] " +
            ",[cari_muh_kod2] " +
            ",[cari_doviz_cinsi] " +
            ",[cari_doviz_cinsi1] " +
            ",[cari_doviz_cinsi2] " +
            ",[cari_vade_fark_yuz] " +
            ",[cari_vade_fark_yuz1] " +
            ",[cari_vade_fark_yuz2] " +
            ",[cari_KurHesapSekli] " +
            ",[cari_vdaire_adi] " +
            ",[cari_vdaire_no] " +
            ",[cari_sicil_no] " + 
            ",[cari_VergiKimlikNo] " +
            ",[cari_satis_fk] " +
            ",[cari_odeme_cinsi] " +
            ",[cari_odeme_gunu] " +
            ",[cari_odemeplan_no] " +
            ",[cari_opsiyon_gun] " +
            ",[cari_cariodemetercihi] " +
            ",[cari_fatura_adres_no] " +
            ",[cari_sevk_adres_no] " +
            ",[cari_banka_tcmb_kod1] " +
            ",[cari_banka_tcmb_subekod1] " +
            ",[cari_banka_tcmb_ilkod1] " +
            ",[cari_banka_hesapno1] " +
            ",[cari_banka_swiftkodu1] " +
            ",[cari_banka_tcmb_kod2] " +
            ",[cari_banka_tcmb_subekod2] " +
            ",[cari_banka_tcmb_ilkod2] " +
            ",[cari_banka_hesapno2] " +
            ",[cari_banka_swiftkodu2] " +
            ",[cari_banka_tcmb_kod3] " +
            ",[cari_banka_tcmb_subekod3] " +
            ",[cari_banka_tcmb_ilkod3] " +
            ",[cari_banka_hesapno3] " +
            ",[cari_banka_swiftkodu3] " +
            ",[cari_banka_tcmb_kod4] " +
            ",[cari_banka_tcmb_subekod4] " +
            ",[cari_banka_tcmb_ilkod4] " +
            ",[cari_banka_hesapno4] " +
            ",[cari_banka_swiftkodu4] " +
            ",[cari_banka_tcmb_kod5] " +
            ",[cari_banka_tcmb_subekod5] " +
            ",[cari_banka_tcmb_ilkod5] " +
            ",[cari_banka_hesapno5] " +
            ",[cari_banka_swiftkodu5] " +
            ",[cari_banka_tcmb_kod6] " +
            ",[cari_banka_tcmb_subekod6] " +
            ",[cari_banka_tcmb_ilkod6] " +
            ",[cari_banka_hesapno6] " +
            ",[cari_banka_swiftkodu6] " +
            ",[cari_banka_tcmb_kod7] " +
            ",[cari_banka_tcmb_subekod7] " +
            ",[cari_banka_tcmb_ilkod7] " +
            ",[cari_banka_hesapno7] " +
            ",[cari_banka_swiftkodu7] " +
            ",[cari_banka_tcmb_kod8] " +
            ",[cari_banka_tcmb_subekod8] " +
            ",[cari_banka_tcmb_ilkod8] " + 
            ",[cari_banka_hesapno8] " +
            ",[cari_banka_swiftkodu8] " + 
            ",[cari_banka_tcmb_kod9] " +
            ",[cari_banka_tcmb_subekod9] " +
            ",[cari_banka_tcmb_ilkod9] " +
            ",[cari_banka_hesapno9] " +
            ",[cari_banka_swiftkodu9] " + 
            ",[cari_banka_tcmb_kod10] " +
            ",[cari_banka_tcmb_subekod10] " +
            ",[cari_banka_tcmb_ilkod10] " +
            ",[cari_banka_hesapno10] " + 
            ",[cari_banka_swiftkodu10] " +
            ",[cari_EftHesapNum] " + 
            ",[cari_Ana_cari_kodu] " +
            ",[cari_satis_isk_kod] " +
            ",[cari_sektor_kodu] " +
            ",[cari_bolge_kodu] " +
            ",[cari_grup_kodu] " +
            ",[cari_temsilci_kodu] " +
            ",[cari_muhartikeli] " +
            ",[cari_firma_acik_kapal] " +
            ",[cari_BUV_tabi_fl] " +
            ",[cari_cari_kilitli_flg] " +
            ",[cari_etiket_bas_fl] " +
            ",[cari_Detay_incele_flg] " +
            ",[cari_efatura_fl] " +
            ",[cari_POS_ongpesyuzde] " +
            ",[cari_POS_ongtaksayi] " +
            ",[cari_POS_ongIskOran] " +
            ",[cari_kaydagiristarihi] " +
            ",[cari_KabEdFCekTutar] " +
            ",[cari_hal_caritip] " +
            ",[cari_HalKomYuzdesi] " +
            ",[cari_TeslimSuresi] " +
            ",[cari_wwwadresi] " +
            ",[cari_EMail] " +
            ",[cari_CepTel] " +
            ",[cari_VarsayilanGirisDepo] " +
            ",[cari_VarsayilanCikisDepo] " +
            ",[cari_Portal_Enabled] " +
            ",[cari_Portal_PW] " +
            ",[cari_BagliOrtaklisa_Firma] " +
            ",[cari_kampanyakodu] " +
            ",[cari_b_bakiye_degerlendirilmesin_fl] " +
            ",[cari_a_bakiye_degerlendirilmesin_fl] " +
            ",[cari_b_irsbakiye_degerlendirilmesin_fl] " +
            ",[cari_a_irsbakiye_degerlendirilmesin_fl] " +
            ",[cari_b_sipbakiye_degerlendirilmesin_fl] " +
            ",[cari_a_sipbakiye_degerlendirilmesin_fl] " +
            ",[cari_AvmBilgileri1KiraKodu] " +
            ",[cari_AvmBilgileri1TebligatSekli] " +
            ",[cari_AvmBilgileri2KiraKodu] " +
            ",[cari_AvmBilgileri2TebligatSekli] " +
            ",[cari_AvmBilgileri3KiraKodu] " +
            ",[cari_AvmBilgileri3TebligatSekli] " +
            ",[cari_AvmBilgileri4KiraKodu] " +
            ",[cari_AvmBilgileri4TebligatSekli] " +
            ",[cari_AvmBilgileri5KiraKodu]" +
            ",[cari_AvmBilgileri5TebligatSekli] " +
            ",[cari_AvmBilgileri6KiraKodu] " +
            ",[cari_AvmBilgileri6TebligatSekli] " +
            ",[cari_AvmBilgileri7KiraKodu] " +
            ",[cari_AvmBilgileri7TebligatSekli] " +
            ",[cari_AvmBilgileri8KiraKodu] " +
            ",[cari_AvmBilgileri8TebligatSekli] " +
            ",[cari_AvmBilgileri9KiraKodu] " +
            ",[cari_AvmBilgileri9TebligatSekli] " +
            ",[cari_AvmBilgileri10KiraKodu] " +
            ",[cari_AvmBilgileri10TebligatSekli] " +
            ",[cari_KrediRiskTakibiVar_flg] " +
            ",[cari_ufrs_fark_muh_kod] " +
            ",[cari_ufrs_fark_muh_kod1] " +
            ",[cari_ufrs_fark_muh_kod2] " +
            ",[cari_odeme_sekli] " +
            ",[cari_TeminatMekAlacakMuhKodu] " +
            ",[cari_TeminatMekAlacakMuhKodu1] " +
            ",[cari_TeminatMekAlacakMuhKodu2] " +
            ",[cari_TeminatMekBorcMuhKodu] " +
            ",[cari_TeminatMekBorcMuhKodu1] " +
            ",[cari_TeminatMekBorcMuhKodu2] " +
            ",[cari_VerilenDepozitoTeminatMuhKodu] " +
            ",[cari_VerilenDepozitoTeminatMuhKodu1] " +
            ",[cari_VerilenDepozitoTeminatMuhKodu2] " +
            ",[cari_AlinanDepozitoTeminatMuhKodu] " +
            ",[cari_AlinanDepozitoTeminatMuhKodu1] " +
            ",[cari_AlinanDepozitoTeminatMuhKodu2] " +
            ",[cari_def_efatura_cinsi] " +
            ",[cari_otv_tevkifatina_tabii_fl] " +
            ",[cari_KEP_adresi] " +
            ",[cari_efatura_baslangic_tarihi] " +
            ",[cari_mutabakat_mail_adresi] " +
            ",[cari_mersis_no] " +
            ",[cari_istasyon_cari_kodu] " +
            ",[cari_gonderionayi_sms] " +
            ",[cari_gonderionayi_email] " +
            ",[cari_eirsaliye_fl] " +
            ",[cari_eirsaliye_baslangic_tarihi] " +
            ",[cari_vergidairekodu] " +
            ",[cari_CRM_sistemine_aktar_fl] " +
            ",[cari_efatura_xslt_dosya] " +
            ",[cari_pasaport_no] " +
            ",[cari_kisi_kimlik_bilgisi_aciklama_turu] " +
            ",[cari_kisi_kimlik_bilgisi_diger_aciklama] " +
            ",[cari_uts_kurum_no] " +
            ",[cari_kamu_kurumu_fl] " +
            ",[cari_earsiv_xslt_dosya] " +
            ",[cari_Perakende_fl]) " +
            "VALUES " +
            "(0                                    --<cari_DBCno, smallint,> \n" +
            ",0                                    --<cari_SpecRECno, int,>\n" +
            ",0                                    --<cari_iptal, bit,>\n" +
            ",31                                   --<cari_fileid, smallint,>\n" +
            ",0                                    --<cari_hidden, bit,>\n" +
            ",0                                    --<cari_kilitli, bit,>\n" +
            ",0                                    --<cari_degisti, bit,>\n" +
            ",0                                    --<cari_checksum, int,>\n" +
            ",1                                    --<cari_create_user, smallint,>\n" +
            ",GETDATE()                            --<cari_create_date, datetime,>\n" +
            ",1                                    --<cari_lastup_user, smallint,>\n" +
            ",GETDATE()                            --<cari_lastup_date, datetime,>\n" +
            ",''                                   --<cari_special1, nvarchar(4),>\n" +
            ",''                                   --<cari_special2, nvarchar(4),>\n" +
            ",''                                   --<cari_special3, nvarchar(4),>\n" +
            ",@CARIKOD                             --<cari_kod, nvarchar(25),>\n" +
            ",@CARIUNVAN1                          --<cari_unvan1, nvarchar(127),>\n" +
            ",@CARIUNVAN2                          --<cari_unvan2, nvarchar(127),>\n" +
            ",0                                    --<cari_hareket_tipi, tinyint,>\n" +
            ",@CARITIP                             --<cari_baglanti_tipi, tinyint,>\n" +
            ",0                                    --<cari_stok_alim_cinsi, tinyint,>\n" +
            ",0                                    --<cari_stok_satim_cinsi, tinyint,>\n" +
            ",''                                   --<cari_muh_kod, nvarchar(40),>\n" +
            ",''                                   --<cari_muh_kod1, nvarchar(40),>\n" +
            ",''                                   --<cari_muh_kod2, nvarchar(40),>\n" +
            ",@DOVIZ                               --<cari_doviz_cinsi, tinyint,>\n" +
            ",255                                  --<cari_doviz_cinsi1, tinyint,>\n" +
            ",255                                  --<cari_doviz_cinsi2, tinyint,>\n" +
            ",25                                   --<cari_vade_fark_yuz, float,>\n" +
            ",0                                    --<cari_vade_fark_yuz1, float,>\n" +
            ",0                                    --<cari_vade_fark_yuz2, float,>\n" +
            ",1                                    --<cari_KurHesapSekli, tinyint,>\n" +
            ",@VDAIREADI                           --<cari_vdaire_adi, nvarchar(50),>\n" +
            ",@VDAIRENO                            --<cari_vdaire_no, nvarchar(15),>\n" +
            ",''                                   --<cari_sicil_no, nvarchar(15),>\n" +
            ",''                                   --<cari_VergiKimlikNo, nvarchar(10),>\n" +
            ",1                                    --<cari_satis_fk, int,>\n" +
            ",0                                    --<cari_odeme_cinsi, tinyint,>\n" +
            ",0                                    --<cari_odeme_gunu, tinyint,>\n" +
            ",0                                    --<cari_odemeplan_no, int,>\n" +
            ",0                                    --<cari_opsiyon_gun, int,>\n" +
            ",0                                    --<cari_cariodemetercihi, tinyint,>\n" +
            ",1                                    --<cari_fatura_adres_no, int,>\n" +
            ",1                                    --<cari_sevk_adres_no, int,>\n" +
            ",''                                   --<cari_banka_tcmb_kod1, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod1, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod1, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno1, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu1, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod2, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod2, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod2, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno2, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu2, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod3, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod3, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod3, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno3, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu3, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod4, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod4, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod4, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno4, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu4, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod5, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod5, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod5, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno5, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu5, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod6, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod6, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod6, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno6, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu6, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod7, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod7, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod7, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno7, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu7, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod8, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod8, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod8, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno8, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu8, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod9, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod9, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod9, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno9, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu9, nvarchar(25),> \n" +
            ",''                                   --<cari_banka_tcmb_kod10, nvarchar(4),> \n" +
            ",''                                   --<cari_banka_tcmb_subekod10, nvarchar(8),> \n" +
            ",''                                   --<cari_banka_tcmb_ilkod10, nvarchar(3),> \n" +
            ",''                                   --<cari_banka_hesapno10, nvarchar(30),> \n" +
            ",''                                   --<cari_banka_swiftkodu10, nvarchar(25),> \n" +
            ",1                                    --<cari_EftHesapNum, tinyint,> \n" +
            ",''                                   --<cari_Ana_cari_kodu, nvarchar(25),> \n" +
            ",''                                   --<cari_satis_isk_kod, nvarchar(4),> \n" +
            ",''                                   --<cari_sektor_kodu, nvarchar(25),> \n" +
            ",''                                   --<cari_bolge_kodu, nvarchar(25),> \n" +
            ",''                                   --<cari_grup_kodu, nvarchar(25),> \n" +
            ",@TEMSILCI                            --<cari_temsilci_kodu, nvarchar(25),> \n" +
            ",''                                   --<cari_muhartikeli, nvarchar(10),> \n" +
            ",0                                    --<cari_firma_acik_kapal, bit,> \n" +
            ",0                                    --<cari_BUV_tabi_fl, bit,> \n" +
            ",0                                    --<cari_cari_kilitli_flg, bit,> \n" +
            ",0                                    --<cari_etiket_bas_fl, bit,> \n" +
            ",0                                    --<cari_Detay_incele_flg, bit,> \n" +
            ",0                                    --<cari_efatura_fl, bit,> \n" +
            ",0                                    --<cari_POS_ongpesyuzde, float,> \n" +
            ",0                                    --<cari_POS_ongtaksayi, float,> \n" +
            ",0                                    --<cari_POS_ongIskOran, float,> \n" +
            ",GETDATE()                            --<cari_kaydagiristarihi, datetime,> \n" +
            ",0                                    --<cari_KabEdFCekTutar, float,> \n" +
            ",0                                    --<cari_hal_caritip, tinyint,> \n" +
            ",0                                    --<cari_HalKomYuzdesi, float,> \n" +
            ",0                                    --<cari_TeslimSuresi, smallint,> \n" +
            ",''                                   --<cari_wwwadresi, nvarchar(30),> \n" +
            ",@EMAIL                               --<cari_EMail, nvarchar(127),> \n" +
            ",''                                   --<cari_CepTel, nvarchar(20),> \n" +
            ",0                                    --<cari_VarsayilanGirisDepo, int,> \n" +
            ",0                                    --<cari_VarsayilanCikisDepo, int,> \n" +
            ",0                                    --<cari_Portal_Enabled, bit,> \n" +
            ",''                                   --<cari_Portal_PW, nvarchar(127),> \n" +
            ",0                                    --<cari_BagliOrtaklisa_Firma, int,> \n" +
            ",''                                   --<cari_kampanyakodu, nvarchar(4),> \n" +
            ",0                                    --<cari_b_bakiye_degerlendirilmesin_fl, bit,> \n" +
            ",0                                    --<cari_a_bakiye_degerlendirilmesin_fl, bit,> \n" +
            ",0                                    --<cari_b_irsbakiye_degerlendirilmesin_fl, bit,> \n" +
            ",0                                    --<cari_a_irsbakiye_degerlendirilmesin_fl, bit,> \n" +
            ",0                                    --<cari_b_sipbakiye_degerlendirilmesin_fl, bit,> \n" +
            ",0                                    --<cari_a_sipbakiye_degerlendirilmesin_fl, bit,> \n" +
            ",''                                   --<cari_AvmBilgileri1KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri1TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri2KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri2TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri3KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri3TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri4KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri4TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri5KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri5TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri6KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri6TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri7KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri7TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri8KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri8TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri9KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri9TebligatSekli, tinyint,> \n" +
            ",''                                   --<cari_AvmBilgileri10KiraKodu, nvarchar(25),> \n" +
            ",0                                    --<cari_AvmBilgileri10TebligatSekli, tinyint,> \n" +
            ",0                                    --<cari_KrediRiskTakibiVar_flg, bit,> \n" +
            ",''                                   --<cari_ufrs_fark_muh_kod, nvarchar(40),> \n" +
            ",''                                   --<cari_ufrs_fark_muh_kod1, nvarchar(40),> \n" +
            ",''                                   --<cari_ufrs_fark_muh_kod2, nvarchar(40),> \n" +
            ",0                                    --<cari_odeme_sekli, tinyint,> \n" +
            ",910                                  --<cari_TeminatMekAlacakMuhKodu, nvarchar(40),> \n" +
            ",''                                   --<cari_TeminatMekAlacakMuhKodu1, nvarchar(40),> \n" +
            ",''                                   --<cari_TeminatMekAlacakMuhKodu2, nvarchar(40),> \n" +
            ",912                                  --<cari_TeminatMekBorcMuhKodu, nvarchar(40),> \n" +
            ",''                                   --<cari_TeminatMekBorcMuhKodu1, nvarchar(40),> \n" +
            ",''                                   --<cari_TeminatMekBorcMuhKodu2, nvarchar(40),> \n" +
            ",226                                  --<cari_VerilenDepozitoTeminatMuhKodu, nvarchar(40),> \n" +
            ",''                                   --<cari_VerilenDepozitoTeminatMuhKodu1, nvarchar(40),> \n" +
            ",''                                   --<cari_VerilenDepozitoTeminatMuhKodu2, nvarchar(40),> \n" +
            ",326                                  --<cari_AlinanDepozitoTeminatMuhKodu, nvarchar(40),> \n" +
            ",''                                   --<cari_AlinanDepozitoTeminatMuhKodu1, nvarchar(40),> \n" +
            ",''                                   --<cari_AlinanDepozitoTeminatMuhKodu2, nvarchar(40),> \n" +
            ",0                                    --<cari_def_efatura_cinsi, tinyint,> \n" +
            ",0                                    --<cari_otv_tevkifatina_tabii_fl, bit,> \n" +
            ",''                                   --<cari_KEP_adresi, nvarchar(80),> \n" +
            ",'18991231'                           --<cari_efatura_baslangic_tarihi, datetime,> \n" +
            ",''                                   --<cari_mutabakat_mail_adresi, nvarchar(80),> \n" +
            ",''                                   --<cari_mersis_no, nvarchar(25),> \n" +
            ",''                                   --<cari_istasyon_cari_kodu, nvarchar(25),> \n" +
            ",0                                    --<cari_gonderionayi_sms, bit,> \n" +
            ",0                                    --<cari_gonderionayi_email, bit,> \n" +
            ",0                                    --<cari_eirsaliye_fl, bit,> \n" +
            ",'18991231'                           --<cari_eirsaliye_baslangic_tarihi, datetime,> \n" +
            ",''                                   --<cari_vergidairekodu, nvarchar(10),> \n" +
            ",0                                    --<cari_CRM_sistemine_aktar_fl, bit,> \n" +
            ",''                                   --<cari_efatura_xslt_dosya, nvarchar(127),> \n" +
            ",''                                   --<cari_pasaport_no, nvarchar(20),> \n" +
            ",0                                    --<cari_kisi_kimlik_bilgisi_aciklama_turu, tinyint,> \n" +
            ",''                                   --<cari_kisi_kimlik_bilgisi_diger_aciklama, nvarchar(50),> \n" +
            ",''                                   --<cari_uts_kurum_no, nvarchar(15),> \n" +
            ",0                                    --<cari_kamu_kurumu_fl, bit,> \n" +
            ",''                                   --<cari_earsiv_xslt_dosya, nvarchar(127),> \n" +
            ",0                                    --<cari_Perakende_fl, bit,> \n" +
            ") " +
          "INSERT INTO [dbo].[CARI_HESAP_ADRESLERI] " +
          " ([adr_DBCno] " +
          " ,[adr_SpecRECno] " +
          " ,[adr_iptal] " +
          " ,[adr_fileid] " +
          " ,[adr_hidden] " +
          " ,[adr_kilitli] " +
          " ,[adr_degisti] " +
          " ,[adr_checksum] " +
          " ,[adr_create_user] " +
          " ,[adr_create_date] " +
          " ,[adr_lastup_user] " +
          " ,[adr_lastup_date] " +
          " ,[adr_special1] " +
          " ,[adr_special2] " +
          " ,[adr_special3] " +
          " ,[adr_cari_kod] " +
          " ,[adr_adres_no] " +
          " ,[adr_aprint_fl] " +
          " ,[adr_cadde] " +
          " ,[adr_mahalle] " +
          " ,[adr_sokak] " +
          " ,[adr_Semt] " +
          " ,[adr_Apt_No] " +
          " ,[adr_Daire_No] " +
          " ,[adr_posta_kodu] " +
          " ,[adr_ilce] " +
          " ,[adr_il] " +
          " ,[adr_ulke] " +
          " ,[adr_Adres_kodu] " +
          " ,[adr_tel_ulke_kodu] " +
          " ,[adr_tel_bolge_kodu] " +
          " ,[adr_tel_no1] " +
          " ,[adr_tel_no2] " +
          " ,[adr_tel_faxno] " +
          " ,[adr_tel_modem] " +
          " ,[adr_yon_kodu] " +
          " ,[adr_uzaklik_kodu] " +
          " ,[adr_temsilci_kodu] " +
          " ,[adr_ozel_not] " +
          " ,[adr_ziyaretperyodu] " +
          " ,[adr_ziyaretgunu] " +
          " ,[adr_gps_enlem] " +
          " ,[adr_gps_boylam] " +
          " ,[adr_ziyarethaftasi] " +
          " ,[adr_ziygunu2_1] " +
          " ,[adr_ziygunu2_2] " +
          " ,[adr_ziygunu2_3] " +
          " ,[adr_ziygunu2_4] " +
          " ,[adr_ziygunu2_5] " +
          " ,[adr_ziygunu2_6] " +
          " ,[adr_ziygunu2_7] " +
          " ,[adr_efatura_alias] " +
          " ,[adr_eirsaliye_alias]) " +
         "VALUES " + 
           "(0                                       --<adr_DBCno, smallint,> \n " + 
           ",0                                       --<adr_SpecRECno, int,> \n " + 
           ",0                                       --<adr_iptal, bit,> \n " + 
           ",32                                      --<adr_fileid, smallint,> \n " + 
           ",0                                       --<adr_hidden, bit,> \n " + 
           ",0                                       --<adr_kilitli, bit,> \n " + 
           ",0                                       --<adr_degisti, bit,> \n " + 
           ",0                                       --<adr_checksum, int,> \n " + 
           ",1                                       --<adr_create_user, smallint,> \n " + 
           ",GETDATE()                               --<adr_create_date, datetime,> \n " + 
           ",1                                       --<adr_lastup_user, smallint,> \n " + 
           ",GETDATE()                               --<adr_lastup_date, datetime,> \n " + 
           ",''                                      --<adr_special1, nvarchar(4),> \n " + 
           ",''                                      --<adr_special2, nvarchar(4),> \n " + 
           ",''                                      --<adr_special3, nvarchar(4),> \n " + 
           ",@CARIKOD1                               --<adr_cari_kod, nvarchar(25),> \n " + 
           ",1                                       --<adr_adres_no, int,> \n " + 
           ",0                                       --<adr_aprint_fl, bit,> \n " + 
           ",@ADRES1                                 --<adr_cadde, nvarchar(50),> \n " + 
           ",''                                      --<adr_mahalle, nvarchar(50),> \n " + 
           ",@ADRES2                                 --<adr_sokak, nvarchar(50),> \n " + 
           ",''                                      --<adr_Semt, nvarchar(25),> \n " + 
           ",''                                      --<adr_Apt_No, nvarchar(10),> \n " + 
           ",''                                      --<adr_Daire_No, nvarchar(10),> \n " + 
           ",''                                      --<adr_posta_kodu, nvarchar(8),> \n " + 
           ",@ILCE                                   --<adr_ilce, nvarchar(50),> \n " + 
           ",@IL                                     --<adr_il, nvarchar(50),> \n " + 
           ",''                                      --<adr_ulke, nvarchar(50),> \n " + 
           ",''                                      --<adr_Adres_kodu, nvarchar(10),> \n " + 
           ",''                                      --<adr_tel_ulke_kodu, nvarchar(5),> \n " + 
           ",''                                      --<adr_tel_bolge_kodu, nvarchar(5),> \n " + 
           ",@TELEFON                                --<adr_tel_no1, nvarchar(10),> \n " + 
           ",''                                      --<adr_tel_no2, nvarchar(10),> \n " + 
           ",''                                      --<adr_tel_faxno, nvarchar(10),> \n " + 
           ",''                                      --<adr_tel_modem, nvarchar(10),> \n " + 
           ",''                                      --<adr_yon_kodu, nvarchar(4),> \n " + 
           ",0                                       --<adr_uzaklik_kodu, smallint,> \n " + 
           ",''                                      --<adr_temsilci_kodu, nvarchar(25),> \n " + 
           ",''                                      --<adr_ozel_not, nvarchar(50),> \n " + 
           ",0                                       --<adr_ziyaretperyodu, tinyint,> \n " + 
           ",0                                       --<adr_ziyaretgunu, float,> \n " + 
           ",0                                       --<adr_gps_enlem, float,> \n " + 
           ",0                                       --<adr_gps_boylam, float,> \n " + 
           ",0                                       --<adr_ziyarethaftasi, tinyint,> \n " + 
           ",0                                       --<adr_ziygunu2_1, bit,> \n " + 
           ",0                                       --<adr_ziygunu2_2, bit,> \n " + 
           ",0                                       --<adr_ziygunu2_3, bit,> \n " + 
           ",0                                       --<adr_ziygunu2_4, bit,> \n " + 
           ",0                                       --<adr_ziygunu2_5, bit,> \n " + 
           ",0                                       --<adr_ziygunu2_6, bit,> \n " + 
           ",0                                       --<adr_ziygunu2_7, bit,> \n " + 
           ",''                                      --<adr_efatura_alias, nvarchar(120),> \n " + 
           ",''                                      --<adr_eirsaliye_alias, nvarchar(120),>\n" +
           " )",
        param : ['CARIKOD:string|25','CARIUNVAN1:string|127','CARIUNVAN2:string|127','CARITIP:int','DOVIZ:int','VDAIREADI:string|50','VDAIRENO:string|15','TEMSILCI:string|25','EMAIL:string|50','CARIKOD1:string|25','ADRES1:string|50','ADRES2:string|50','ILCE:string|50','IL:string|50','TELEFON:string|10']
    },
    //Etiket
    EtiketInsert :
    {  
        query : "INSERT INTO ETIKETBAS " +
                "([Etkb_DBCno], " +
                "[Etkb_SpecRECno], " + 
                "[Etkb_iptal], " +
                "[Etkb_fileid], " +
                "[Etkb_hidden], " + 
                "[Etkb_kilitli], " +
                "[Etkb_degisti], " +
                "[Etkb_checksum], " +
                "[Etkb_create_user], " +
                "[Etkb_create_date], " +
                "[Etkb_lastup_user], " +
                "[Etkb_lastup_date], " +
                "[Etkb_special1], " +
                "[Etkb_special2], " +
                "[Etkb_special3], " +
                "[Etkb_evrakno_seri], " +
                "[Etkb_evrakno_sira], " +
                "[Etkb_evrak_tarihi], " +
                "[Etkb_aciklama], " +
                "[Etkb_satirno], " +
                "[Etkb_belge_no], " +
                "[Etkb_belge_tarih], " +
                "[Etkb_EtiketTip], " +
                "[Etkb_BasimTipi], " +
                "[Etkb_BasimAdet], " +
                "[Etkb_DepoNo], " +
                "[Etkb_StokKodu], " +
                "[Etkb_RenkNo], " +
                "[Etkb_BedenNo], " +
                "[Etkb_Barkodu], " +
                "[Etkb_BasilacakMiktar] " +
                ") VALUES ( " + 
                "0					--<Etkb_DBCno, int,> \n" +
                ",0		 			--<Etkb_SpecRECno, int,> \n" +
                ",0                 --<Etkb_iptal, bit,> \n" +
                ",115                    --<Etkb_fileid, smallint,> \n" +
                ",0                  --<Etkb_hidden, bit,> \n" +
                ",0                  --<Etkb_kilitli, bit,> \n" +
                ",0                  --<Etkb_degisti, bit,> \n" +
                ",0                  --<Etkb_checksum, int,> \n" +
                ",@Etkb_create_user 			--<Etkb_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<Etkb_create_date, datetime,> \n" +
                ",@Etkb_lastup_user 				--<Etkb_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<Etkb_lastup_date, datetime,> \n" +
                ",@Etkb_special1		 			--<Etkb_special1, varchar(4),> \n" +
                ",''		 			--<Etkb_special2, varchar(4),> \n" +
                ",''		 			--<Etkb_special3, varchar(4),> \n" +
                ",@Etkb_evrakno_seri			--<Etkb_evrakno_seri, varchar(20),> \n" +
                ",@Etkb_evrakno_sira			--<Etkb_evrakno_sira, int,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)			--<Etkb_evrak_tarihi, int,> \n" +
                ",@Etkb_aciklama                            --<Etkb_aciklama, varchar(40),> \n" +
                ",(SELECT ISNULL(MAX(Etkb_satirno),-1) + 1 FROM ETIKETBAS WHERE Etkb_evrakno_seri = @Etkb_evrakno_seri AND Etkb_evrakno_sira = @Etkb_evrakno_sira)				                    --<Etkb_satirno, int,> \n" +
                ",@Etkb_belge_no                            --<Etkb_belge_no, varchar(50),> \n " +
                ",CONVERT(VARCHAR(10),GETDATE(),112)       --<Etkb_belge_tarih, datetime,> \n " +
                ",@Etkb_EtiketTip                            --<Etkb_EtiketTip, tinyint,> \n " +
                ",@Etkb_BasimTipi                           --<Etkb_BasimTipi, tinyint,> \n " +
                ",@Etkb_BasimAdet                            --<Etkb_BasimAdet, smallint,> \n " +
                ",@Etkb_DepoNo                              --<Etkb_DepoNo, bit> \n " +
                ",@Etkb_StokKodu                            --<Etkb_StokKodu, varchar(25),> \n " +
                ",@Etkb_RenkNo                              --<Etkb_RenkNo, int,> \n " +
                ",@Etkb_BedenNo                             --<Etkb_BedenNo, int,> \n" +
                ",@Etkb_Barkodu                             --<Etkb_Barkodu, varchar(50),> \n" +
                ",@Etkb_BasilacakMiktar                     --<Etkb_BasilacakMiktar smallint,> \n" + 
                ")",               
            param :['Etkb_create_user:int','Etkb_lastup_user:int','Etkb_special1:string|50','Etkb_evrakno_seri:string|50','Etkb_evrakno_sira:int','Etkb_aciklama:string|50',
                    'Etkb_belge_no:string|50','Etkb_EtiketTip:int','Etkb_BasimTipi:int','Etkb_BasimAdet:int','Etkb_DepoNo:int','Etkb_StokKodu:string|50','Etkb_RenkNo:int','Etkb_BedenNo:int',
                    'Etkb_Barkodu:string|50','Etkb_BasilacakMiktar:int']
    },
    EtiketGetir : 
    {
        query : "SELECT Etkb_evrakno_seri AS SERI, Etkb_evrakno_sira AS SIRA, Etkb_BasilacakMiktar AS BASIMMIKTAR, Etkb_StokKodu AS STOKKODU, Etkb_DepoNo AS DEPONO " +
                "FROM ETIKETBAS WHERE Etkb_evrakno_seri = @Etkb_evrakno_seri AND Etkb_evrakno_sira = @Etkb_evrakno_sira ",
        param : ['Etkb_evrakno_seri:string|50','Etkb_evrakno_sira:int']  
    },
    MaxEtiketSira : 
    {
        query : "SELECT ISNULL(MAX(Etkb_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM ETIKETBAS " +
                "WHERE Etkb_evrakno_seri=@Etkb_evrakno_seri",
        param : ['Etkb_evrakno_seri'],
        type : ['string|50']
    },
    //DepoSiparis
    DepoSiparisGetir :
    {
        query : "SELECT ssip_tutar AS TUTAR, ssip_b_fiyat AS FIYAT, ssip_miktar AS MIKTAR, " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=ssip_stok_kod),'') AS ADI , " +
                "ssip_stok_kod AS KODU, " +
                "ssip_birim_pntr AS BIRIM, " + 
                "ROW_NUMBER() OVER(ORDER BY ssip_Guid) AS NO, * " +
                "FROM DEPOLAR_ARASI_SIPARISLER " +
                "WHERE ssip_evrakno_seri=@ssip_evrakno_seri AND ssip_evrakno_sira=@ssip_evrakno_sira " +
                "ORDER BY ssip_satirno ",
        param : ['ssip_evrakno_seri','ssip_evrakno_sira'],
        type : ['string|25','int']
    },
    DepoSiparisInsert :
    {
        query : "DECLARE @UIDTABLE table([ssip_Guid] [uniqueidentifier]) " +
                "INSERT INTO [DEPOLAR_ARASI_SIPARISLER] " +
                "([ssip_DBCno] " +
                ",[ssip_SpecRECno] " +
                ",[ssip_iptal] " +
                ",[ssip_fileid] " +
                ",[ssip_hidden] " +
                ",[ssip_kilitli] " +
                ",[ssip_degisti] " +
                ",[ssip_checksum] " +
                ",[ssip_create_user] " +
                ",[ssip_create_date] " +
                ",[ssip_lastup_user] " +
                ",[ssip_lastup_date] " +
                ",[ssip_special1] " +
                ",[ssip_special2] " +
                ",[ssip_special3] " +
                ",[ssip_firmano] " +
                ",[ssip_subeno] " +
                ",[ssip_tarih] " +
                ",[ssip_teslim_tarih] " +
                ",[ssip_evrakno_seri] " +
                ",[ssip_evrakno_sira] " +
                ",[ssip_satirno] " +
                ",[ssip_belgeno] " +
                ",[ssip_belge_tarih] " +
                ",[ssip_stok_kod] " +
                ",[ssip_miktar] " +
                ",[ssip_b_fiyat] " +
                ",[ssip_tutar] " +
                ",[ssip_teslim_miktar] " +
                ",[ssip_aciklama] " +
                ",[ssip_girdepo] " +
                ",[ssip_cikdepo] " +
                ",[ssip_kapat_fl] " +
                ",[ssip_birim_pntr] " +
                ",[ssip_fiyat_liste_no] " +
                ",[ssip_stal_uid] " +
                ",[ssip_paket_kod] " +
                ",[ssip_kapatmanedenkod] " +
                ",[ssip_projekodu] " +
                ",[ssip_sormerkezi] " +
                ",[ssip_gecerlilik_tarihi] " +
                ",[ssip_rezervasyon_miktari] " +
                ",[ssip_rezerveden_teslim_edilen] " +
                ") " +
                "OUTPUT INSERTED.[ssip_Guid] INTO @UIDTABLE " +
                "VALUES " +
                "(0							--<ssip_DBCno, smallint,> \n" +
                ",0							--<ssip_SpecRECno, int,> \n" +
                ",0							--<ssip_iptal, bit,> \n" +
                ",86							--<ssip_fileid, smallint,> \n" +
                ",0							--<ssip_hidden, bit,> \n" +
                ",0							--<ssip_kilitli, bit,> \n" +
                ",0							--<ssip_degisti, bit,> \n" +
                ",0							--<ssip_checksum, int,> \n" +
                ",@ssip_create_user							--<ssip_create_user, smallint,> \n" +
                ",CONVERT(NVARCHAR(10),GETDATE(),112) 		--<ssip_create_date, datetime,> \n" +
                ",@ssip_lastup_user					--<ssip_lastup_user, smallint,> \n" +
                ",CONVERT(NVARCHAR(10),GETDATE(),112) 		--<ssip_lastup_date, datetime,> \n" +
                ",''							--<ssip_special1, varchar(4),> \n" +
                ",''							--<ssip_special2, varchar(4),> \n" +
                ",''							--<ssip_special3, varchar(4),> \n" +
                ",@ssip_firmano					--<ssip_firmano, int,> \n" +
                ",@ssip_subeno					--<ssip_subeno, int,> \n" +
                ",@ssip_tarih						--<ssip_tarih, datetime,> \n" +
                ",@ssip_teslim_tarih					--<ssip_teslim_tarih, datetime,> \n" +
                ",@ssip_evrakno_seri					--<ssip_evrakno_seri, varchar(4),> \n" +
                ",@ssip_evrakno_sira					--<ssip_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(ssip_satirno),-1) + 1 AS SATIRNO FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri = @ssip_evrakno_seri AND ssip_evrakno_sira = @ssip_evrakno_sira)	--<ssip_satirno, int,> \n" +
                ",@ssip_belgeno					--<ssip_belgeno, varchar(15),> \n" +
                ",@ssip_belge_tarih					--<ssip_belge_tarih, datetime,> \n" +
                ",@ssip_stok_kod					--<ssip_stok_kod, varchar(25),> \n" +
                ",@ssip_miktar					--<ssip_miktar, float,> \n" +
                ",@ssip_b_fiyat					--<ssip_b_fiyat, float,> \n" +
                ",@ssip_tutar						--<ssip_tutar, float,> \n" +
                ",@ssip_teslim_miktar					--<ssip_teslim_miktar, float,> \n" +
                ",''							--<ssip_aciklama, varchar(50),> \n" +
                ",@ssip_girdepo					--<ssip_girdepo, int,> \n" +
                ",@ssip_cikdepo					--<ssip_cikdepo, int,> \n" +
                ",0							--<ssip_kapat_fl, bit,> \n" +
                ",@ssip_birim_pntr					--<ssip_birim_pntr, tinyint,> \n" +
                ",@ssip_fiyat_liste_no				--<ssip_fiyat_liste_no, int,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)		--<ssip_stal_uid, smallint,> \n" +
                ",''							--<ssip_paket_kod, varchar(25),> \n" +
                ",''                           --<ssip_kapatmanedenkod, varchar(25),> \n" +
                ",''                          --<ssip_projekodu, varchar(25),> \n" +
                ",@ssip_sormerkezi                          --<ssip_sormerkezi, varchar(25),> \n" +
                ",''                          --<ssip_gecerlilik_tarihi, datetime,> \n" +
                ",0                           --<ssip_rezervasyon_miktari, float,> \n" +
                ",0                          --<ssip_rezerveden_teslim_edilen, float,> \n" +
                ") " +
                "SELECT [ssip_Guid] FROM @UIDTABLE ",
            param :['ssip_create_user:int','ssip_lastup_user:int','ssip_firmano:int','ssip_subeno:int','ssip_tarih:date','ssip_teslim_tarih:date','ssip_evrakno_seri:string|25',
                    'ssip_evrakno_sira:int','ssip_belgeno:string|25','ssip_belge_tarih:date','ssip_stok_kod:string|25','ssip_miktar:float','ssip_b_fiyat:float','ssip_tutar:float',
                    'ssip_teslim_miktar:float','ssip_girdepo:int','ssip_cikdepo:int','ssip_birim_pntr:int','ssip_fiyat_liste_no:int','ssip_sormerkezi:string|25']
    },
    DepoSiparisEvrakDelete :
    {
        query : "DELETE FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri=@ssip_evrakno_seri AND ssip_evrakno_sira=@ssip_evrakno_sira ",
        param : ['ssip_evrakno_seri:string|25','ssip_evrakno_sira:int']
    },
    DepoSiparisSatirDelete :
    {
        query : "DELETE FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_Guid=@ssip_Guid ",
        param : ['ssip_Guid:string|50']
    },
    DepoSiparisUpdate :
    {
        query : "UPDATE DEPOLAR_ARASI_SIPARISLER SET ssip_miktar=@ssip_miktar WHERE ssip_Guid = @ssip_Guid ",
        param :['ssip_miktar:float','ssip_Guid:string|50']
    },
    DepoSiparisMaxSira :
    {
        query : "SELECT ISNULL(MAX(ssip_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri=@ssip_evrakno_seri ",
        param :['ssip_evrakno_seri:string|25']
    },
    //UrunGirisCikis
    IsEmriGetir : 
    {
        query : "select is_Kod as KODU,is_Ismi AS ADI,CONVERT(NVARCHAR,is_BaslangicTarihi,104) AS TARIH FROM ISEMIRLERI WHERE is_EmriDurumu ='1' AND " +
        "((ISEMIRLERI.is_Kod LIKE @KODU + '%' ) OR (@KODU = '')) AND ((ISEMIRLERI.is_Ismi LIKE  @ADI + '%' ) OR (@ADI = ''))",
        param : ['KODU','ADI'],
        type : ['string|25','string|127']
    }, 
    //Konsinye Hareket
    KonsinyeHarInsert :
    {
       query : "INSERT INTO [dbo].[KONSINYE_HAREKETLERI] " +
       "([kon_Guid]" + 
       ",[kon_DBCno] " +                                                                       
       ",[kon_SpecRecno] " +                                                                       
       ",[kon_iptal] " +                                                                       
       ",[kon_fileid] " +                                                                       
       ",[kon_hidden] " +                                                                       
       ",[kon_kilitli] " +                                                                       
       ",[kon_degisti] " +                                                                       
       ",[kon_checksum] " +                                                                       
       ",[kon_create_user] " +                                                                       
       ",[kon_create_date] " +                                                                       
       ",[kon_lastup_user] " +                                                                       
       ",[kon_lastup_date] " +                                                                       
       ",[kon_special1] " +                                                                       
       ",[kon_special2] " +                                                                       
       ",[kon_special3] " +                                                                       
       ",[kon_firmano] " +                                                                       
       ",[kon_subeno] " +                                                                       
       ",[kon_tarih] " +                                                                       
       ",[kon_tip] " +                                                                       
       ",[kon_normal_iade] " +                                                                                            
       ",[kon_evrakno_seri] " +                                                                                            
       ",[kon_evrakno_sira] " +                                                 
       ",[kon_satirno] " +                                                 
       ",[kon_belge_no] " +                                                 
       ",[kon_belge_tarih] " +                                                 
       ",[kon_stok_kod] " +                                                 
       ",[kon_cari_kod] " +                                                 
       ",[kon_satici_kod] " +                                                 
       ",[kon_miktar] " +                                                 
       ",[kon_faturalanan] " +                                                 
       ",[kon_aciklama] " +                                                 
       ",[kon_giris_depo_no] " +                                                 
       ",[kon_cikis_depo_no] " +                                                 
       ",[kon_malkabul_tarih] " +                                                 
       ",[kon_sip_uid] " +                                                 
       ",[kon_islemgoren] " +                                                 
       ",[kon_karkon_uid] " +                                                 
       ",[kon_netagirlik] " +                                                 
       ",[kon_brutagirlik] " +                                                 
       ",[kon_rehinmiktari] " +                                                 
       ",[kon_rehinfiyati] " +                                                 
       ",[kon_miktar2] " +                                                 
       ",[kon_islemgoren2] " +                                                 
       ",[kon_sandikmiktari] " +                                                 
       ",[kon_sandikfiyati] " +                                                 
       ",[kon_sevk_adresno] " +                                                 
       ",[kon_cari_srm_merkez] " +                                                 
       ",[kon_stok_srm_merkez] " +                                                 
       ",[kons_parti_kodu] " +                                                 
       ",[kons_lot_no] " +                                                 
       ",[kons_projekodu] " +                                                 
       ",[kons_har_doviz_cinsi] " +                                                 
       ",[kons_har_doviz_kuru] " +                                                 
       ",[kons_alt_doviz_kuru] " +                                                 
       ",[kons_stok_doviz_cinsi] " +                                                 
       ",[kons_stok_doviz_kuru] " +                                                 
       ",[kons_odeme_op] " +                                                 
       ",[kons_birim_pntr] " +                                                 
       ",[kons_tutar] " +                                                 
       ",[kons_isk_mas1] " +                                                 
       ",[kons_isk_mas2] " +                                                 
       ",[kons_isk_mas3] " +                                                 
       ",[kons_isk_mas4] " +                                                 
       ",[kons_isk_mas5] " +                                                 
       ",[kons_isk_mas6] " +                                                 
       ",[kons_isk_mas7] " +                                                 
       ",[kons_isk_mas8] " +                                                 
       ",[kons_isk_mas9] " +                                                 
       ",[kons_isk_mas10] " +                                                 
       ",[kons_sat_iskmas1] " +                                                 
       ",[kons_sat_iskmas2] " +                                                 
       ",[kons_sat_iskmas3] " +                                                 
       ",[kons_sat_iskmas4] " +                                                 
       ",[kons_sat_iskmas5] " +                                                 
       ",[kons_sat_iskmas6] " +                                                 
       ",[kons_sat_iskmas7] " +                                                 
       ",[kons_sat_iskmas8] " +                                                 
       ",[kons_sat_iskmas9] " +                                                 
       ",[kons_sat_iskmas10] " +                                                 
       ",[kons_iskonto1] " +                                                 
       ",[kons_iskonto2] " +                                                 
       ",[kons_iskonto3] " +                                                 
       ",[kons_iskonto4] " +                                                 
       ",[kons_iskonto5] " +                                                 
       ",[kons_iskonto6] " +                                                 
       ",[kons_masraf1] " +                                                 
       ",[kons_masraf2] " +                                                 
       ",[kons_masraf3] " +                                                 
       ",[kons_masraf4] " +                                                 
       ",[kons_vergi_pntr] " +                                                 
       ",[kons_vergi] " +                                                 
       ",[kons_masraf_vergi_pntr] " +                                                 
       ",[kons_masraf_vergi] " +                                                 
       ",[kons_vergisiz_fl] " +                                                 
       ",[kons_otv_pntr] " +                                                 
       ",[kons_otv_vergi] " +                                                 
       ",[kons_otvtutari] " +                                                 
       ",[kons_otvvergisiz_fl] " +                                                 
       ",[kons_oiv_pntr] " +                                                 
       ",[kons_oiv_vergi] " +                                                 
       ",[kons_oivvergisiz_fl] " +                                                 
       ",[kons_fiyat_liste_no] " +                                                 
       ",[kon_cins] " +                                                 
       ",[kon_evraktip] " +                                                 
       ",[kon_gider_kodu] " +                                                 
       ",[kons_oivtutari] " +                                                 
       ",[kon_irs_uid] " +                                                 
       ",[kon_yetkili_uid] " +                                                 
       ",[kon_nakliyedeposu] " +                                                 
       ",[kon_nakliyedurumu] " +     
       ",[kon_kunye_no] " +
       ",[kon_eirs_senaryo] " +
       ",[kon_eirs_tipi] " +
       ",[kon_teslim_tarihi] " +
       ",[kon_matbu_fl]) " +                                           
       "VALUES " +
       "(newid()                    --<kon_Guid, uniqueidentifier,>  \n " +
       ",0                          --<kon_DBCno, smallint,> \n" +
       ",0	                        --<kon_SpecRecno, int,> \n" +
       ",0	                        --<kon_iptal, bit,> \n" +
       ",46                         --<kon_fileid, smallint,> \n" +
       ",0	                        --<kon_hidden, bit,> \n" +
       ",0	                        --<kon_kilitli, bit,> \n" +
       ",0	                        --<kon_degisti, bit,> \n" +
       ",0	                        --<kon_checksum, int,> \n" +
       ",@kon_create_user	        --<kon_create_user, smallint,> \n" +
       ",GETDATE()	                --<kon_create_date, datetime,> \n" +
       ",@kon_lastup_user	        --<kon_lastup_user, smallint,> \n" +
       ",GETDATE()              	--<kon_lastup_date, datetime,> \n" +
       ",''	                        --<kon_special1, nvarchar(4),> \n" +
       ",''	                        --<kon_special2, nvarchar(4),> \n" +
       ",''	                        --<kon_special3, nvarchar(4),> \n" +
       ",@kon_firmano	            --<kon_firmano, int,> \n" +
       ",@kon_subeno		        --<kon_subeno, int,> \n" +
       ",@kon_tarih	                --<kon_tarih, datetime,> \n" +
       ",@kon_tip	                --<kon_tip, tinyint,> \n" +
       ",@kon_normal_iade	        --<kon_normal_iade, tinyint,> \n" +
       ",@kon_evrakno_seri	        --<kon_evrakno_seri, [dbo].[evrakseri_str],> \n" +
       ",@kon_evrakno_sira	        --<kon_evrakno_sira, int,> \n" +
       ",(SELECT ISNULL(MAX(kon_satirno),-1) + 1 AS SATIRNO FROM KONSINYE_HAREKETLERI WHERE kon_evrakno_seri = @kon_evrakno_seri AND kon_evrakno_sira = @kon_evrakno_sira and kon_evraktip = @kon_evraktip)  --<kon_satirno, int,> \n" +
       ",@kon_belge_no	            --<kon_belge_no, [dbo].[belgeno_str],> \n" +
       ",@kon_belge_tarih	        --<kon_belge_tarih, datetime,> \n" +
       ",@kon_stok_kod	            --<kon_stok_kod, nvarchar(25),> \n" +
       ",@kon_cari_kod	            --<kon_cari_kod, nvarchar(25),> \n" +
       ",@kon_satici_kod	        --<kon_satici_kod, nvarchar(25),> \n" +
       ",@kon_miktar		        --<kon_miktar, float,> \n" +
       ",0	                        --<kon_faturalanan, float,> \n" +
       ",@kon_aciklama	            --<kon_aciklama, nvarchar(50),> \n" +
       ",@kon_giris_depo_no 		--<kon_giris_depo_no, int,> \n" +
       ",@kon_cikis_depo_no		    --<kon_cikis_depo_no, int,> \n" +
       ",GETDATE()              	--<kon_malkabul_tarih, datetime,> \n" +
       ",'00000000-0000-0000-0000-000000000000'                          --<kon_sip_uid, uniqueidentifier,> \n" +
       ",0	                        --<kon_islemgoren, float,> \n" +
       ",'00000000-0000-0000-0000-000000000000'	                        --<kon_karkon_uid, uniqueidentifier,> \n" +
       ",0	                        --<kon_netagirlik, float,> \n" +
       ",0	                        --<kon_brutagirlik, float,> \n" +
       ",0	                        --<kon_rehinmiktari, float,> \n" +
       ",0	                        --<kon_rehinfiyati, float,> \n" +
       ",@kon_miktar2	            --<kon_miktar2, float,> \n" +
       ",0	                        --<kon_islemgoren2, float,> \n" +
       ",0	                        --<kon_sandikmiktari, float,> \n" +
       ",0	                        --<kon_sandikfiyati, float,> \n" +
       ",@kon_sevk_adresno	        --<kon_sevk_adresno, smallint,> \n" +
       ",@kon_cari_srm_merkez	    --<kon_cari_srm_merkez, nvarchar(25),> \n" +
       ",@kon_stok_srm_merkez	    --<kon_stok_srm_merkez, nvarchar(25),> \n" +
       ",''	                        --<kons_parti_kodu, nvarchar(25),> \n" +
       ",0	                        --<kons_lot_no, int,> \n" +
       ",@kons_projekodu 	        --<kons_projekodu, nvarchar(25),> \n" +
       ",@kons_har_doviz_cinsi	    --<kons_har_doviz_cinsi, tinyint,> \n" +
       ",@kons_har_doviz_kuru       --<kons_har_doviz_kuru, float,> \n" +
       ",@kons_alt_doviz_kuru       --<kons_alt_doviz_kuru, float,> \n" +
       ",@kons_stok_doviz_cinsi     --<kons_stok_doviz_cinsi, tinyint,> \n" +
       ",@kons_stok_doviz_kuru      --<kons_stok_doviz_kuru, float,> \n" +
       ",0	                        --<kons_odeme_op, int,> \n" +
       ",@kons_birim_pntr           --<kons_birim_pntr, tinyint,> \n" +
       ",@kons_tutar	            --<kons_tutar, float,> \n" +
       ",0	                        --<kons_isk_mas1, tinyint,> \n" +
       ",0	                        --<kons_isk_mas2, tinyint,> \n" +
       ",0	                        --<kons_isk_mas3, tinyint,> \n" +
       ",0	                        --<kons_isk_mas4, tinyint,> \n" +
       ",0	                        --<kons_isk_mas5, tinyint,> \n" +
       ",0	                        --<kons_isk_mas6, tinyint,> \n" +
       ",0	                        --<kons_isk_mas7, tinyint,> \n" +
       ",0	                        --<kons_isk_mas8, tinyint,> \n" +
       ",0	                        --<kons_isk_mas9, tinyint,> \n" +
       ",0	                        --<kons_isk_mas10, tinyint,> \n" +
       ",0	                        --<kons_sat_iskmas1, bit,> \n" +
       ",0	                        --<kons_sat_iskmas2, bit,> \n" +
       ",0	                        --<kons_sat_iskmas3, bit,> \n" +
       ",0	                        --<kons_sat_iskmas4, bit,> \n" +
       ",0	                        --<kons_sat_iskmas5, bit,> \n" +
       ",0	                        --<kons_sat_iskmas6, bit,> \n" +
       ",0	                        --<kons_sat_iskmas7, bit,> \n" +
       ",0	                        --<kons_sat_iskmas8, bit,> \n" +
       ",0	                        --<kons_sat_iskmas9, bit,> \n" +
       ",0	                        --<kons_sat_iskmas10, bit,> \n" +
       ",@kons_iskonto1	            --<kons_iskonto1, float,> \n" +
       ",@kons_iskonto2	            --<kons_iskonto2, float,> \n" +
       ",@kons_iskonto3	            --<kons_iskonto3, float,> \n" +
       ",@kons_iskonto4	            --<kons_iskonto4, float,> \n" +
       ",@kons_iskonto5	            --<kons_iskonto5, float,> \n" +
       ",@kons_iskonto6		        --<kons_iskonto6, float,> \n" +
       ",0	                        --<kons_masraf1, float,> \n" +
       ",0	                        --<kons_masraf2, float,> \n" +
       ",0	                        --<kons_masraf3, float,> \n" +
       ",0	                        --<kons_masraf4, float,> \n" +
       ",@kons_vergi_pntr	        --<kons_vergi_pntr, tinyint,> \n" +
       ",@kons_vergi	            --<kons_vergi, float,> \n" +
       ",0	                        --<kons_masraf_vergi_pntr, tinyint,> \n" +
       ",0	                        --<kons_masraf_vergi, float,> \n" +
       ",0	                        --<kons_vergisiz_fl, bit,> \n" +
       ",0	                        --<kons_otv_pntr, tinyint,> \n" +
       ",0	                        --<kons_otv_vergi, float,> \n" +
       ",0	                        --<kons_otvtutari, float,> \n" +
       ",0	                        --<kons_otvvergisiz_fl, bit,> \n" +
       ",0	                        --<kons_oiv_pntr, tinyint,> \n" +
       ",0	                        --<kons_oiv_vergi, float,> \n" +
       ",0	                        --<kons_oivvergisiz_fl, bit,> \n" +
       ",1	                        --<kons_fiyat_liste_no, int,> \n" +
       ",@kon_cins                  --<kon_cins, tinyint,> \n" +
       ",@kon_evraktip	            --<kon_evraktip, tinyint,> \n" +
       ",''	                        --<kon_gider_kodu, nvarchar(25),> \n" +
       ",0	                        --<kons_oivtutari, float,> \n" +
       ",'00000000-0000-0000-0000-000000000000'	                        --<kon_irs_uid, uniqueidentifier,> \n" +
       ",'00000000-0000-0000-0000-000000000000'	                        --<kon_yetkili_uid, uniqueidentifier,> \n" +
       ",0	                        --<kon_nakliyedeposu, int,> \n" +
       ",0	                        --<kon_nakliyedurumu, tinyint,> \n" +
       ",0                          --<kon_kunye_no, nvarchar(50),>  \n" +
       ",0                          --<kon_eirs_senaryo, tinyint,> \n" +
       ",0                          --<kon_eirs_tipi, tinyint,> \n" +
       ",GETDATE()                  --<kon_teslim_tarihi, datetime,> \n" +
       ",0                          --<kon_matbu_fl, bit,> \n" +
       ") ",
       param : ['kon_create_user:int','kon_lastup_user:int','kon_firmano:int','kon_subeno:int','kon_tarih:date','kon_tip:int','kon_normal_iade:int',
        'kon_evrakno_seri:string|25','kon_evrakno_sira:int','kon_belge_no:string|25','kon_belge_tarih:date','kon_stok_kod:string|25',
        'kon_cari_kod:string|25','kon_satici_kod:string|25','kon_miktar:float','kon_aciklama:string|25','kon_giris_depo_no:int','kon_cikis_depo_no:int',
        'kon_miktar2:float','kon_sevk_adresno:int','kon_cari_srm_merkez:string|25','kon_stok_srm_merkez:string|25','kons_projekodu:string|25','kons_har_doviz_cinsi:int','kons_har_doviz_kuru:float',
        'kons_alt_doviz_kuru:float','kons_stok_doviz_cinsi:int','kons_stok_doviz_kuru:float','kons_birim_pntr:int','kons_tutar:float','kons_iskonto1:float','kons_iskonto2:float','kons_iskonto3:float','kons_iskonto4:float','kons_iskonto5:float','kons_iskonto6:float','kons_vergi_pntr:int','kons_vergi:float','kon_cins:int','kon_evraktip:int']
    },
    KonsinyeHarGetir : 
    {
        query:  "SELECT CONVERT(VARCHAR(10),GETDATE(),112) AS kon_kur_tarihi ,  " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=kon_stok_kod),'') AS ADI ,  " +
                "CASE WHEN kons_tutar <> 0 AND kon_miktar <> 0 THEN ROUND((kons_tutar / kon_miktar),2) ELSE 0 END AS FIYAT,  " +
                "(select cari_unvan1 from CARI_HESAPLAR WHERE cari_kod=kon_cari_kod) AS CARIADI,  " +
                "(select som_isim from SORUMLULUK_MERKEZLERI where som_kod=kon_stok_srm_merkez) AS SORUMLUMERADI,  " +
                "(select cari_per_adi from CARI_PERSONEL_TANIMLARI where cari_per_kod=kon_satici_kod) AS PERSONELADI, " +
                "kon_miktar AS MIKTAR ,  " +
                "kon_miktar2 AS MIKTAR2 ,  " +
                "ROUND(kons_tutar,2) AS TUTAR,   " +
                "CASE WHEN kons_iskonto1 <> 0 AND kons_tutar <> 0 THEN (100 * kons_iskonto1) / kons_tutar ELSE 0 END AS ISKYUZDE ,  " +
                "(SELECT dbo.fn_StokBirimi(kon_stok_kod,kons_birim_pntr)) AS BIRIMADI,  " +
                "(SELECT dbo.fn_StokBirimHesapla(kon_stok_kod,1,kon_miktar,kons_birim_pntr)) AS BIRIM, " +
                "ISNULL((SELECT sto_birim1_ad as ADET FROM STOKLAR WHERE sto_kod = kon_stok_kod),'') AS BIRIM1,  " +
                "ROW_NUMBER() OVER(ORDER BY kon_Guid) AS NO,  " +
                "(SELECT dbo.fn_VergiYuzde (kons_vergi_pntr)) AS TOPTANVERGI,  " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = kon_Guid AND BdnHar_Tipi = 11),0) AS RENKPNTR ,  " +
                "ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = kon_Guid AND BdnHar_Tipi = 11),0) AS BEDENPNTR ,  " +
                "ISNULL((SELECT TOP 1 BdnHar_Guid FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = kon_Guid AND BdnHar_Tipi = 11),'00000000-0000-0000-0000-000000000000') AS BEDENGUID ,  " +
                "(SELECT dbo.fn_renk_kirilimi(ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = kon_Guid AND BdnHar_Tipi = 11),0),(SELECT TOP 1 sto_renk_kodu FROM STOKLAR WHERE sto_kod = kon_stok_kod))) AS RENK , " +
                "(SELECT dbo.fn_beden_kirilimi(ISNULL((SELECT TOP 1 (SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)) FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = kon_Guid AND BdnHar_Tipi = 11),0),(SELECT TOP 1 sto_beden_kodu FROM STOKLAR WHERE sto_kod = kon_stok_kod))) AS BEDEN , " +
                "ISNULL((SELECT sip_evrakno_seri from SIPARISLER WHERE sip_Guid = kon_sip_uid),'') AS SIPSERI , " +
                "ISNULL((SELECT sip_evrakno_sira from SIPARISLER WHERE sip_Guid = kon_sip_uid),0) AS SIPSIRA , " +
                "* FROM KONSINYE_HAREKETLERI " +
                "WHERE kon_evrakno_seri=@kon_evrakno_seri AND kon_evrakno_sira=@kon_evrakno_sira AND kon_evraktip=@kon_evraktip ORDER BY kon_satirno " ,
        param:   ['kon_evrakno_seri','kon_evrakno_sira','kon_evraktip'],
        type:    ['string|20','int','int']
    },
    KonsinyeHarUpdate:
    {
        query:  "UPDATE KONSINYE_HAREKETLERI " +
        "SET kon_miktar= @kon_miktar " +
        ",kon_miktar2= @kon_miktar2   " +
        ",kons_tutar= @kons_tutar " +
        ",kons_vergi= (@kons_tutar - (@kons_iskonto1 + @kons_iskonto2 + @kons_iskonto3 + @kons_iskonto4 + @kons_iskonto5)) *  (SELECT [dbo].[fn_VergiYuzde] (@kons_vergi_pntr) / 100) " +
        ",kons_iskonto1= @kons_iskonto1 " +
        ",kons_iskonto2= @kons_iskonto2 " +
        ",kons_iskonto3= @kons_iskonto3 " +
        ",kons_iskonto4= @kons_iskonto4 " +
        ",kons_iskonto5= @kons_iskonto5 " +
        ",kons_iskonto6= @kons_iskonto6 " +
        ",kons_sat_iskmas1= @kons_sat_iskmas1 " +
        ",kons_sat_iskmas2= @kons_sat_iskmas2 " +
        ",kons_sat_iskmas3= @kons_sat_iskmas3 " +
        ",kons_sat_iskmas4= @kons_sat_iskmas4 " +
        ",kons_sat_iskmas5= @kons_sat_iskmas5 " +
        ",kons_sat_iskmas6= @kons_sat_iskmas6 " +
        "WHERE  kon_Guid = @kon_Guid",
        param : ['kon_miktar:float','kon_miktar2:float','kons_tutar:float','kons_vergi_pntr:int','kons_iskonto1:float','kons_iskonto2:float','kons_iskonto3:float',
        'kons_iskonto4:float','kons_iskonto5:float','kons_iskonto6:float','kons_sat_iskmas1:bit','kons_sat_iskmas2:bit','kons_sat_iskmas3:bit','kons_sat_iskmas4:bit',
        'kons_sat_iskmas5:bit','kons_sat_iskmas6:bit','kon_Guid:string|50']
    },
    KonsHarEvrDelete : 
    {
        query : "DELETE FROM KONSINYE_HAREKETLERI WHERE kon_evrakno_seri = @kon_evrakno_seri AND " +
                "kon_evrakno_sira = @kon_evrakno_sira AND kon_evraktip = @kon_evraktip" ,
        param : ['kon_evrakno_seri','kon_evrakno_sira','kon_evraktip'],
        type : ['string|20','int','int']
    },
    MaxKonsinyeHarSira :
    {
        query: "SELECT ISNULL(MAX(kon_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM KONSINYE_HAREKETLERI " +
                "WHERE kon_evrakno_seri = @kon_evrakno_seri AND kon_evraktip = @kon_evraktip " ,
        param : ['kon_evrakno_seri','kon_evraktip'],
        type : ['string|25','int']
    },
    KonsHarSatirDelete : 
    {
        query : "DELETE FROM KONSINYE_HAREKETLERI WHERE kon_Guid = @kon_Guid ",
        param : ['kon_Guid'],
        type : ['string|50']
    },
    KonsBedenHarGetir:
    {
        query:  "SELECT * FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid IN ((SELECT kon_Guid FROM KONSINYE_HAREKETLERI WHERE kon_evrakno_seri = @kon_evrakno_seri AND kon_evrakno_sira = @kon_evrakno_sira AND kon_evraktip = @kon_evraktip)) AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['kon_evrakno_seri','kon_evrakno_sira','kon_evraktip','BdnHar_Tipi'],
        type:   ['string|20','int','int','int']
    }
}