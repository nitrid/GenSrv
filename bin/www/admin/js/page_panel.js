import React from 'react';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel from 'devextreme-react/tab-panel';

import {page_list} from './conf/page_list.js'

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

function PagePanel()
{
    const [pages, setPages] = React.useState(page_list.slice(0, 1));
    const [selectedItem, setSelectedItem] = React.useState(page_list[0]);

    function closeButtonHandler(item) 
    {
      console.log(item)
      const newPages = [...pages];
      const index = newPages.indexOf(item);
  
      newPages.splice(index, 1);
      setPages(newPages);
  
      if (index >= newPages.length && index > 0) 
      {
        setSelectedItem(newPages[index - 1]);
      }
    }
    function renderTitle(data) 
    {
      function closeHandler() 
      {
        closeButtonHandler(data);
      }
      return (
        <React.Fragment>
          <div>
            <span>
              {data.title}
            </span>
            {<i className="dx-icon dx-icon-close" onClick={closeHandler} />}
          </div>
        </React.Fragment>
      );
    }
    function onSelectionChanged(args) 
    {
      setSelectedItem(args.addedItems[0]);
    }
    function onTabDragStart(e) 
    {
      e.itemData = e.fromData[e.fromIndex];
    }
    function onTabDrop(e) 
    {
      const newPages = [...pages];
  
      newPages.splice(e.fromIndex, 1);
      newPages.splice(e.toIndex, 0, e.itemData);

      setPages(newPages);
    }

    return (
      <React.Fragment>
        <Sortable
          filter=".dx-tab"
          data={page_list}
          itemOrientation="horizontal"
          dragDirection="horizontal"
          onDragStart={onTabDragStart}
          onReorder={onTabDrop}
        >
          <TabPanel
            dataSource={page_list}
            height = {'100%'}
            itemTitleRender={renderTitle}
            deferRendering={false}
            showNavButtons={true}
            selectedItem={selectedItem}
            repaintChangesOnly={true}
            onSelectionChanged={onSelectionChanged}
            itemComponent={Page}
          />
        </Sortable>
      </React.Fragment>
    );
}
export default PagePanel;