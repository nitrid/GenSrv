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

export default class NdGrid extends React.Component
{
    constructor(props)
    {
        super(props);
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
            filterRow : typeof props.filterRow == 'undefined' ? {} : props.filterRow,
            headerFilter : typeof props.headerFilter == 'undefined' ? {} : props.headerFilter,
            selection : typeof props.selection == 'undefined' ? {} : props.selection,
            paging : typeof props.paging == 'undefined' ? {} : props.paging,
            pager : typeof props.pager == 'undefined' ? {} : props.pager,
            editing : typeof props.editing == 'undefined' ? {} : props.editing
        }

        if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
        {
            this.props.parent[this.props.id] = this
        }
    }
    componentDidMount() 
    {
        this.refresh(this.state.dataSource)
    }
    refresh(pDs)
    {
        if(typeof pDs != 'undefined' && Array.isArray(pDs))
        {
            this.setState(
            { 
                dataSource : pDs,
                store : new CustomStore(
                {
                    load: function()
                    {
                        return new Promise(resolve => 
                        {
                            resolve({data: pDs});
                        });
                    }
                })
            });
        }
        else if (typeof pDs != 'undefined' && typeof pDs == 'object')
        {
            this.setState(
            { 
                dataSource : pDs,
                store : new CustomStore(
                {
                    load: function()
                    {
                        return new Promise(async resolve => 
                        {
                            console.log(pDs)
                            if(typeof pDs.core != 'undefined')
                            {
                                
                            }
                            resolve({data: pDs});
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
                <DataGrid dataSource={this.state.store} showBorders={this.state.showBorders} 
                    columnsAutoWidth={this.state.columnsAutoWidth} allowColumnReordering={this.state.allowColumnReordering} 
                    allowColumnResizing={this.state.allowColumnResizing} height={this.state.height} width={this.state.width}>
                    <FilterRow visible={typeof this.state.filterRow.visible == 'undefined' ? false : this.state.filterRow.visible} />
                    <HeaderFilter visible={typeof this.state.headerFilter.visible == 'undefined' ? false : this.state.headerFilter.visible} />
                    <Selection mode={typeof this.state.selection.mode == 'undefined' ? undefined :  this.state.selection.mode} 
                        selectAllMode={typeof this.state.selection.selectAllMode == 'undefined' ? undefined : this.state.selection.selectAllMode} 
                        showCheckBoxesMode={typeof this.state.selection.showCheckBoxesMode == 'undefined' ? undefined : this.state.selection.showCheckBoxesMode}/>
                    <Paging defaultPageSize={typeof this.state.paging.defaultPageSize == 'undefined' ? undefined : this.state.paging.defaultPageSize} />
                    <Pager
                        visible={typeof this.state.pager.visible == '' ? undefined : this.state.pager.visible}
                        allowedPageSizes={typeof this.state.pager.allowedPageSizes == 'undefined' ? undefined : this.state.pager.allowedPageSizes}
                        displayMode={typeof this.state.pager.displayMode == 'undefined' ? undefined : this.state.pager.displayMode}
                        showPageSizeSelector={typeof this.state.pager.showPageSizeSelector == 'undefined' ? undefined : this.state.pager.showPageSizeSelector}
                        showInfo={typeof this.state.pager.showInfo == 'undefined' ? undefined : this.state.pager.showInfo}
                        showNavigationButtons={typeof this.state.pager.showNavigationButtons == 'undefined' ? undefined : this.state.pager.showNavigationButtons} />
                    <Editing
                        mode={typeof this.state.editing.mode == 'undefined' ? undefined : this.state.editing.mode}
                        allowUpdating={typeof this.state.editing.allowUpdating == 'undefined' ? undefined : this.state.editing.allowUpdating}
                        allowAdding={typeof this.state.editing.allowAdding == 'undefined' ? undefined : this.state.editing.allowAdding}
                        allowDeleting={typeof this.state.editing.allowDeleting == 'undefined' ? undefined : this.state.editing.allowDeleting}
                        selectTextOnEditStart={typeof this.state.editing.selectTextOnEditStart == 'undefined' ? undefined : this.state.editing.selectTextOnEditStart}
                        startEditAction={typeof this.state.editing.startEditAction == 'undefined' ? undefined : this.state.editing.startEditAction} />
                </DataGrid>
            </React.Fragment>
        )
    }
}