import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import NavBar from './lib/components/nav'

import {
  DraggerContext
} from './lib/ant-dragger'

import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-wrapper">
            <h1 className="App-title">Examples for &lt;
              <span style={{color: 'rgb(255, 198, 109)'}}>
                React-Ant-Dragger&nbsp;
              </span>
              /&gt;
            </h1>
          </div>
        </header>
        <Router>
          <div className="main">
            <NavBar nav={routes} />
            <div className="content">
            {
              routes.map((item, index) => (
                <Route
                  key={index}
                  exact={item.index}
                  path={item.link}
                  component={item.component}
                />
              ))
            }
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default DraggerContext(App);
