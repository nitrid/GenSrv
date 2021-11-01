import React from 'react';
import DataGrid from 'devextreme-react/data-grid';
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

        console.log(this.props)
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