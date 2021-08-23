import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/app.js'
import { BrowserRouter } from "react-router-dom";

class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render
(
  // <BrowserRouter>
    <App />,
  // </BrowserRouter>,
  document.getElementById('root')
);