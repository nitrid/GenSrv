import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {core} from '../../core/core.js'
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import moment from 'moment';
// import momLocFr from 'moment-localization-fr'

import Drawer from 'devextreme-react/drawer';
import Toolbar from 'devextreme-react/toolbar';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';

import HTMLReactParser from 'html-react-parser';

import Navigation from './navigation.js'
import Panel from './panel.js'
import Login from './login.js'

export default class App extends React.Component
{
    static instance = null;

    constructor()
    {
        super();

        locale('en');

        this.style =
        {
            splash_body : 
            {
                backgroundColor : '#ecf0f1',                
                height: '100%',
            },
            splash_box :
            {
                position: 'relative',
                margin:'auto',
                top: '30%',
                width: '400px',
                height: 'fit-content',
            }
        }
        this.state = 
        {
            opened : true,
            logined : false,
            connected : false,
            splash : 
            {
                type : 0,
                headers : 'Warning',
                title : 'Sunucu ile bağlantı kuruluyor.',
            },
            vtadi : ''
        }
        this.toolbarItems = 
        [{
            widget : 'dxButton',
            location : 'before',
            options : 
            {
                icon : 'menu',
                onClick : () => this.setState({opened: !this.state.opened})
            }
        }];
        
        this.core = new core(window.location.origin);
        this.textValueChanged = this.textValueChanged.bind(this)
        this.onDbClick = this.onDbClick.bind(this)

        if(!App.instance)
        {
            App.instance = this;
        }

        this.core.socket.on('connect',async () => 
        {
            if((await this.core.sql.try()).status == 1)
            {
                let tmpSplash = 
                {
                    type : 0,
                    headers : 'Warning',
                    title: 'Sql sunucuya bağlanılamıyor.',
                }
                App.instance.setState({logined:false,connected:false,splash:tmpSplash});
            }
            else if((await this.core.sql.try()).status == 2)
            {
                let tmpSplash = 
                {
                    type : 1,
                    headers : 'Veritabanı yok. Oluşturmak istermisiniz.',
                    title: '',
                }

                App.instance.setState({logined:false,connected:false,splash:tmpSplash});
            }
            else
            {
                let tmpSplash = 
                {
                    type : 0,
                    headers : 'Warning',
                    title : 'Sunucu ile bağlantı kuruluyor.',
                }
                App.instance.setState({splash:tmpSplash});
            }
            //SUNUCUYA BAĞLANDIKDAN SONRA AUTH ILE LOGIN DENETLENIYOR
            if((await this.core.auth.login(window.sessionStorage.getItem('auth'),'ADMIN')))
            {
                //ADMIN PANELINE YANLIZCA ADMINISTRATOR ROLUNDEKİ KULLANICILAR GİREBİLİR...
                if(this.core.auth.data.ROLE == 'Administrator')
                {
                    App.instance.setState({logined:true,connected:true});
                }
                else
                {
                    App.instance.setState({logined:false,connected:true});
                }
            }
            else
            {
                App.instance.setState({logined:false,connected:true});
            }
        })
        this.core.socket.on('connect_error',(error) => 
        {
            this.setState({connected:false});
        })
        this.core.socket.on('disconnect',async () => 
        {
            App.instance.setState({connected:false});
            this.core.auth.logout()
        })
    }
    menuClick(data)
    {
        if(typeof data.path != 'undefined')
        {
            Panel.instance.addPage(data);
        }
    }
    textValueChanged(e) 
    {      
        if(e.element.id == 'VtAdi')
        {
            this.setState({vtadi: e.value});
        } 
    }
    async onDbClick(e)
    {
        if(this.state.vtadi == '')
        {
            return;
        }

        let tmpResult = await this.core.sql.createDb(this.state.vtadi)
        if(tmpResult.msg == "")
        {
            let tmpSplash = 
            {
                type : 1,
                headers : 'Veritabanı yok. Oluşturmak istermisiniz.',
                title: 'Vt kurulumu başarılı.Lütfen config dosyasını kontrol edip sunucuyu restart ediniz.',
            }
            App.instance.setState({logined:false,connected:false,splash:tmpSplash});
        }
        else
        {
            let tmpSplash = 
            {
                type : 1,
                headers : 'Veritabanı yok. Oluşturmak istermisiniz.',
                title: tmpResult.msg,
            }
            App.instance.setState({logined:false,connected:false,splash:tmpSplash});
        }
    }
    render() 
    {
        const { opened,logined,connected,splash } = this.state;

        if(!connected)
        {
            //SPLASH EKRANI
            if(splash.type == 0)
            {
                //BAĞLANTI YOKSA YA DA SQL SUNUCUYA BAĞLANAMIYORSA...
                return(
                    <div style={this.style.splash_body}>
                        <div className="card" style={this.style.splash_box}>
                            <div className="card-header">{splash.headers}</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 pb-2">
                                        <h5 className="text-center">{splash.title}</h5>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                )                
            }
            else
            {
                //VERITABANI OLUŞTURMAK İÇİN AÇILAN EKRAN.
                return(
                    <div style={this.style.splash_body}>
                        <div className="card" style={this.style.splash_box}>
                            <div className="card-header" style={{height:'40px'}}>{splash.headers}</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 pb-2">
                                        <h6 className="text-center">{splash.title}</h6>
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">Veritabanı Adı</div>
                                    <div className="dx-field-value">
                                        <TextBox id="VtAdi" showClearButton={true} height='fit-content' valueChangeEvent="keyup" onValueChanged={this.textValueChanged} />
                                    </div>
                                </div>
                                <div className="dx-field">
                                    <Button
                                        width={'100%'}
                                        height='fit-content'
                                        text="Oluştur"
                                        type="default"
                                        stylingMode="contained"
                                        onClick={this.onDbClick}
                                    />
                                </div>
                            </div>                        
                        </div>
                    </div>
                )                
            }
        }
        if(!logined)
        {
            return <Login />
        }
        
        return (
            <div>
                <div className="top-bar">
                    <Toolbar className="main-toolbar" items={this.toolbarItems }/>
                </div>
                <div>
                    <Drawer className="main-drawer" opened={opened} openedStateMode={'shrink'} position={'left'} 
                        revealMode={'slide'} component={Navigation} >
                        <Panel />
                    </Drawer>
                </div>
            </div>
        );
    }
}