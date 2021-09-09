import React from 'react';
import App from '../../../admin/lib/app.js';
import DataGrid, {Column,Grouping,GroupPanel,Pager,Paging,SearchPanel} from 'devextreme-react/data-grid';
import DropDownButton from 'devextreme-react/drop-down-button';

export default class LicenceList extends React.Component
{
    constructor()
    {
        super()
        this.state = 
        {
            macid : '',
            data : []
        }

        App.instance.core.socket.emit('lic',{cmd:"get_macid"},(pData) =>
        {
            this.setState({macid:pData})
        })
        App.instance.core.socket.emit('lic',{cmd:"get_lic"},(pData) =>
        {
            console.log(pData)
            this.setState({data:pData})
        })
    }
    render()
    {
        return(
            <div style={{padding:'10px',height:'100%'}}>
                <div className='row pb-2' style={{height:'5%'}}>
                    <div className='col-6'>
                        Macid : {this.state.macid}
                    </div>
                    <div className='col-6'>
                        <DropDownButton className='float-end'
                            text="İşlemler"
                            dropDownOptions={{ width: '200' }}
                            items={['Lisans Ekle','Lisans Sil']}
                            // onItemClick={this.onItemClick}
                        />
                    </div>
                </div>
                <div className='row' style={{height:'95%'}}>
                    <div className='col-12'>
                        <DataGrid
                            dataSource={this.state.data}
                            selection={{ mode: 'single' }}
                            columnAutoWidth={true}
                            width={'100%'}
                            showRowLines={true}
                            showBorders={true}
                            allowColumnReordering={true}
                            height={'100%'}>
          
                            <Column caption="UYGULAMA" dataField="APP" dataType="string" width={100} />
                            <Column caption="KULLANICI SAYISI" dataField="USER_COUNT" dataType="string" width={150} />
                            <Column caption="BAŞLANGIC TARİHİ" dataField="START_DATE" dataType="date" width={200} />
                            <Column caption="BİTİŞ TARİH" dataField="FINISH_DATE" dataType="date" width={200} />
                            <Column caption="KİRALIK" dataField="HIRE" dataType="bit" width={100} />
                            <Column caption="PAKET" dataField="PACKAGE" dataType="string" width={100} />
                            <Column caption="URL" dataField="APP_URL" dataType="string" width={300} />
                        </DataGrid>    
                    </div>
                </div>
            </div>
            
        )
    }
}