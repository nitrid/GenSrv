import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as core from '../../corelib/core.js'

import Drawer from 'devextreme-react/drawer';
import Toolbar from 'devextreme-react/toolbar';

import HTMLReactParser from 'html-react-parser';

import Menu from './menu.js'
import PagePanel from './page_panel.js'

export default class App extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            opened : true
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
    }
    render() 
    {
        const { opened } = this.state;
        return (
            <div>
                <div className="top-bar">
                    <Toolbar className="main-toolbar" items={this.toolbarItems }/>
                </div>
                <div>
                    <Drawer className="main-drawer" opened={opened} openedStateMode={'shrink'} position={'left'} 
                        revealMode={'slide'} component={Menu} >
                        <PagePanel />
                    </Drawer>
                </div>
            </div>
        );
    }
}