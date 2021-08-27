import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Core from '../../corelib/core.js'

import Drawer from 'devextreme-react/drawer';
import Toolbar from 'devextreme-react/toolbar';

import HTMLReactParser from 'html-react-parser';

import Login from './login.js'
import Navigation from './navigation.js'
import Panel from './panel.js'

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
                onClick : () => this.setState({ opened: !this.state.opened })
            }
        }];
        this.core = Core.coreobj;
        
        if(!App.instance)
        {
            App.instance = this;
        }

        this.core.socket.on('connect',() => 
        {
            this.core.socket.emit('login',[window.sessionStorage.getItem('auth')],async (data) =>
            {
                if(data.length > 0)
                {
                    window.sessionStorage.setItem('auth',data[0].SHA)
                    App.instance.setState(
                    {
                        logined:true,
                        connected:true
                    });
                }
                else
                {
                    window.sessionStorage.removeItem('auth')
                    App.instance.setState(
                    {
                        logined:false,
                        connected:true
                    });
                }
            });
        });
        this.core.socket.on('connect_error',(error) => 
        {
            this.setState({connected:false});
        });


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