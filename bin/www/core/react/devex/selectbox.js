import React from 'react';
import SelectBox from 'devextreme-react/select-box';

export default class NdSelectBox extends React.Component
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
            },
            dataSource : typeof props.dataSource == 'undefined' ? undefined : props.dataSource,
            store : typeof props.store == 'undefined' ? undefined : props.store,
        }

        if(typeof this.props.store != "undefined")
        {
            this.state.store = this.props.store;
        }
        if(this.state.store.length > 0)
        {
            if(typeof this.props.defaultValue == 'number')
            {
                this.state.defaultValue = this.state.store[this.props.defaultValue][this.props.valueExpr];
            }
            else if(typeof this.props.defaultValue == 'string' && this.props.defaultValue != "")
            {
                this.state.defaultValue = this.props.defaultValue;
            }
            else
            {
                this.state.defaultValue = this.state.store[0][Object.keys(this.state.store[0]).find(e => e == this.props.valueExpr)];
            }
        }

       this.onValueChanged = this.onValueChanged.bind(this);

       if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
       {
           this.props.parent[this.props.id] = this
       }
    }
    componentDidMount()
    {
        
    }
    onValueChanged(e) 
    {
        this.setState({value: e.value});
    }
    refresh(e)
    {
        if(typeof e != 'undefined' && Array.isArray(e))
        {
            this.setState(
            { 
                dataSource : e,
                store : new CustomStore(
                {
                    load: function()
                    {
                        return new Promise(resolve => 
                        {
                            resolve({data: e});
                        });
                    }
                })
            });
        }
        else if (typeof e != 'undefined' && typeof e == 'object')
        {
            let tmpThis = this;
            this.setState(
            { 
                dataSource : e,
                store : new CustomStore(
                {
                    load: function()
                    {                        
                        return new Promise(async resolve => 
                        {
                            if(typeof tmpThis.props.core != 'undefined' && typeof e.query != 'undefined')
                            {
                                let tmpDt = new datatable('');
                                tmpDt.sql = tmpThis.props.core.sql
                                tmpDt.selectCmd = e.query;
                                await tmpDt.refresh()
                                resolve({data: tmpDt.toArray()});
                            }
                        });
                    }
                })
            });
        }
    }
    render()
    {
        return (
        <div className="dx-field">
            <div className="dx-field-label">{this.state.option.title}</div>
            <div className="dx-field-value">
                <SelectBox 
                dataSource={this.state.store} 
                displayExpr={this.props.displayExpr} 
                valueExpr={this.props.valueExpr}
                defaultValue={this.state.defaultValue}
                onValueChanged={this.onValueChanged}
                />
            </div>
        </div>)
    }
}