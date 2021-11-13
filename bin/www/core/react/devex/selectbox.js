import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import Base from './base.js';

export default class NdSelectBox extends Base
{
    constructor(props)
    {
        super(props)

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
            onValueChanged={this._onValueChanged}
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
        this.setState({value:e})
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
            return (
                <div className="dx-field">
                    <div className="dx-field-label">{typeof this.state.option == 'undefined' ? '' : this.state.option.title}</div>
                    <div className="dx-field-value">
                        {this._selectBoxView()}
                    </div>
                </div>
            )
        }
        else
        {
            return this._selectBoxView()
        }
    }
}