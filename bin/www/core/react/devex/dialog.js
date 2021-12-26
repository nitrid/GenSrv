import React from 'react';
import ReactDOM from 'react-dom';
import Base from './base.js';
import NdPopUp,{ToolbarItem,Position} from './popup.js';

export default class NdDialog extends Base
{
    constructor(props)
    {
        super(props)
        
        this.state.show = typeof props.visible == 'undefined' ? false : props.visible
        this.state.closeOnOutsideClick = typeof props.closeOnOutsideClick == 'undefined' ? false : props.closeOnOutsideClick
        this.state.showCloseButton = typeof props.showCloseButton == 'undefined' ? true : props.showCloseButton
        this.state.showTitle = typeof props.showTitle == 'undefined' ? false : props.showTitle
        this.state.title = typeof props.title == 'undefined' ? '' : props.title
        this.state.container = typeof props.container == 'undefined' ? undefined : props.container
        this.state.width = typeof props.width == 'undefined' ? 'auto' : props.width
        this.state.height = typeof props.height == 'undefined' ? 'auto' : props.height
        this.state.position = typeof props.position == 'undefined' ? undefined : props.position

        this._onHiding = this._onHiding.bind(this);

        this.result = null;
    }
    _onHiding() 
    {        
        if(typeof this.props.onHiding != 'undefined')
        {
            this.props.onHiding();
        }
    }
    async show()
    {
        this.result = null;

        this.setState({show:true})
        return new Promise(async resolve => 
        {
            this._onClick = function(e)
            {
                this.result = e;
                this.hide();
                resolve(e)
            }
        });
    }
    hide()
    {
        this.setState({show:false})
    }
    _buttonView(props)
    {
        if(typeof props != 'undefined')
        {
            let tmp = []
            for (let i = 0; i < props.length; i++) 
            {
                tmp.push (
                    <ToolbarItem key={props[i].id}
                    widget="dxButton"
                    toolbar="bottom"
                    location={props[i].location}
                    options=
                    {
                        {
                            icon: props[i].icon,
                            text: props[i].caption,
                            onClick: (function()
                            {
                                this._onClick(props[i].id)
                            }).bind(this),
                        }
                    }
                    />
                )
            }
            return tmp;
        }
    }
    render()
    {
        return (
            <NdPopUp parent={this} id={"dia_" + this.props.id} 
            visible={this.state.show}
            onHiding={this._onHiding}
            closeOnOutsideClick={this.state.closeOnOutsideClick}
            showCloseButton={this.state.showCloseButton}
            showTitle={this.state.showTitle}
            title={this.state.title}
            container={this.state.container}
            width={this.state.width}
            height={this.state.height}
            position={this.state.position}
            scroll={false}
            >
                <Position
                at="bottom"
                my="center"
                of={''}
                />
                {this._buttonView(this.props.button)}
                {this.props.children}
            </NdPopUp>
        )
    }
}

export const dialog = function()
{            
    return new Promise(async resolve => 
    {
        if(arguments.length == 0)
        {
            resolve();
        }

        let tmpObj = React.createRef();
        let tmpJsx = 
        (
            <NdDialog ref={tmpObj} id={arguments[0].id} container={".dx-multiview-wrapper"}
            position={{of:typeof arguments[0].position == 'undefined' ? '#page' : arguments[0].position}} 
            showTitle={arguments[0].showTitle} 
            title={arguments[0].title} 
            showCloseButton={arguments[0].showCloseButton}
            width={arguments[0].width}
            height={arguments[0].height}
            button={arguments[0].button}
            onHiding={()=>
            {
                if(tmpObj.current.result == null)
                {
                    resolve()
                }
            }}
            >
                <div className="row">
                    <div className="col-12 py-2">
                        {arguments[0].content}
                    </div>
                </div>
            </NdDialog>
        )
        
        ReactDOM.render(tmpJsx,document.body.appendChild(document.createElement('div',{id:'dialog'})));
        resolve(await tmpObj.current.show())
    });
}