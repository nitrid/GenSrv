import React from 'react';
import DataGrid from 'devextreme-react/data-grid';
import { datatable } from '../../core.js';
import CustomStore from 'devextreme/data/custom_store';

export default class NdGrid extends React.Component
{
    constructor(props)
    {
        super(props);
        this.devGrid = null;
        this.state = 
        {            
            showBorders : typeof props.showBorders == 'undefined' ? false : props.showBorders,
            data : typeof props.data == 'undefined' ? undefined : props.data,
            columnsAutoWidth : typeof props.columnsAutoWidth == 'undefined' ? false : props.columnsAutoWidth,
            allowColumnReordering : typeof props.allowColumnReordering == 'undefined' ? false : props.allowColumnReordering,
            allowColumnResizing : typeof props.allowColumnResizing == 'undefined' ? false : props.allowColumnResizing,
            width : typeof props.width == 'undefined' ? undefined : props.width,
            height : typeof props.height == 'undefined' ? undefined : props.height,
            columns : typeof props.columns == 'undefined' ? undefined : props.columns,
            filterRow : typeof props.filterRow == 'undefined' ? {} : props.filterRow,
            headerFilter : typeof props.headerFilter == 'undefined' ? {} : props.headerFilter,
            selection : typeof props.selection == 'undefined' ? {} : props.selection,
            paging : typeof props.paging == 'undefined' ? {} : props.paging,
            pager : typeof props.pager == 'undefined' ? {} : props.pager,
            editing : typeof props.editing == 'undefined' ? {} : props.editing
        }

        this._onInitialized = this._onInitialized.bind(this);
        this._onSelectionChanged = this._onSelectionChanged.bind(this);

        if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
        {
            this.props.parent[this.props.id] = this
        }        
    }
    //#region Private
    _onInitialized(e) 
    {
        this.devGrid = e.component;
    }    
    _onSelectionChanged(e) 
    {
        if(typeof this.props.onSelectionChanged != 'undefined')
        {
            this.props.onSelectionChanged(e);
        }
    }
    //#endregion
    async componentDidMount() 
    {
        if(typeof this.state.data != 'undefined')
        {
            await this.dataRefresh(this.state.data)                 
        }
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
                        load: function()
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
                                    console.log(e.source)
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
                        }
                    })
                }
            });
        });
    }
    getSelectedData()
    {
        return this.devGrid.getSelectedRowsData()
    }
    render()
    {
        return (
            <React.Fragment>
                <DataGrid id={this.props.id} dataSource={typeof this.state.data == 'undefined' ? undefined : this.state.data.store} showBorders={this.state.showBorders} 
                    columnsAutoWidth={this.state.columnsAutoWidth} allowColumnReordering={this.state.allowColumnReordering} 
                    allowColumnResizing={this.state.allowColumnResizing} height={this.state.height} width={this.state.width}
                    onInitialized={this._onInitialized} onSelectionChanged={this._onSelectionChanged} 
                    columns={this.state.columns}
                    filterRow={this.state.filterRow}
                    headerFilter={this.state.headerFilter}
                    selection={this.state.selection}
                    paging={this.state.paging}
                    pager={this.state.pager}
                    editing={this.state.editing} 
                    >
                </DataGrid>
            </React.Fragment>
        )
    }
}