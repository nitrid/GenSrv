import React from 'react';
import CheckBox from 'devextreme-react/check-box';
import Base from './base.js';

export default class NdCheckBox extends Base
{
    constructor(props)
    {
        super(props)
        
        this._onValueChanged = this._onValueChanged.bind(this);
    }
    _onValueChanged(e) 
    {
        this.value = e.value;
        if(typeof this.props.onValueChanged != 'undefined')
        {
            this.props.onValueChanged(e);
        }
    } 
    get value()
    {
        return this.state.value
    }
    set value(e)
    {
        this.setState({value:e})
    }
    render()
    {
        return(
            <CheckBox defaultValue={this.props.defaultValue} text={this.props.text} onValueChanged={this._onValueChanged}/>
        )
    }
}