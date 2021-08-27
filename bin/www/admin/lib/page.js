import React from 'react';
export default class Page extends React.Component
{
  constructor(props)
  {
    super(props)
    this.page = React.lazy(() => import(props.data.path))
  }
  render()
  {
    return(
      <React.Fragment>
        <React.Suspense fallback={<div>Yükleniyor</div>}>
          <div>
            <this.page props={this.props} />
          </div>
        </React.Suspense>
      </React.Fragment>
    )
  }
}