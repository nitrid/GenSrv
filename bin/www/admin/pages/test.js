import React from 'react';
import NdTextBox from '../../core/react/devex/textbox.js';
import NdPopUp from '../../core/react/devex/popup.js';
import NdGrid from '../../core/react/devex/grid.js';
import NdSelectBox from '../../core/react/devex/selectbox.js';
import App from '../lib/app.js';
import { datatable } from '../../core/core.js';

export default class Test extends React.Component
{
    constructor(props)
    {
        super(props)
        this.core = App.instance.core;
        //this.sysprm = this.param.
        this.onSelectionChanged = this.onSelectionChanged.bind(this);

        //console.log(this.access.filter({ELEMENT:'txtSeri',USERS:this.user.CODE}))
        //this.param.filter({ELEMENT:'txtS'}).setValue({"KODU":"001"})
        //this.param.add({ID:"001",VALUE:"test"})
        //this.param.filter({ELEMENT_ID:'txtSeri'}).setValue()
        // this.access.filter({ELEMENT:'txtSeri',USERS:this.user.CODE}).setValue({"editable":true})
        // this.access.add({ID:"001",VALUE:"test"})
    }
    async componentDidMount() 
    {
        //this.txtSeri.value = "aa"
        //this.txtSira.value = "100"
        // await this.access.save()
        //await this.param.save()
        //console.log(this.param)
        //this.pop.show()
        // this.test.setState(
        //     {
        //         showBorders : true,
        //         width : '100%',
        //         height : '100%',
        //         selection : {mode:"multiple"}
        //     }
        // )
        
        // let source = 
        // {
        //     source : 
        //     {
        //         select : 
        //         {
        //             query : "SELECT * FROM USERS ",
        //         },
        //         update : 
        //         {
        //             query : "UPDATE USERS SET NAME = @NAME WHERE CODE = @CODE",
        //             param : ['CODE:string|25','NAME:string|25']
        //         },
        //         insert : 
        //         {
        //             query : "INSERT INTO USERS (CODE,NAME,PWD,ROLE,SHA,STATUS) VALUES (@CODE,@NAME,'','','',1) ",
        //             param : ['CODE:string|25','NAME:string|25']
        //         },
        //         sql : this.core.sql
        //     }
        // }
        // await this.test.dataRefresh(source);

        let tmp = 
        {
            source:
            {
                select : 
                {
                    query : "SELECT CODE,NAME,GUID FROM USERS ",
                },
                sql : this.core.sql
            }
        }
        await this.sbDepo.dataRefresh(tmp)
    }
    onSelectionChanged(e)
    {
        if(e.selectedRowsData.length > 0)
        {
            this.txtSira.value = e.selectedRowsData[0].ROLE
        }
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
                            lang={"tr"} 
                            param={this.param.filter({ELEMENT:'txtSeri',USERS:this.user.CODE})} 
                            access={this.access.filter({ELEMENT:'txtSeri',USERS:this.user.CODE})} />
                    </div>
                    <div className="col-3">
                        <NdTextBox id="txtSira" parent={this}
                            param={this.param.filter({ELEMENT:'txtSira',USERS:this.user.CODE})} 
                            access={this.access.filter({ELEMENT:'txtSira',USERS:this.user.CODE})} />
                    </div>
                    <div className="col-3">
                        <NdTextBox id="txtBelge" parent={this}
                                param={this.param.filter({ELEMENT:'txtBelge',USERS:this.user.CODE})} 
                                access={this.access.filter({ELEMENT:'txtBelge',USERS:this.user.CODE})} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <NdSelectBox 
                        parent={this}                             
                        id = "sbDepo"                             
                        displayExpr = "NAME"                       
                        valueExpr = "CODE"      
                        defaultValue = "Ali"
                        // store = {[{"KEY":"MAHİR","VALUE":"001"},{"KEY":"FURKAN","VALUE":"002"}]} 
                        option={{title:"Depo :",titleAlign:"left"}} ></NdSelectBox>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {/* <NdGrid id="test" parent={this} onSelectionChanged={this.onSelectionChanged} 
                           selection={{mode:"multiple"}} data={{source: {select : {query:"SELECT * FROM USERS "},sql : this.core.sql}}}
                           param={this.param.filter({ELEMENT:'test',USERS:this.user.CODE})} 
                           access={this.access.filter({ELEMENT:'test',USERS:this.user.CODE})}
                           editing=
                           {
                               {
                                    mode:"batch",
                                    allowUpdating:true,
                                    allowAdding:true,
                                    allowDeleting:true
                               }
                           }
                           columns=
                           {
                               [
                                    {
                                        dataField:"CODE",
                                        caption:"KODU"
                                    },
                                    {
                                        dataField:"NAME",
                                        caption:"ADI"
                                    }
                               ]
                           }
                        > 
                        </NdGrid> */}
                    </div>
                </div>
                <div>
                    <NdPopUp id="pop" parent={this} showTitle={true} container={".dx-multiview-wrapper"} of={"#page"} width={'90%'} height={'90%'} title={'Bilgi'} showCloseButton={true}>
                    
                    </NdPopUp>
                </div>
                <div>ALI KEMAL</div>
            </div>
        )
    }
}