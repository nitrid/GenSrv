import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Core from '../../core/core.js'

import Drawer from 'devextreme-react/drawer';
import Toolbar from 'devextreme-react/toolbar';

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
        this.state = 
        {
            opened : true,
            logined : false,
            connected : false,
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
        this.core = Core.coreobj;
        
        if(!App.instance)
        {
            App.instance = this;
        }

        this.core.socket.on('connect',async () => 
        {
            if((await this.core.sql.try()) == 1)
            {
                console.log('Sql sunucuya bağlanılamıyor.')
            }
            else if((await this.core.sql.try()) == 2)
            {
                console.log('Veritabanı yok. Oluşturmak istermisiniz.')
            }
            //SUNUCUYA BAĞLANDIKDAN SONRA AUTH ILE LOGIN DENETLENIYOR
            if((await this.core.auth.login(window.sessionStorage.getItem('auth'))))
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
        })
    }
    menuClick(data)
    {
        if(typeof data.path != 'undefined')
        {
            Panel.instance.addPage(data);
        }
    }
    render() 
    {
        const { opened,logined,connected } = this.state;

        if(!connected)
        {
            return <div>Sunucuya bağlanılıyor lütfen bekleyin</div>
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