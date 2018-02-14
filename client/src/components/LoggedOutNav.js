import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class LoggedOutNav extends React.Component {
  render() {
    return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        selectedKeys={[this.props.location.pathname]}
        style={{ lineHeight: '64px', padding: '0 5%' }}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="/register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
const LoggedOutNavWrapped = withRouter(LoggedOutNav);

LoggedOutNavWrapped.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default LoggedOutNavWrapped;
