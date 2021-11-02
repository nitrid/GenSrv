import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import Base from './base.js';

export default class NdSelectBox extends Base
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            defaultValue : "",
            option : typeof props.option == 'undefined' ? undefined :
            {
                title : props.option.title,
                titleAlign : props.option.titleAlign
            }
        }

        // if(typeof this.props.store != "undefined")
        // {
        //     this.state.store = this.props.store;
        // }
        // if(this.state.store.length > 0)
        // {
        //     if(typeof this.props.defaultValue == 'number')
        //     {
        //         this.state.defaultValue = this.state.store[this.props.defaultValue][this.props.valueExpr];
        //     }
        //     else if(typeof this.props.defaultValue == 'string' && this.props.defaultValue != "")
        //     {
        //         this.state.defaultValue = this.props.defaultValue;
        //     }
        //     else
        //     {
        //         this.state.defaultValue = this.state.store[0][Object.keys(this.state.store[0]).find(e => e == this.props.valueExpr)];
        //     }
        // }

       this.onValueChanged = this.onValueChanged.bind(this);
    }
    async componentDidMount()
    {
        if(typeof this.state.data != 'undefined')
        {
            await this.dataRefresh(this.state.data)                 
        }
    }
    onValueChanged(e) 
    {
        this.setState({value: e.value});
    }
    render()
    {
        return (
        <div className="dx-field">
            <div className="dx-field-label">{this.state.option.title}</div>
            <div className="dx-field-value">
                <SelectBox 
                dataSource={typeof this.state.data == 'undefined' ? undefined : this.state.data.store} 
                displayExpr={this.props.displayExpr} 
                valueExpr={this.props.valueExpr}
                defaultValue={this.props.defaultValue}
                onValueChanged={this.onValueChanged}
                />
            </div>
        </div>)
    }
}