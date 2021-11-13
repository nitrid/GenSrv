import React from 'react';
import {Button} from 'devextreme-react/button';
import Base from './base.js';

export default class NdButton extends Base
{
    constructor(props)
    {
        super(props)

        this.state.text = typeof props.text == 'undefined' ? '' : props.text;
        this.state.width = typeof props.width == 'undefined' ? undefined : props.width;
        this.state.height = typeof props.height == 'undefined' ? undefined : props.height;
        this.state.type = typeof props.type == 'undefined' ? 'normal' : props.type;
        this.state.stylingMode = typeof props.stylingMode == 'undefined' ? 'contained' : props.stylingMode;
        
        this._onClick = this._onClick.bind(this);
    }
    //#region Private
    _onClick()
    {
        if(typeof this.props.onClick != 'undefined')
        {
            this.props.onClick();
        }
    }
    //#endregion
    render()
    {
        // YETKİLENDİRMEDEN GELEN GÖRÜNÜR GÖRÜNMEZ DURUMU. DEĞER BASE DEN GELİYOR.
        if(this.state.visible == false)
        {
            return <div></div>
        }

        return (
            <Button text={this.state.text} width={this.state.width} height={this.state.height} type={this.state.type} stylingMode={this.state.stylingMode}
                onClick={this._onClick}
            />
        )
    }
}