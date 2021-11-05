import React from 'react';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import Base from './base.js';

export default class NdPopUp extends Base
{
    constructor(props)
    {
        super(props);
        
        this.state.visible = false
        this.state.type = typeof props.type == 'undefined' ? '' : props.type
        this.state.datasource = typeof props.datasource == 'undefined' ? undefined : props.datasource
        this.state.dragEnabled = typeof props.dragEnabled == 'undefined' ? false : props.dragEnabled
        this.state.closeOnOutsideClick = typeof props.closeOnOutsideClick == 'undefined' ? false : props.closeOnOutsideClick
        this.state.showCloseButton = typeof props.showCloseButton == 'undefined' ? false : props.showCloseButton
        this.state.showTitle = typeof props.showTitle == 'undefined' ? false : props.showTitle
        this.state.title = typeof props.title == 'undefined' ? '' : props.title
        this.state.container = typeof props.container == 'undefined' ? undefined : props.container
        this.state.width = typeof props.width == 'undefined' ? 'auto' : props.width
        this.state.height = typeof props.height == 'undefined' ? 'auto' : props.height
        this.state.at = typeof props.at == 'undefined' ? "center" : props.at
        this.state.my = typeof props.my == 'undefined' ? "center" : props.my
        this.state.of = typeof props.of == 'undefined' ? "" : props.of
        
        this.onHiding = this.onHiding.bind(this);
        this.setOffset = this.setOffset.bind(this);
    }
    show()
    {
        this.setState(
        {
            visible: true
        });
    }
    setDataSource(pDs)
    {
        if(typeof pDs != 'undefined' || Array.isArray(pDs))
        {
            
        }
    }
    setOffset(x,y)
    {
        this.setState(
        {
            of: x + " " + y
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
    setWidth(pVal)
    {
        this.setState(
        {
            width: pVal
        });
    }
    setHeight(pVal)
    {
        this.setState(
        {
            height: pVal
        });
    }
    onHiding() 
    {
        this.setState(
        {
            visible: false            
        });
    }
    render()
    {
        return (
            <Popup
                visible={this.state.visible}
                onHiding={this.onHiding}
                dragEnabled={this.state.dragEnabled}
                closeOnOutsideClick={this.state.closeOnOutsideClick}
                showCloseButton={this.state.showCloseButton}
                showTitle={this.state.showTitle}
                title={this.state.title}
                container={this.state.container}
                width={this.state.width}
                height={this.state.height}
                >
                <Position of={this.state.of} my={this.state.my} at={this.state.at} />
                <ScrollView width='100%' height='100%'>
                        {this.props.children}
                    {/* <div id="textBlock">
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                        The <b>ScrollView</b> allows users to scroll its content vertically. To enable horizontal and vertical scrolling, set the <b>direction</b> option to <i>&quot;both&quot;</i>. Horizontal scrolling is available only if the content is wider than the <b>ScrollView</b>. Otherwise, the content adapts to the widget&apos;s width.<br /><br />The <b>ScrollView</b> uses native scrolling on most platforms, except desktops. To use it on all platforms, assign <b>true</b> to the <b>useNative</b> option. If you assign <b>false</b>, scrolling is simulated on all platforms.
                    </div> */}
                </ScrollView>
            </Popup>
        )
    }
}