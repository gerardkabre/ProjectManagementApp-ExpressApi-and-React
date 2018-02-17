import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Banner } from '@shopify/polaris';

class GuestHome extends Component {
  state = {
    Redirect: false
  };
  render() {
    if (this.state.redirectAccount) return <Redirect push to="/register" />;
    return (
      <div>
        <h1 style={{ fontSize: '4em' }}>Project-Task Tracker </h1>
        <Banner
          title="You need an account"
          action={{ content: 'Create account', onClick: () => this.setState({ redirectAccount: true }) }}
          status="warning"
        >
          <p>Log in or create a new account to start working in your projects.</p>
        </Banner>
      </div>
    );
  }
}
export default GuestHome;
