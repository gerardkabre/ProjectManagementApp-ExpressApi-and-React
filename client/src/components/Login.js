import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Card } from '@shopify/polaris';

const FormItem = Form.Item;

class Login extends Component {
  state = {
    username: '',
    password: '',
    redirect: false,
    failed: false
  };
  handleImput = event => {
    this.setState({ username: event.target.value });
  };
  handleImputPassword = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:3001/users/auth/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ email: this.state.username, password: this.state.password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.setToken(res.token);
          this.setState({ failed: false, redirect: true });
        } else {
          console.log(res.message);
          this.setState({ failed: true });
        }
      })
      .catch(res => console.error('Error login in', res));
  };
  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    const failedLoggin = () =>
      this.state.failed ? <h3 style={{ color: 'red' }}>Authentication failed, try again.</h3> : null;
    return (
      <Card title="Log in to your account" sectioned>
      <Form onSubmit={this.handleSubmit} className="login-form">
        {failedLoggin()}
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleImput}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleImputPassword}
          />
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <a style={{ marginLeft: '100px' }} href="">
            register now!
          </a>
        </FormItem>
      </Form>
      </Card>
    );
  }
}

Login.propTypes = {
  setUserData: PropTypes.func
};

export default Login;
