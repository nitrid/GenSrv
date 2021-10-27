import React from 'react';
import DataGrid, {
    Column,
    Selection,
    FilterRow,
    HeaderFilter,
    Editing,
    Pager,
    Paging,
  } from 'devextreme-react/data-grid';
import { datatable } from '../../core.js';
import CustomStore from 'devextreme/data/custom_store';

export {Column}

export default class NdGrid extends React.Component
{
    constructor(props)
    {
        super(props);

        this.devGrid = null;
        this.state = 
        {            
            showBorders : typeof props.showBorders == 'undefined' ? false : props.showBorders,
            dataSource : typeof props.dataSource == 'undefined' ? undefined : props.dataSource,
            store : typeof props.store == 'undefined' ? undefined : props.store,
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

        this.onInitialized = this.onInitialized.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.rowRender = this.rowRender.bind(this);

        if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
        {
            this.props.parent[this.props.id] = this
        }        
    }
    onInitialized(e) 
    {
        this.devGrid = e.component;
    }
    onSelectionChanged(e) 
    {
        if(typeof this.props.onSelectionChanged != 'undefined')
        {
            this.props.onSelectionChanged(e);
        }
    }
    rowRender(e)
    {
        console.log(1)
        console.log(e)
        if(typeof this.props.rowRender != 'undefined')
        {
            console.log(2)
            return this.props.rowRender(e);
        }
    }
    componentDidMount() 
    {
        this.refresh(this.state.dataSource)  
    }
    refresh(e)
    {
        if(typeof e != 'undefined' && Array.isArray(e))
        {
            this.setState(
            { 
                dataSource : e,
                store : new CustomStore(
                {
                    load: function()
                    {
                        return new Promise(resolve => 
                        {
                            resolve({data: e});
                        });
                    }
                })
            });
        }
        else if (typeof e != 'undefined' && typeof e == 'object')
        {
            let tmpThis = this;
            this.setState(
            { 
                dataSource : e,
                store : new CustomStore(
                {
                    load: function()
                    {                        
                        return new Promise(async resolve => 
                        {
                            if(typeof tmpThis.props.core != 'undefined' && typeof e.query != 'undefined')
                            {
                                let tmpDt = new datatable('');
                                tmpDt.sql = tmpThis.props.core.sql
                                tmpDt.selectCmd = e.query;
                                await tmpDt.refresh()
                                resolve({data: tmpDt.toArray()});
                            }
                        });
                    }
                })
            });
        }
    }
    render()
    {
        return (
            <React.Fragment>
                <DataGrid id={this.props.id} dataSource={this.state.store} showBorders={this.state.showBorders} 
                    columnsAutoWidth={this.state.columnsAutoWidth} allowColumnReordering={this.state.allowColumnReordering} 
                    allowColumnResizing={this.state.allowColumnResizing} height={this.state.height} width={this.state.width}
                    onInitialized={this.onInitialized} onSelectionChanged={this.onSelectionChanged}
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