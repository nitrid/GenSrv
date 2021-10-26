import React from 'react';
import NdTextBox from '../../core/react/devex/textbox.js';
import NdPopUp from '../../core/react/devex/popup.js';
import NdGrid,{Column} from '../../core/react/devex/grid.js';
import App from '../lib/app.js';
import { datatable } from '../../core/core.js';
export default class Test extends React.Component
{
    constructor(props)
    {
        super(props)
        this.core = App.instance.core;
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }
    componentDidMount() 
    {
        //this.txtSeri.value = "aa"
        this.txtSira.value = "100"
        //this.pop.show()
        this.test.setState(
            {
                showBorders : false,
                width : '100%',
                height : '100%',
                selection : {mode:"multiple"}
            }
        )
        this.test.refresh({query : {query:"SELECT * FROM USERS "}})
        // console.log(this.test.devGrid.columnOption(0))
    }
    onSelectionChanged(e)
    {
        if(e.selectedRowsData.length > 0)
        {
            this.txtSira.value = e.selectedRowsData[0].ROLE
        }
    }
    cellRender(data) 
    {
        return <div>{data.value} Allll</div>
    }
    onRowRender(e)
    {
        return (
            <tbody className="dx-row">
            <tr className="main-row">
                <td>{e.data.CODE}</td>
                <td>{e.data.NAME}</td>
            </tr>
            </tbody>
        )
    }
    render()
    {
        return (
            <div>
                <div className="row">
                    <div className="col-3">
                        <NdTextBox id="txtSeri" parent={this} option={{title:"Seri :",titleAlign:"left"}}
                            lang={"tr"} param={this.param} auth={""} />
                    </div>
                    <div className="col-3">
                        <NdTextBox id="txtSira" parent={this}/>
                    </div>
                    <div className="col-3">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <NdGrid id="test" parent={this} onSelectionChanged={this.onSelectionChanged} core={this.core} onRowRender={this.onRowRender}> 
                            <Column
                            dataField="CODE"
                            dataType="string"
                            cellRender={this.cellRender}
                            name="GRD001"
                            />
                            <Column
                            dataField="NAME"
                            dataType="string"
                            name="GRD002"
                            />
                        </NdGrid>
                    </div>
                </div>
                <div>
                    <NdPopUp id="pop" parent={this} showTitle={true} container={".dx-multiview-wrapper"} of={"#page"} width={'90%'} height={'90%'} title={'Bilgi'} showCloseButton={true}>
                    
                    </NdPopUp>
                </div>
            </div>
        )
    }
}