import React from 'react';
import DateBox from 'devextreme-react/date-box';
import Base from './base.js';

export default class NdDatePicker extends Base
{
    constructor(props)
    {
        super(props)
        
        this.state.value = typeof props.param == 'undefined' ? new Date() : new Date(props.param.getValue().toString())
        this.state.title = typeof props.title == 'undefined' ? '' : props.title
        this.state.titleAlign = typeof props.titleAlign == 'undefined' ? 'left' : props.titleAlign
        this.state.showClearButton = typeof props.showClearButton == 'undefined' ? false : props.showClearButton
        this.state.type = typeof props.type == 'undefined' ? 'date' : props.type

        this._onValueChanged = this._onValueChanged.bind(this)
        this._onEnterKey = this._onEnterKey.bind(this)
    }
    _onValueChanged(e) 
    {           
        this.value = e.value;
        if(typeof this.props.onValueChanged != 'undefined')
        {
            this.props.onValueChanged();
        }
    }
    _onEnterKey()
    {
        if(typeof this.props.onEnterKey != 'undefined')
        {
            this.props.onEnterKey();
        }
    }
    render()
    {
        // YETKİLENDİRMEDEN GELEN GÖRÜNÜR GÖRÜNMEZ DURUMU. DEĞER BASE DEN GELİYOR.
        if(this.state.visible == false)
        {
            return <div></div>
        }
        if(typeof this.state.title == 'undefined')
        {
            return (
                <div className="dx-field">
                    <DateBox showClearButton={this.state.showClearButton} 
                        height='fit-content' 
                        valueChangeEvent="keyup" 
                        value={this.state.value} 
                        disabled={this.state.editable}
                        type={this.state.type}
                        onEnterKey={this._onEnterKey} onValueChanged={this._onValueChanged}/>
                </div>
            )
        }
        else
        {
            // TITLE POZISYONU LEFT,RIGHT,TOP,BOTTOM 
            if(typeof this.state.titleAlign == 'undefined')
            {
                return (
                    <div className="dx-field">
                        <div className="dx-field-label" style={{textAlign:'right'}}>{this.state.title}</div>
                        <DateBox className="dx-field-value" 
                            showClearButton={this.state.showClearButton} 
                            height='fit-content' 
                            valueChangeEvent="keyup" 
                            value={this.state.value} 
                            disabled={this.state.editable}
                            type={this.state.type}
                            onEnterKey={this._onEnterKey} onValueChanged={this._onValueChanged}/>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'top')
            {
                return (
                    <div className="dx-field">
                        <div>{this.state.title}</div>
                        <DateBox showClearButton={this.state.showClearButton} 
                            height='fit-content' 
                            valueChangeEvent="keyup"
                            value={this.state.value} 
                            disabled={this.state.editable}
                            type={this.state.type}
                            onEnterKey={this._onEnterKey}
                            onValueChanged={this._onValueChanged}/>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'bottom')
            {
                return (
                    <div className="dx-field">                        
                        <DateBox showClearButton={this.state.showClearButton} 
                            height='fit-content' 
                            valueChangeEvent="keyup" 
                            value={this.state.value} 
                            disabled={this.state.editable}
                            type={this.state.type}
                            onEnterKey={this._onEnterKey} onValueChanged={this._onValueChanged}/>
                        <div>{this.state.option.title}</div>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'left')
            {
                return (
                    <div className="dx-field">
                        <div className="dx-field-label" style={{textAlign:'right'}}>{this.state.title}</div>
                        <DateBox className="dx-field-value" 
                            showClearButton={this.state.showClearButton} 
                            height='fit-content' 
                            valueChangeEvent="keyup" 
                            value={this.state.value} 
                            disabled={this.state.editable}
                            type={this.state.type}
                            onEnterKey={this._onEnterKey} onValueChanged={this._onValueChanged}/>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'right')
            {
                return (
                    <div className="dx-field">                        
                        <DateBox className="dx-field-value" showClearButton={this.state.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup"  
                            value={this.state.value} 
                            style={{float:'left'}} 
                            disabled={this.state.editable}
                            type={this.state.type}
                            onEnterKey={this._onEnterKey} onValueChanged={this._onValueChanged}/>
                        <div className="dx-field-label" style={{float:'right',paddingLeft:'15px'}}>{this.state.title}</div>
                    </div>
                )
            }
        }
    }
}