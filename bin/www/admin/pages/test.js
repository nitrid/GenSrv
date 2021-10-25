import React from 'react';
import NdTextBox from '../../core/react/devex/textbox.js';
import NdPopUp from '../../core/react/devex/popup.js';
import NdGrid from '../../core/react/devex/grid.js';
import App from '../lib/app.js';
import { datatable } from '../../core/core.js';

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
        console.log(this)
        //this.test.refresh([{query:"SELECT * FROM STOKLARSSS"},{query:"SELECT * FROM STOKLAR"}])
    }
    render()
    {
        return (
            <div>
                <div className="row">
                    <div className="col-3">
                        <NdTextBox id="txtSeri" parent={this} option={{title:"Seri :",titleAlign:"bottom"}}
                            lang={"tr"} param={this.param} auth={""} />
                    </div>
                    <div className="col-3">
                        <NdTextBox id="txtSira" parent={this}/>
                    </div>
                    <div className="col-3">
                    <NdGrid id="test" parent={this} 
                        allowColumnReordering={true}
                        showBorders={true} dataSource={{query:"SELECT * FROM STOKLAR",core:this.core}}
                    />
                    </div>
                </div>
                <div>
                    <NdPopUp parent={this} showTitle={true} container={".dx-multiview-wrapper"} of={"#page"} width={'90%'} height={'90%'} title={'Bilgi'} showCloseButton={true}>
                    
                    </NdPopUp>
                </div>
            </div>
        )
    }
}