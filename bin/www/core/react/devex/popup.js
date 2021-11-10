import React from 'react';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import Base from './base.js';

export default class NdPopUp extends Base
{
    constructor(props)
    {
        super(props);
        
        this.state.show = typeof props.visible == 'undefined' ? false : props.visible
        this.state.type = typeof props.type == 'undefined' ? '' : props.type
        this.state.dragEnabled = typeof props.dragEnabled == 'undefined' ? false : props.dragEnabled
        this.state.closeOnOutsideClick = typeof props.closeOnOutsideClick == 'undefined' ? false : props.closeOnOutsideClick
        this.state.showCloseButton = typeof props.showCloseButton == 'undefined' ? false : props.showCloseButton
        this.state.showTitle = typeof props.showTitle == 'undefined' ? false : props.showTitle
        this.state.title = typeof props.title == 'undefined' ? '' : props.title
        this.state.container = typeof props.container == 'undefined' ? undefined : props.container
        this.state.width = typeof props.width == 'undefined' ? 'auto' : props.width
        this.state.height = typeof props.height == 'undefined' ? 'auto' : props.height
        this.state.position = typeof props.position == 'undefined' ? undefined : props.position
        this.state.at = typeof props.at == 'undefined' ? "center" : props.at
        this.state.my = typeof props.my == 'undefined' ? "center" : props.my
        this.state.of = typeof props.of == 'undefined' ? "" : props.of
        
        this.onHiding = this.onHiding.bind(this);
    }
    componentDidMount()
    {
    }  
    componentWillReceiveProps(pProps) 
    {
        this.setState(
            {
                show : pProps.visible,
                dragEnabled : pProps.dragEnabled,
                showCloseButton : pProps.showCloseButton,
                showTitle : pProps.showTitle,
                title : pProps.title,
                width : pProps.width,
                height : pProps.height,
                position : pProps.position
            }
        )       
    }  
    show()
    {      
        this.setState(
        {
            show: true
        });
    } 
    hide()
    {      
        this.setState(
        {
            show: false
        });
    }    
    setTitle(pVal)
    {
        this.setState(
        {
            showTitle: true,
            title: pVal
        });
    }
    onHiding() 
    {
        if(typeof this.props.onHiding != 'undefined')
        {
            this.props.onHiding();
        }
        this.setState(
        {
            show: false            
        });
    }
    render()
    {   
        return (
            <React.Fragment>
                <Popup
                    visible={this.state.show}
                    onHiding={this.onHiding}
                    dragEnabled={this.state.dragEnabled}
                    closeOnOutsideClick={this.state.closeOnOutsideClick}
                    showCloseButton={this.state.showCloseButton}
                    showTitle={this.state.showTitle}
                    title={this.state.title}
                    container={this.state.container}
                    width={this.state.width}
                    height={this.state.height}
                    position={this.state.position}
                    >
                    <ScrollView width='100%' height='100%'>
                            {this.props.children}
                    </ScrollView>
                </Popup>
            </React.Fragment>
        )
    }
}