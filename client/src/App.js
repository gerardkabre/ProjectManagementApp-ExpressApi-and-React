import React, { Component } from 'react';
import { Route, BrowserRouter as Router,  } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { FooterHelp, Link as LinkStyle } from '@shopify/polaris';

import Home from './components/Home/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Projects from './components/Projects.js';
import LoggedInNav from './components/LoggedInNav.js';
import LoggedOutNav from './components/LoggedOutNav.js';

import './App.css';
import '@shopify/polaris/styles.css';

const { Content } = Layout;

class App extends Component {
  state = { token: null };

  setToken = token => {
    this.setState({ token });
  };
  deleteToken = () => {
    this.setState({ token: null });
  };
  render() {
    const navItemsLoggedOrNotLogged = () => {
      return this.state.token ? <LoggedInNav /> : <LoggedOutNav />;
    };

    return (
      <div>
        <Router>
          <Layout className="layout">
            {navItemsLoggedOrNotLogged()}
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }} />
              <div style={{ padding: 24, minHeight: '75vh' }}>
                <Route exact path="/" render={() => <Home token={this.state.token} deleteToken={this.deleteToken} />} />
                <Route path="/projects" render={() => <Projects token={this.state.token} />} />
                <div style={{ width: '400px', margin: 'auto auto' }}>
                  <Route path="/login" render={() => <Login setToken={this.setToken} />} />
                  <Route path="/register" render={() => <Register />} />
                </div>
              </div>
            </Content>
            <FooterHelp>
              Made by <LinkStyle>Gerard Cabrerizo</LinkStyle> ©2018
            </FooterHelp>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
