import React from 'react';
import NdTextBox from '../../core/react/devex/textbox.js';
import App from '../lib/app.js';

export default class Test extends React.Component
{
    constructor(props)
    {
        super(props)
        this.core = App.instance.core;
    }
    componentDidMount() 
    {
        //this.txtSeri.value = "aa"
        this.txtSira.value = "100"
    }
    render()
    {
        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <NdTextBox id="txtSeri" parent={this} option={{title:"Seri :",titleAlign:"top"}}
                        lang={"tr"} param={this.param} auth={""} />
                    </div>
                    <div className="col-4">
                        <NdTextBox id="txtSira" parent={this}/>
                    </div>
                    <div className="col-4">
                        <NdTextBox id="txtBelgeNo" parent={this} />
                    </div>
                </div>
            </div>
        )
    }
}