import React from 'react';
import { datatable } from '../../core.js';

export default class Base extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            data : props.data
        }
        // GÖRÜNÜR DURUMU. YETKİLENDİRME.

        if(typeof this.props.access != 'undefined' && typeof this.props.access.getValue().visible != 'undefined')
        {   
            this.state.visible = this.props.access.getValue().visible
        }
        else
        {
            this.state.visible = true;
        }

        if(typeof this.props.parent != 'undefined' && typeof this.props.id != 'undefined')
        {
            this.props.parent[this.props.id] = this
        }
    }
}