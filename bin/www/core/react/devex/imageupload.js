import React from 'react';
import Base from './base.js';

import FileUploader from 'devextreme-react/file-uploader';
import ProgressBar from 'devextreme-react/progress-bar';

export default class NdImageUpload extends Base
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            isDropZoneActive: false,
            imageSource: '',
            textVisible: true,
        };

        this.allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

        this._onDropZoneEnter = this._onDropZoneEnter.bind(this);
        this._onDropZoneLeave = this._onDropZoneLeave.bind(this);
        this._onValueChanged = this._onValueChanged.bind(this);
    }
    //#region Private
    _onDropZoneEnter(e) 
    {
        if (e.dropZoneElement.id === 'dropzone-external') 
        {
            this.setState({isDropZoneActive: true});
        }
    }
    _onDropZoneLeave(e) 
    {
        if (e.dropZoneElement.id === 'dropzone-external') 
        {
            this.setState({isDropZoneActive: false});
        }
    }
    _onValueChanged(e)
    {
        const file = e.value[0];
        const fileReader = new FileReader();

        fileReader.onload = (e) => 
        {
            var img = new Image();
            img.src = e.target.result;  

            img.onload = (function() 
            {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = 120;
                canvas.height = canvas.width * (img.height / img.width);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                var data = canvas.toDataURL('image/png');
                
                this.setState({textVisible: false,isDropZoneActive: false,imageSource: data});

                if(typeof this.props.onValueChanged != 'undefined')
                {
                    this.props.onValueChanged(data);
                }
            }).bind(this)
            
        };
        fileReader.readAsDataURL(file);        
    }
    //#endregion
    get value()
    {
        return this.state.imageSource;
    }
    set value(e)
    {
        //VALUE DEĞİŞTİĞİNDE BU DEĞİŞİKLİK DATATABLE A YANSITMAK İÇİN YAPILDI.
        if(typeof this.props.dt != 'undefined' && typeof this.props.dt.data != 'undefined' && this.props.dt.data.length > 0 && typeof this.props.dt.field != 'undefined')
        {            
            if(typeof this.props.dt.filter == 'undefined')
            {
                if(typeof this.props.dt.row != 'undefined' && typeof this.props.dt.data.find(x => x === this.props.dt.row) != 'undefined')
                {
                    this.props.dt.data.find(x => x === this.props.dt.row)[this.props.dt.field] = e
                }
                else
                {
                    this.props.dt.data[this.props.dt.data.length-1][this.props.dt.field] = e
                }
            }   
            else
            {
                let tmpData = this.props.dt.data.where(this.props.dt.filter);
                if(tmpData.length > 0)
                {
                    if(typeof this.props.dt.row != 'undefined' && typeof tmpData.find(x => x === this.props.dt.row) != 'undefined')
                    {
                        tmpData.find(x => x === this.props.dt.row)[this.props.dt.field] = e
                    }
                    else
                    {
                        tmpData[tmpData.length-1][this.props.dt.field] = e
                    }
                }
            }
        }
        this.setState({textVisible: false,isDropZoneActive: false,imageSource: e});
    }
    render()
    {
        const {isDropZoneActive,imageSource,textVisible} = this.state;

        return (
            <div className="widget-container flex-box">
                <div id="dropzone-external" className={`flex-box ${isDropZoneActive ? 'dx-theme-accent-as-border-color dropzone-active' : 'dx-theme-border-color'}`}>
                    {imageSource && <img style={{width:"100%",height:"100%"}} id="dropzone-image" src={imageSource} alt="" />}
                    {textVisible && <div id="dropzone-text" className="flex-box">
                        <span>Drag & Drop the desired file</span>
                        <span>…or click to browse for a file instead.</span>
                    </div>}
                </div>
                <FileUploader
                id="file-uploader"
                dialogTrigger="#dropzone-external"
                dropZone="#dropzone-external"
                multiple={false}
                uploadMode="useButtons"
                allowedFileExtensions={this.allowedFileExtensions}
                visible={false}
                onDropZoneEnter={this._onDropZoneEnter}
                onDropZoneLeave={this._onDropZoneLeave}
                onValueChanged={this._onValueChanged}
                ></FileUploader>
            </div>
        )
    }
}