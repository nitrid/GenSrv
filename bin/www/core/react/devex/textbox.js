import React from 'react';
import TextBox from 'devextreme-react/text-box';

export default class NdTextBox extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.state = 
        {
            value : '',
            option : typeof props.option == 'undefined' ? undefined :
            {
                title : props.option.title,
                titleAlign : props.option.titleAlign,
                showClearButton : typeof props.option.showClearButton == 'undefined' ? false : true
            }
        }
        //PARAMETRE ELEMENT E YANSITILIYOR.
        if(typeof props.param != 'undefined' && props.param.length > 0 && typeof props.id != 'undefined')
        {
            let tmp = props.param.filter(x => x.ELEMENT_ID === props.id)
            if(tmp.length > 0)
            {
                this.state.value = tmp[0].VALUE
            }
        }
        
        this.onValueChanged = this.onValueChanged.bind(this)
        this.onEnterKey = this.onEnterKey.bind(this)
        
        if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
        {
            this.props.parent[this.props.id] = this
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
    onValueChanged(e) 
    {           
        this.value = e.value;
        if(typeof this.props.onValueChanged != 'undefined')
        {
            this.props.onValueChanged();
        }
    }
    onEnterKey()
    {
        if(typeof this.props.onEnterKey != 'undefined')
        {
            this.props.onEnterKey();
        }
    }
    render()
    {
        if(typeof this.state.option == 'undefined' || typeof this.state.option.title == 'undefined')
        {
            return (
                <div className="dx-field">
                    <TextBox showClearButton={typeof this.state.option == 'undefined' ? false : this.state.option.showClearButton} height='fit-content' 
                        valueChangeEvent="keyup" onValueChanged={this.onValueChanged} 
                        onEnterKey={this.onEnterKey} value={this.state.value}/>
                </div>
            )
        }
        else
        {
            // TITLE POZISYONU LEFT,RIGHT,TOP,BOTTOM 
            if(typeof this.state.option.titleAlign == 'undefined')
            {
                return (
                    <div className="dx-field">
                        <div className="dx-field-label" style={{textAlign:'right'}}>{this.state.option.title}</div>
                        <TextBox className="dx-field-value" showClearButton={this.state.option.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this.onValueChanged} 
                            onEnterKey={this.onEnterKey}  value={this.state.value}/>
                    </div>
                )
            }
            else if(this.state.option.titleAlign == 'top')
            {
                return (
                    <div className="dx-field">
                        <div>{this.state.option.title}</div>
                        <TextBox showClearButton={this.state.option.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this.onValueChanged} 
                            onEnterKey={this.onEnterKey}  value={this.state.value}/>
                    </div>
                )
            }
            else if(this.state.option.titleAlign == 'bottom')
            {
                return (
                    <div className="dx-field">                        
                        <TextBox showClearButton={this.state.option.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this.onValueChanged} 
                            onEnterKey={this.onEnterKey}  value={this.state.value}/>
                        <div>{this.state.option.title}</div>
                    </div>
                )
            }
            else if(this.state.option.titleAlign == 'left')
            {
                return (
                    <div className="dx-field">
                        <div className="dx-field-label" style={{textAlign:'right'}}>{this.state.option.title}</div>
                        <TextBox className="dx-field-value" showClearButton={this.state.option.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this.onValueChanged} 
                            onEnterKey={this.onEnterKey}  value={this.state.value}/>
                    </div>
                )
            }
            else if(this.state.option.titleAlign == 'right')
            {
                return (
                    <div className="dx-field">                        
                        <TextBox className="dx-field-value" showClearButton={this.state.option.showClearButton} height='fit-content' 
                            valueChangeEvent="keyup" onValueChanged={this.onValueChanged} 
                            onEnterKey={this.onEnterKey}  value={this.state.value} style={{float:'left'}}/>
                        <div className="dx-field-label" style={{float:'right',paddingLeft:'15px'}}>{this.state.option.title}</div>
                    </div>
                )
            }
        }
    }
}