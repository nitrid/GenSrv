import React from 'react';
import {TreeView,SearchEditorOptions} from 'devextreme-react/tree-view';
import {menu_list} from './conf/menu_list.js'

export default class Menu extends React.Component 
{
    constructor(probs)
    {
        super(probs);
        this.style = 
        {
            div :
            {
                height:'100%'
            },
            treeview :
            {
                padding:'8px'
            }
        }
        this.menu_item = menu_list;
        this.state = 
        {
            value: 'contains',
            currentItem: Object.assign({},this.menu_item[0])
        }
        //this.selectItem = this.selectItem.bind(this);
    }
    render()
    {
        const {currentItem} = this.state;
        return(
            <div style={this.style.div}>
            <TreeView id="Menu" style={this.style.treeview}
                items = {this.menu_item}
                width = {300}
                height = {'100%'}
                searchMode={this.state.value}
                searchEnabled={true}                
                >
                <SearchEditorOptions height={'fit-content'} />
                </TreeView>  
            </div>
        )
    }
} 