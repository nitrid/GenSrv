import React from 'react';
import SelectBox from 'devextreme-react/select-box';

export default class NdSelectBox extends React.Component
{
    constructor(props)
    {
        super(props)


        console.log(typeof this.props.item)
        if(typeof this.props.defaultValue == 'number')
        {
            console.log(1000)
        }
        else if(typeof this.props.defaultValue == 'string')
        {
            console.log(999)
        }

        this.state = 
        {
            option : typeof props.option == 'undefined' ? undefined :
            {
                title : props.option.title,
                titleAlign : props.option.titleAlign
            },
            items : 
            [
                {
                    "GUID" : "AAAA",
                    "ID" : "001",
                    "NAME" : "DENEME",
                },
                {
                    "GUID" : "AAAA2",
                    "ID" : "002",
                    "NAME" : "DENEME-2"
                },
                {
                    "GUID" : "AAAA3",
                    "ID" : "003",
                    "NAME" : "DENEME-3"
                }
            ]
        }

       this.onValueChanged = this.onValueChanged.bind(this);
    }
    componentDidMount()
    {
        
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
                dataSource={this.state.items} 
                displayExpr={this.props.displayExpr} 
                valueExpr={this.props.valueExpr}
                defaultValue={this.props.defaultValue}
                onValueChanged={this.onValueChanged}
                />
            </div>
        </div>)
    }
}