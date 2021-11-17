import React from 'react';
import {TextBox,Button} from 'devextreme-react/text-box';
import NdPopGrid from './popgrid.js';
import Base from './base.js';

export default class NdTextBox extends Base
{
    constructor(props)
    {
        super(props)
        
        this.state.value = typeof props.value != 'undefined' ? props.value : typeof props.param == 'undefined' ? '' : props.param.getValue().toString()
        this.state.title = typeof props.title == 'undefined' ? '' : props.title
        this.state.titleAlign = typeof props.titleAlign == 'undefined' ? 'left' : props.titleAlign
        this.state.showClearButton = typeof props.showClearButton == 'undefined' ? false : props.showClearButton
        this.state.popgrid = props.popgrid

        this._onValueChanged = this._onValueChanged.bind(this)
        this._onEnterKey = this._onEnterKey.bind(this)
    }
    //#region Private
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
    _buttonView(props)
    {
        let tmpThis = this;
        if(typeof props != 'undefined')
        {
            return (
                <Button 
                    name={"btn_" + this.props.id}
                    location="after"
                    options=
                    {
                        {
                            icon: 'more',
                            type: 'default',
                            onClick: () => 
                            {
                                this["pg_" + this.props.id].show()
                                this["pg_" + this.props.id].onClick = function(data)
                                {
                                    if(data.length > 0)
                                    {
                                        if(typeof props.key != 'undefined')
                                        {
                                            tmpThis.value = data[0][props.key]
                                            if(typeof tmpThis.props.popgrid.onClick != 'undefined')
                                            {
                                                tmpThis.props.popgrid.onClick(data[0][props.key])
                                            }
                                        }
                                    }
                                    
                                }
                            }
                        }
                    }
                >                
                </Button>
            )
        }        
    }
    _gridView(props)
    {
        if(typeof props != 'undefined')
        {
            return (
                <NdPopGrid id={"pg_" + this.props.id} parent={this} container={".dx-multiview-wrapper"} 
                    position={props.position} 
                    width={props.width} 
                    height={props.height}
                    showTitle={true} 
                    title={props.title} 
                    columnWidth={props.columnWidth}
                    data={props.data}
                />
            )
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
    componentDidMount()
    {
        
    }    
    render()
    {
        // YETKİLENDİRMEDEN GELEN GÖRÜNÜR GÖRÜNMEZ DURUMU. DEĞER BASE DEN GELİYOR.
        if(this.state.visible == false)
        {
            return <div></div>
        }

        if(typeof this.props.simple != 'undefined' && this.props.simple)
        {
            return (
                <TextBox showClearButton={this.state.showClearButton} height='fit-content' 
                    valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                    onEnterKey={this._onEnterKey} value={this.state.value} disabled={this.state.editable}>
                    {this._buttonView(this.props.popgrid)}
                    {this._gridView(this.props.popgrid)}
                </TextBox>
            )
        }

        if(this.state.title == '')
        {
            return (
                <div className="dx-field">
                    <TextBox showClearButton={this.state.showClearButton} height='fit-content' 
                        valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                        onEnterKey={this._onEnterKey} value={this.state.value} disabled={this.state.editable}>
                            {this._buttonView(this.props.popgrid)}
                            {this._gridView(this.props.popgrid)}
                        </TextBox>
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
                        <TextBox className="dx-field-value" showClearButton={this.state.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                            onEnterKey={this._onEnterKey} value={this.state.value} disabled={this.state.editable}>
                                {this._buttonView(this.props.popgrid)}
                                {this._gridView(this.props.popgrid)}
                            </TextBox>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'top')
            {
                return (
                    <div className="dx-field">
                        <div>{this.state.title}</div>
                        <TextBox showClearButton={this.state.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                            onEnterKey={this._onEnterKey} value={this.state.value} disabled={this.state.editable}>
                                {this._buttonView(this.props.popgrid)}
                                {this._gridView(this.props.popgrid)}
                            </TextBox>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'bottom')
            {
                return (
                    <div className="dx-field">                        
                        <TextBox showClearButton={this.state.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                            onEnterKey={this._onEnterKey} value={this.state.value} disabled={this.state.editable}>
                            {this._buttonView(this.props.popgrid)}
                            {this._gridView(this.props.popgrid)}
                        </TextBox>
                        <div>{this.state.option.title}</div>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'left')
            {
                return (
                    <div className="dx-field">
                        <div className="dx-field-label" style={{textAlign:'right'}}>{this.state.title}</div>
                        <TextBox className="dx-field-value" showClearButton={this.state.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                            onEnterKey={this._onEnterKey} value={this.state.value} disabled={this.state.editable}>
                            {this._buttonView(this.props.popgrid)}
                            {this._gridView(this.props.popgrid)}
                        </TextBox>
                    </div>
                )
            }
            else if(this.state.titleAlign == 'right')
            {
                return (
                    <div className="dx-field">                        
                        <TextBox className="dx-field-value" showClearButton={this.state.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this._onValueChanged} 
                            onEnterKey={this._onEnterKey} value={this.state.value} style={{float:'left'}} disabled={this.state.editable}>
                            {this._buttonView(this.props.popgrid)}
                            {this._gridView(this.props.popgrid)}
                        </TextBox>
                        <div className="dx-field-label" style={{float:'right',paddingLeft:'15px'}}>{this.state.title}</div>
                    </div>
                )
            }
        }
    }
}