import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { Card } from '@shopify/polaris';

const FormItem = Form.Item;

class Register extends Component {
  state = {
    redirect: false,
    username: null,
    password: null
  };
  handleImput = event => {
    this.setState({ username: event.target.value });
  };
  handleImputPassword = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:3001/users/auth/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ email: this.state.username, password: this.state.password })
    })
      .then(res => {
        console.log(res);
        this.setState({ redirect: true });
      })
      .catch(function(res) {
        console.log(res);
      });
  };
  render() {
    if (this.state.redirect) return <Redirect to="/login" />;
    return (
      <Card title="Create a new account" sectioned>
        <Form onSubmit={this.handleSubmit} className="login-form">
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

          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Register;
