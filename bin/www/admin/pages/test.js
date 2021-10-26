import React from 'react';
import NdTextBox from '../../core/react/devex/textbox.js';
import NdPopUp from '../../core/react/devex/popup.js';
//import NdGrid,{Column} from '../../core/react/devex/grid.js';
import NdSelectBox from '../../core/react/devex/selectbox.js';
import App from '../lib/app.js';
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
        // this.test.setState(
        //     {
        //         showBorders : false,
        //         width : '100%',
        //         height : '100%',
        //         selection : {mode:"multiple"}
        //     }
        // )
        // this.test.refresh({query : {query:"SELECT * FROM USERS "}})
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
    rowRender(e)
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
                    <div className = "col-1">
                        <label>DENEME</label>
                    </div>
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
                    <div className="col-4">
                        <NdSelectBox 
                        id = "sbDepo"             //LISANSLAMA İŞLEMİ İÇİN KULLANILACAK
                        displayExpr = "NAME"      //KEY
                        valueExpr = "ID"          //VALUE
                        defaultValue = "003"      //{0} - '003' Şeklinde kullanılır.Index veya değer şeklinde verilir.
                        items = {this.items} 
                        option={{title:"Depo :",titleAlign:"left"}} ></NdSelectBox>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-12">
                        <NdGrid id="test" parent={this} onSelectionChanged={this.onSelectionChanged} core={this.core} rowRender={this.rowRender}> 
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
                </div> */}
                <div>
                    <NdPopUp id="pop" parent={this} showTitle={true} container={".dx-multiview-wrapper"} of={"#page"} width={'90%'} height={'90%'} title={'Bilgi'} showCloseButton={true}>
                    
                    </NdPopUp>
                </div>
          
            </div>
        )
    }
}