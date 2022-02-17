import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import Base,{ Validator, NumericRule, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule, AsyncRule } from './base.js';

export { Validator, NumericRule, RequiredRule, CompareRule, EmailRule, PatternRule, StringLengthRule, RangeRule, AsyncRule }

export default class NdSelectBox extends Base
{
    constructor(props)
    {
        super(props)
        this.dev = null;

        this.state.value = typeof props.value != 'undefined' ? props.value : ''

        this._onInitialized = this._onInitialized.bind(this);
        this._onValueChanged = this._onValueChanged.bind(this);
    }
    //#region Private
    _onInitialized(e) 
    {
        this.dev = e.component;
    }  
    _selectBoxView()
    {
        return (
            <SelectBox id={this.props.id}
            dataSource={typeof this.state.data == 'undefined' ? typeof this.props.dataSource != 'undefined' ? this.props.dataSource : undefined : this.state.data.store} 
            displayExpr={this.props.displayExpr} 
            valueExpr={this.props.valueExpr}
            defaultValue={this.props.defaultValue}
            showClearButton={this.props.showClearButton}
            searchEnabled={this.props.searchEnabled}
            searchMode={'contains'}
            searchExpr={this.props.searchExpr}
            searchTimeout={200}
            minSearchLength={0}
            onValueChanged={this._onValueChanged}
            onInitialized={this._onInitialized}
            height={this.props.height}
            style={this.props.style}
            value={this.state.value}
            >
                {this.props.children}
                {this.validationView()}
            </SelectBox>
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
        if(typeof e == 'undefined')
        {
            return;
        }
        //VALUE DEĞİŞTİĞİNDE BU DEĞİŞİKLİK DATATABLE A YANSITMAK İÇİN YAPILDI.
        if(typeof this.props.dt != 'undefined' && typeof this.props.dt.data != 'undefined' && this.props.dt.data.length > 0 && typeof this.props.dt.field != 'undefined')
        {            
            if(typeof this.props.dt.filter == 'undefined')
            {
                if(typeof this.props.dt.row != 'undefined' && typeof this.props.dt.data.find(x => x === this.props.dt.row) != 'undefined')
                {
                    this.props.dt.data.find(x => x === this.props.dt.row)[this.props.dt.field] = e
                    //SELECTBOX DA DEĞİŞEN DEĞERİN DISPLAY DE DEĞERİNİ DATATABLE A YANSITILIYOR
                    if(typeof this.props.dt.display != 'undefined')
                    {
                        this.props.dt.data.find(x => x === this.props.dt.row)[this.props.dt.display] = this.displayValue
                    }
                }
                else
                {
                    this.props.dt.data[this.props.dt.data.length-1][this.props.dt.field] = e
                    //SELECTBOX DA DEĞİŞEN DEĞERİN DISPLAY DE DEĞERİNİ DATATABLE A YANSITILIYOR
                    if(typeof this.props.dt.display != 'undefined')
                    {
                        this.props.dt.data[this.props.dt.data.length-1][this.props.dt.display] = this.displayValue
                    }
                }                
            }   
            else
            {
                let tmpData = this.props.dt.data.where(this.props.dt.filter);
                if(tmpData.length > 0)
                {
                    if(typeof this.props.dt.row != 'undefined' && typeof tmpData.find(x => x === this.props.dt.row) != 'undefined')
                    {
                        tmpData.find(x => x === this.props.dt.row)[this.props.dt.field] = e
                        //SELECTBOX DA DEĞİŞEN DEĞERİN DISPLAY DE DEĞERİNİ DATATABLE A YANSITILIYOR
                        if(typeof this.props.dt.display != 'undefined')
                        {
                            tmpData.find(x => x === this.props.dt.row)[this.props.dt.display] = this.displayValue
                        }
                    }
                    else
                    {
                        tmpData[tmpData.length-1][this.props.dt.field] = e
                        //SELECTBOX DA DEĞİŞEN DEĞERİN DISPLAY DE DEĞERİNİ DATATABLE A YANSITILIYOR
                        if(typeof this.props.dt.display != 'undefined')
                        {
                            tmpData[tmpData.length-1][this.props.dt.display] = this.displayValue
                        }
                    }
                }
            }
        }
        
        this.setState({value:e == null ? '' : e})
    }
    get displayValue()
    {
        return this.dev.option('displayValue');
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