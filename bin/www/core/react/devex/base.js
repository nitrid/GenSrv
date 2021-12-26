import React from 'react';
import CustomStore from 'devextreme/data/custom_store';
import { datatable } from '../../core.js';

export default class NdBase extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            data : typeof props.data == 'undefined' ? undefined : props.data
        }
        
        // GÖRÜNÜR DURUMU. YETKİLENDİRME.
        if(typeof this.props.access != 'undefined' && typeof this.props.access.getValue().visible != 'undefined')
        {   
            this.state.visible = this.props.access.getValue().visible
        }
        else
        {
            this.state.visible = true;
        }
        // EDİT EDİLEBİLİRLİK DURUMU. YETKİLENDİRME.
        if(typeof this.props.access != 'undefined' && typeof this.props.access.getValue().editable != 'undefined')
        {
            this.state.editable = this.props.access.getValue().editable ? false : true
        }
        else
        {
            this.state.editable = typeof this.props.editable != 'undefined' ? this.props.editable : false;
        }

        if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
        {
            this.props.parent[this.props.id] = this
        }
        // DATATABLE DEĞİŞTİĞİNDE YA DA YENİ SATIR EKLENDİĞİNDE BU DEĞİŞİKLİK ELEMENT E YANSITILIYOR.                
        if(typeof this.props.dt != 'undefined' && typeof this.props.dt.data != 'undefined' && typeof this.props.dt.field != 'undefined')
        {            
            this.props.dt.data.on('onEdit',(e) =>
            {                                
                if(Object.keys(e.data)[0] == this.props.dt.field)
                {
                    if(typeof this.props.dt.filter == 'undefined')
                    {
                        this.value = e.data[Object.keys(e.data)[0]]
                    }   
                    else
                    {   
                        let tmpD = []                                   

                        if(Array.isArray(e.rowData))          
                        {
                            tmpD = e.rowData;
                        }
                        else
                        {
                            tmpD.push({...e.rowData})
                        }

                        tmpD = tmpD.find(x => x[Object.keys(this.props.dt.filter)[0]] === Object.values(this.props.dt.filter)[0]);
                        
                        if(typeof tmpD != 'undefined')
                        {
                            this.value = tmpD[this.props.dt.field] 
                        }
                    }
                }
            });
            this.props.dt.data.on('onNew',(e) =>
            {           
                if(typeof Object.keys(e).find(x => x === this.props.dt.field) != 'undefined')
                {  
                    if(typeof this.props.dt.filter == 'undefined')
                    {
                        this.value = e[this.props.dt.field] 
                    }   
                    else
                    {
                        let tmpD = []
                        if(Array.isArray(e))          
                        {
                            tmpD = e;
                        }
                        else
                        {
                            tmpD.push({...e})
                        }
                        
                        tmpD = tmpD.find(x => x[Object.keys(this.props.dt.filter)[0]] === Object.values(this.props.dt.filter)[0]);
                        if(typeof tmpD != 'undefined')
                        {
                            this.value = tmpD[this.props.dt.field] 
                        }
                    }
                }
            });
            this.props.dt.data.on('onRefresh',() =>
            {
                if(this.props.dt.data.length > 0)
                {                 
                    if(typeof this.props.dt.filter == 'undefined')
                    {
                        this.value = this.props.dt.data[0][this.props.dt.field]
                    }   
                    else
                    {
                        this.value = this.props.dt.data.where(this.props.dt.filter)[0][this.props.dt.field]
                    }
                }
            });
        }
    }
    get data()
    {
        if(typeof this.state.data == 'undefined')
        {
            return undefined;
        }

        return this.state.data;
    }
    dataRefresh(e)
    {  
        return new Promise(mresolve => 
        {
            let tmpThis = this;            
            this.setState(
            { 
                data : 
                {
                    source : typeof tmpThis.data == 'undefined' || typeof tmpThis.data.source == 'undefined' ? undefined : tmpThis.data.source,
                    datatable : typeof tmpThis.data == 'undefined' || typeof tmpThis.data.datatable == 'undefined' ? undefined : tmpThis.data.datatable,
                    store : new CustomStore(
                    {
                        load: () =>
                        {  
                            return new Promise(async resolve => 
                            {      
                                // EĞER FONKSİYONA PARAMETRE GÖNDERİLMEMİŞ İSE VE STATE DEĞİŞKENİNDE DAHA ÖNCEDEN ATANMIŞ DATA SOURCE VARSA GRİD REFRESH EDİLİYOR.
                                if(typeof e == 'undefined' && typeof tmpThis.state.data != 'undefined' && typeof tmpThis.state.data.source != 'undefined')
                                {
                                    e = 
                                    {
                                        source : tmpThis.state.data.source
                                    }
                                }
                                // EĞER DATA SOURCE A DİZİ GÖNDERİLMİŞ İSE
                                if(typeof e != 'undefined' && typeof e.source != 'undefined' && Array.isArray(e.source))
                                {
                                    tmpThis.state.data.source = e.source;
                                    tmpThis.state.data.datatable = new datatable();
                                    tmpThis.state.data.datatable.import(e.source)
                                }
                                // EĞER DATA SOURCE A DATATABLE GÖNDERİLMİŞ İSE
                                else if (typeof e != 'undefined' && typeof e.source != 'undefined' && e.source instanceof datatable)
                                {
                                    tmpThis.state.data.source = e.source;
                                    tmpThis.state.data.datatable = e.source;                                    
                                    //await tmpThis.state.data.datatable.refresh();    
                                }
                                // EĞER DATA SOURCE A QUERY SET GÖNDERİLMİŞ İSE
                                else if (typeof e != 'undefined' && typeof e.source != 'undefined' && typeof e.source == 'object' && typeof e.source.sql != 'undefined' && typeof e.source.select != 'undefined')
                                {                
                                    tmpThis.state.data.source = e.source;
                                    tmpThis.state.data.datatable = new datatable();
                                    tmpThis.state.data.datatable.sql = e.source.sql
                                    tmpThis.state.data.datatable.selectCmd = e.source.select;
                                    tmpThis.state.data.datatable.insertCmd = e.source.insert;
                                    tmpThis.state.data.datatable.updateCmd = e.source.update;
                                    tmpThis.state.data.datatable.deleteCmd = e.source.delete;

                                    await tmpThis.state.data.datatable.refresh()
                                }                                
                                if(typeof tmpThis.state.data != 'undefined' && typeof tmpThis.state.data.datatable != 'undefined')
                                {
                                    //GROUP BY İÇİN YAPILDI
                                    if(!e.source instanceof datatable && typeof e.source.groupBy != 'undefined' && e.source.groupBy.length > 0)
                                    {
                                        let tmpDt = new datatable()
                                        tmpDt.import(tmpThis.state.data.datatable.toArray())
                                        
                                        tmpDt = tmpDt.groupBy(e.source.groupBy) 

                                        resolve({data: tmpDt.toArray(),totalCount:tmpDt.toArray().length});
                                    }
                                    else
                                    {
                                        resolve({data: tmpThis.state.data.datatable.toArray(),totalCount:tmpThis.state.data.datatable.toArray().length});
                                    }

                                    mresolve()
                                }
                                else
                                {
                                    resolve({data: [],totalCount:0});
                                    mresolve()
                                }
                            });
                        },
                        insert: (values) => 
                        {
                            return new Promise(async resolve => 
                            {
                                if(typeof tmpThis.state.data != 'undefined' && typeof tmpThis.state.data.datatable != 'undefined')
                                {
                                    tmpThis.state.data.datatable.push(values)

                                    if(typeof tmpThis.props.dbApply == 'undefined' || tmpThis.props.dbApply)
                                    {
                                        await this.state.data.datatable.insert();
                                    }
                                }
                                resolve()                                
                            });
                        },
                        update: (key, values) => 
                        {                            
                            return new Promise(async resolve => 
                            {
                                if(typeof this.state.data != 'undefined' && typeof this.state.data.datatable != 'undefined')
                                {
                                    for (let i = 0; i < Object.keys(values).length; i++) 
                                    {
                                        this.state.data.datatable.find(x => x === key)[Object.keys(values)[i]] = values[Object.keys(values)[i]]
                                    }                                    
                                }
                                
                                if(typeof this.props.dbApply == 'undefined' || this.props.dbApply)
                                {
                                    await this.state.data.datatable.update();
                                }
                                
                                resolve()                                
                            });
                        },
                        remove: (key) => 
                        {
                            return new Promise(async resolve => 
                            {
                                if(typeof tmpThis.state.data != 'undefined' && typeof tmpThis.state.data.datatable != 'undefined')
                                {
                                    tmpThis.state.data.datatable.removeAt(key)
                                }

                                if(typeof tmpThis.props.dbApply == 'undefined' || tmpThis.props.dbApply)
                                {
                                    await this.state.data.datatable.delete();
                                }
                                
                                resolve()                                
                            });
                        },
                        onInserted: function (values,key) 
                        {
                            if(typeof tmpThis.props.data.onInserted != 'undefined')
                            {
                                tmpThis.props.data.onInserted(values,key)
                            }
                        },
                        onInserting: function (values,key) 
                        {
                            if(typeof tmpThis.props.data.onInserting != 'undefined')
                            {
                                tmpThis.props.data.onInserting(values,key)
                            }
                        },
                        onUpdated: function (key, values) 
                        {
                            if(typeof tmpThis.props.data != 'undefined' && typeof tmpThis.props.data.onUpdated != 'undefined')
                            {
                                tmpThis.props.data.onUpdated(key,values)
                            }
                        },
                        onUpdating: function (key, values) 
                        {                            
                            if(typeof tmpThis.props.data != 'undefined' && typeof tmpThis.props.data.onUpdating != 'undefined')
                            {
                                tmpThis.props.data.onUpdating(key,values)
                            }
                        },
                        onRemoved: function (key) 
                        {
                            if(typeof tmpThis.props.data.onRemoved != 'undefined')
                            {
                                tmpThis.props.data.onRemoved(key)
                            }
                        },
                        onRemoving: function (key) 
                        {
                            if(typeof tmpThis.props.data.onRemoving != 'undefined')
                            {
                                tmpThis.props.data.onRemoving(key,values)
                            }
                        },
                        byKey: async function (e) 
                        {
                            let x = {}
                            x[tmpThis.props.valueExpr] = e

                            // if(typeof tmpThis.props.defaultValue != 'undefined' && tmpThis.props.defaultValue != "")                        //defaultValue Dolu ise Datatable doldurma işlemi gerçekleştiriliyor.
                            // {
                                await tmpThis.state.data.store.load().done(async function () 
                                {
                                    let FilterData = tmpThis.state.data.datatable.toArray().filter(x => x[tmpThis.props.valueExpr] === e)   //Datatable içerisinde defaultValue parametresine göre filtreleme işlemi yapılıyor.
                                    if(FilterData.length > 0)
                                    {
                                        x[tmpThis.props.displayExpr] = FilterData[0][tmpThis.props.displayExpr]                             //displayExpr objesine göre x objesine alan ekleniyor, valuesine filtreden gelen veri ekleniyor.
                                    }
                                });
                            // }

                            return x
                        }   
                    })
                }
            });
        });
    }
}