import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AccountConnection, Card } from '@shopify/polaris';

class UserHome extends Component {
  state = {
    redirectProjects: false,
    redirectAccount: false
  };

  render() {
    if (this.state.redirectProjects) return <Redirect push to="/projects" />;
    return (
      <div className="home-panels">
        <AccountConnection
          title={this.props.user.email}
          details="Connected to your account"
          action={{
            content: 'disconnect',
            onClick: () => {
              this.props.deleteToken();
              this.setState({ user: null });
            }
          }}
          connected
          accountName={this.props.user.email}
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
    );
  }
}

export default UserHome;
