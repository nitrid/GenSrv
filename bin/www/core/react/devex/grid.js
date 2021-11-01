import React from 'react';
import DataGrid from 'devextreme-react/data-grid';
import { datatable } from '../../core.js';
import CustomStore from 'devextreme/data/custom_store';
import Base from './base.js';

export default class NdGrid extends Base
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
        this._onInitNewRow = this._onInitNewRow.bind(this);
        this._onEditingStart = this._onEditingStart.bind(this);
        this._onRowInserting = this._onRowInserting.bind(this);
        this._onRowInserted = this._onRowInserted.bind(this);
        this._onRowUpdated = this._onRowUpdated.bind(this);
        this._onRowUpdating = this._onRowUpdating.bind(this);
        this._onRowRemoving = this._onRowRemoving.bind(this);
        this._onRowRemoved = this._onRowRemoved.bind(this);
        this._onSaving = this._onSaving.bind(this);
        this._onSaved = this._onSaved.bind(this);
        this._onEditCanceling = this._onEditCanceling.bind(this);
        this._onEditCanceled = this._onEditCanceled.bind(this);
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
    _onInitNewRow(e)
    {
        if(typeof this.props.onInitNewRow != 'undefined')
        {
            this.props.onInitNewRow(e);
        }
    }
    _onEditingStart(e)
    {
        if(typeof this.props.onEditingStart != 'undefined')
        {
            this.props.onEditingStart(e);
        }
    }
    async _onRowInserting(e)
    {
        if(typeof this.props.onRowInserting != 'undefined')
        {
            this.props.onRowInserting(e);
        }
    }
    async _onRowInserted(e)
    {
        if(typeof this.props.onRowInserted != 'undefined')
        {
            this.props.onRowInserted(e);
        }                               
    }    
    async _onRowUpdating(e)
    {
        if(typeof this.props.onRowUpdating != 'undefined')
        {
            this.props.onRowUpdating(e);
        }             
    }
    async _onRowUpdated(e)
    {
        if(typeof this.props.onRowUpdated != 'undefined')
        {
            this.props.onRowUpdated(e);
        }
        console.log(11)
        console.log(this.state.data.datatable)  
        
        // console.log(this.state.data.datatable)
        // await this.state.data.datatable.update();
        // await this.state.data.datatable.refresh();
    }
    _onRowRemoving(e)
    {
        if(typeof this.props.onRowRemoving != 'undefined')
        {
            this.props.onRowRemoving(e);
        }
    }
    _onRowRemoved(e)
    {
        if(typeof this.props.onRowRemoved != 'undefined')
        {
            this.props.onRowRemoved(e);
        }
    }
    _onSaving(e)
    {
        if(typeof this.props.onSaving != 'undefined')
        {
            this.props.onSaving(e);
        }
    }
    _onSaved(e)
    {
        if(typeof this.props.onSaved != 'undefined')
        {
            this.props.onSaved(e);
        }
    }
    _onEditCanceling(e)
    {
        if(typeof this.props.onEditCanceling != 'undefined')
        {
            this.props.onEditCanceling(e);
        }
    }
    _onEditCanceled(e)
    {
        if(typeof this.props.onEditCanceled != 'undefined')
        {
            this.props.onEditCanceled(e);
        }
    }
    //#endregion
    get datatable()
    {
        if(typeof this.state.data == 'undefined' || typeof this.state.data.datatable == 'undefined')
        {
            return undefined;
        }

        return this.state.data.datatable;
    }
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
                    onInitNewRow={this._onInitNewRow} onEditingStart={this._onEditingStart} onRowInserting={this._onRowInserting} onRowInserted={this._onRowInserted}
                    onRowUpdating={this._onRowUpdating} onRowUpdated={this._onRowUpdated} onRowRemoving={this._onRowRemoving} onRowRemoved={this._onRowRemoved} 
                    onSaving={this._onSaving} onSaved={this._onSaved} onEditCanceling={this._onEditCanceling} onEditCanceled={this._onEditCanceled}
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