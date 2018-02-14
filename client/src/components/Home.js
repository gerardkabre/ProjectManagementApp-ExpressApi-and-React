import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AccountConnection, Card, Banner, Heading } from '@shopify/polaris';
import { Divider } from 'antd';

class Home extends Component {
  state = {
    user: null,
    redirectProjects: false,
    redirectAccount: false
  };

  getData() {
    fetch('http://localhost:3001/users', {
      headers: {
        Authorization: this.props.token
      },
      method: 'GET'
    })
      .then(data => data.json())
      .then(data => {
        if (data.success) this.setState({ user: data.message });
      })
      .catch(error => console.log(error));
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const loggedOrNot = () => {
      return this.state.user ? (
        <div className="home-panels">
          <AccountConnection
            title={this.state.user.email}
            details="Connected to your account"
            action={{
              content: 'disconnect',
              onClick: () => {
                this.props.deleteToken();
                this.setState({ user: null });
              }
            }}
            connected
            accountName={this.state.user.email}
          />
          <Card
            title="View or create new projects"
            primaryFooterAction={{
              content: 'View projects',
              onClick: () => this.setState({ redirectProjects: true })
            }}
          >
            <Card.Section>
              <p>View a summary of your online store’s performance.</p>
            </Card.Section>
          </Card>
          <Card title="View all the tasks from your projects" primaryFooterAction={{ content: 'View tasks' }}>
            <Card.Section>
              <p>View a summary of your online store’s performance.</p>
            </Card.Section>
          </Card>
        </div>
      ) : (
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
    };
    if (this.state.redirectProjects) return <Redirect push to="/projects" />;
    if (this.state.redirectAccount) return <Redirect push to="/register" />;
    return loggedOrNot();
  }
}
export default Home;
