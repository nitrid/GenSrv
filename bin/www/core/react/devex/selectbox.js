import React from 'react';
import SelectBox from 'devextreme-react/select-box';

export default class NdSelectBox extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            defaultValue : "",
            option : typeof props.option == 'undefined' ? undefined :
            {
                title : props.option.title,
                titleAlign : props.option.titleAlign
            },
            dataSource : typeof props.dataSource == 'undefined' ? undefined : props.dataSource,
            store : typeof props.store == 'undefined' ? undefined : props.store,
        }

        if(typeof this.props.store != "undefined")
        {
            this.state.store = this.props.store;
        }
        if(this.state.store.length > 0)
        {
            if(typeof this.props.defaultValue == 'number')
            {
                this.state.defaultValue = this.state.store[this.props.defaultValue][this.props.valueExpr];
            }
            else if(typeof this.props.defaultValue == 'string' && this.props.defaultValue != "")
            {
                this.state.defaultValue = this.props.defaultValue;
            }
            else
            {
                this.state.defaultValue = this.state.store[0][Object.keys(this.state.store[0]).find(e => e == this.props.valueExpr)];
            }
        }

       this.onValueChanged = this.onValueChanged.bind(this);

       if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
       {
           this.props.parent[this.props.id] = this
       }
    }
    componentDidMount()
    {
        
    }
    onValueChanged(e) 
    {
        this.setState({value: e.value});
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
                                if(typeof e.source != 'undefined' && Array.isArray(e.source))
                                {
                                    tmpThis.state.data.source = e.source;
                                    tmpThis.state.data.datatable = new datatable();
                                    tmpThis.state.data.datatable.import(e.source)
                                    resolve({data: tmpThis.state.data.datatable.toArray()});
                                    mresolve()
                                }
                                // EĞER DATA SOURCE A DATATABLE GÖNDERİLMİŞ İSE
                                else if (typeof e.source != 'undefined' && e.source instanceof datatable)
                                {
                                    tmpThis.state.data.source = e.source;
                                    tmpThis.state.data.datatable = e.source;
                                    await tmpThis.state.data.datatable.refresh();
                                    resolve({data: tmpThis.state.data.datatable.toArray()});
                                    mresolve()
                                }
                                // EĞER DATA SOURCE A QUERY SET GÖNDERİLMİŞ İSE
                                else if (typeof e.source != 'undefined' && typeof e.source == 'object' && typeof e.source.sql != 'undefined' && typeof e.source.select != 'undefined')
                                {                                
                                    tmpThis.state.data.source = e.source;
                                    tmpThis.state.data.datatable = new datatable();
                                    tmpThis.state.data.datatable.sql = e.source.sql
                                    tmpThis.state.data.datatable.selectCmd = e.source.select;
                                    tmpThis.state.data.datatable.insertCmd = e.source.insert;
                                    tmpThis.state.data.datatable.updateCmd = e.source.update;
                                    tmpThis.state.data.datatable.deleteCmd = e.source.delete;

                                    await tmpThis.state.data.datatable.refresh()
                                    resolve({data: tmpThis.state.data.datatable.toArray()});
                                    mresolve()
                                }
                                else
                                {
                                    resolve({data: []});
                                    mresolve()
                                }
                            });
                        },
                        update: (key, values) => 
                        {
                            return new Promise(async resolve => 
                            {
                                if(typeof tmpThis.state.data != 'undefined' && typeof tmpThis.state.data.datatable != 'undefined')
                                {
                                    for (let i = 0; i < Object.keys(values).length; i++) 
                                    {
                                        tmpThis.state.data.datatable.find(x => x === key)[Object.keys(values)[i]] = values[Object.keys(values)[i]]
                                    }                                    
                                }
                                console.log(12)
                                resolve()                                
                            });
                        },
                        insert: (values) => 
                        {
                            return new Promise(async resolve => 
                            {
                                if(typeof tmpThis.state.data != 'undefined' && typeof tmpThis.state.data.datatable != 'undefined')
                                {
                                    //tmpThis.state.data.datatable.push({CODE:"001",NAME:"ALI"})
                                    //await tmpThis.state.data.datatable.update();
                                    //await tmpThis.state.data.datatable.refresh();
                                    //console.log(tmpThis.state.data.datatable)
                                }
                                resolve()                                
                            });
                        }
                    })
                }
            });
        });
    }
    render()
    {
        return (
        <div className="dx-field">
            <div className="dx-field-label">{this.state.option.title}</div>
            <div className="dx-field-value">
                <SelectBox 
                dataSource={typeof this.state.data == 'undefined' ? undefined : this.state.data.store} 
                displayExpr={this.props.displayExpr} 
                valueExpr={this.props.valueExpr}
                defaultValue={this.state.defaultValue}
                onValueChanged={this.onValueChanged}
                />
            </div>
        </div>)
    }
}