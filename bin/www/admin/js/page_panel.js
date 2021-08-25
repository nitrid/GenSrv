import React from 'react';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';

export class Page extends React.Component
{
    constructor()
    {
        super()
    }
    render()
    {
        return(
            <React.Fragment>
                <div>Lorem ipsum </div>
            </React.Fragment>
        )
    }
}
const page_list = [];
export default class PagePanel extends React.Component
{
  static instance = null;
  constructor()
  {
    super()
    
    this.state =
    {
      dataSource : page_list,
      selectedIndex: 0
    }
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onTabDrop = this.onTabDrop.bind(this);
    this.renderTitle = this.renderTitle.bind(this);

    if(!PagePanel.instance)
    {
      PagePanel.instance = this;
    }
  }
  addPage(e)
  {
    this.setState(
    {
      dataSource: [...this.state.dataSource, {title:e.text}],
      selectedIndex: this.state.dataSource.length
    });
  }
  onTabDragStart(e) 
  {
    e.itemData = e.fromData[e.fromIndex];
  }
  onTabDrop(e) 
  {    
    const newPages = [...this.state.dataSource];

    newPages.splice(e.fromIndex, 1);
    newPages.splice(e.toIndex, 0, e.itemData);

    this.setState(
    {
      dataSource: newPages
    });
  }
  closeButtonHandler(e)
  {
    const newPages = [...this.state.dataSource];
    const index = this.state.selectedIndex;

    newPages.splice(index, 1);

    this.setState(
    {
      dataSource: newPages,
      selectedIndex : 0
    });
  }
  renderTitle(e) 
  {
    this.closeButtonHandler = this.closeButtonHandler.bind(this)
    
    return (
      <React.Fragment>
        <div>
          <span>
            {e.title}
          </span>
          {<i className="dx-icon dx-icon-close" onClick={this.closeButtonHandler} />}
        </div>
      </React.Fragment>
    );
  }
  onSelectionChanged(e)
  {
    if(e.name == 'selectedIndex') 
    {
      this.setState(
      {
        selectedIndex: e.value
      });
    }
  }
  render()
  {
    const { dataSource, selectedIndex } = this.state;
    
    return (
      <React.Fragment>
        <Sortable
          filter=".dx-tab"
          data={dataSource}
          itemOrientation="horizontal"
          dragDirection="horizontal"
          onDragStart={this.onTabDragStart}
          onReorder={this.onTabDrop}
        >
          <TabPanel id="test"
            dataSource={dataSource}
            height = {'100%'}
            itemTitleRender={this.renderTitle}
            deferRendering={false}
            showNavButtons={true}
            selectedIndex={selectedIndex}
            repaintChangesOnly={true}
            onOptionChanged={this.onSelectionChanged}
            itemComponent={Page}
          />
        </Sortable>
      </React.Fragment>
    );
  }
}