import React from 'react';
import NdPopUp from './popup.js';
import NdGrid from './grid.js';

export default class NdPopGrid extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return (
            <div>
                <NdPopUp id="pop" parent={this} showTitle={true} container={".dx-multiview-wrapper"} of={"#page"} width={'90%'} height={'90%'} title={'Bilgi'} showCloseButton={true}>
                </NdPopUp>
            </div>
        )
    }
}