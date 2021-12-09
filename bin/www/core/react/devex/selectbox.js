import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import Base from './base.js';

export default class NdSelectBox extends Base
{
    constructor(props)
    {
        super(props)
        
        this.state.value = typeof props.value == 'undefined' ? '' : props.value;

        this._onValueChanged = this._onValueChanged.bind(this);
    }
    //#region Private
    _selectBoxView()
    {
        return (
            <SelectBox 
            dataSource={typeof this.state.data == 'undefined' ? undefined : this.state.data.store} 
            displayExpr={this.props.displayExpr} 
            valueExpr={this.props.valueExpr}
            defaultValue={this.props.defaultValue}
            showClearButton={this.props.showClearButton}
            searchEnabled={this.props.searchEnabled}
            searchMode={'contains'}
            searchExpr={this.props.displayExpr}
            searchTimeout={200}
            minSearchLength={0}
            onValueChanged={this._onValueChanged}
            height={this.props.height}
            style={this.props.style}
            />
        )
    }
    _onValueChanged(e) 
    {
        this.value = e.value;
        if(typeof this.props.onValueChanged != 'undefined')
        {
            this.props.onValueChanged(e);
        }
    }  
    //#endregion
    get value()
    {
        return this.state.value
    }
    set value(e)
    {
        this.setState({value:e == null ? '' : e})
    }
    async componentDidMount()
    {
        if(typeof this.state.data != 'undefined')
        {
            await this.dataRefresh(this.state.data)                 
        }
    }
      
    render()
    {
        if(typeof this.props.simple != 'undefined' && this.props.simple)
        {
            return this._selectBoxView()
        }
        else
        {
            return (
                <div className="dx-field">
                    <div className="dx-field-label">{typeof this.props.title == 'undefined' ? '' : this.props.title}</div>
                    <div className="dx-field-value">
                        {this._selectBoxView()}
                    </div>
                </div>
            )            
        }
    }
}