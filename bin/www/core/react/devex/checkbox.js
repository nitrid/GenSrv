import React from 'react';
import CheckBox from 'devextreme-react/check-box';
import Base from './base.js';

export default class NdCheckBox extends Base
{
    constructor(props)
    {
        super(props)
        
        this.state.value = typeof props.value == 'undefined' ? false : props.value;

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
        //VALUE DEĞİŞTİĞİNDE BU DEĞİŞİKLİK DATATABLE A YANSITMAK İÇİN YAPILDI.
        if(typeof this.props.dt != 'undefined' && typeof this.props.dt.data != 'undefined' && this.props.dt.data.length > 0 && typeof this.props.dt.field != 'undefined')
        {
            if(typeof this.props.dt.filter == 'undefined')
            {
                this.props.dt.data[0][this.props.dt.field] = e
            }   
            else
            {
                let tmpData = this.props.dt.data.where(this.props.dt.filter);
                if(tmpData.length > 0)
                {
                    this.props.dt.data.where(this.props.dt.filter)[0][this.props.dt.field] = e
                }
            }
        }
        this.setState({value:e})
    }
    render()
    {
        return(
            <CheckBox defaultValue={this.props.defaultValue} value={this.state.value} text={this.props.text} onValueChanged={this._onValueChanged}/>
        )
    }
}