import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Form, Icon, Input, Button, Alert, Divider, Layout, notification } from 'antd';
import { ResourceList, TextStyle, Thumbnail, Banner } from '@shopify/polaris';

import '@shopify/polaris/styles.css';

import { createProject, getProjects } from '../utils/apiCalls';

const { Content, Sider } = Layout;
const FormItem = Form.Item;

class Projects extends Component {
  state = {
    projects: [],
    title: ''
  };

  getData = () => {
    getProjects(this.props.token)
      .then(data => data.json())
      .then(data => this.setState({ projects: data.message }))
      .catch(error => console.log(error));
  };

  handleImput = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    createProject({ title: this.state.title }, this.props.token)
      .then(res => res.json())
      .then(res => {
        this.setState({ newProjectTitle: res.title });
        this.getData();
      })
      .catch(res => console.error('Error login in', res));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const ResourceListItems = this.state.projects.map(project => {
      return {
        url: '#',
        attributeOne: project.title,
        actions: [
          {
            content: 'View project',
            onClick: () => alert('you clicked me')
          }
        ],
        persistActions: true
      };
    });

    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Project Succsesfully Creted',
        description: `The project has been succsefully created.`
      });
    };

    return (
      <Layout style={{ padding: '24px 0' }}>
        <Sider width={400} style={{ background: '#f0f2f5' }}>
          <div className="projects-form">
            <Card
              title="Create a new Project"
              extra={<a href="#">More</a>}
              style={{ width: '400px', marginTop: '15px', maringRight: '10px' }}
            >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  <Input placeholder="Project title" value={this.state.title} onChange={this.handleImput} />
                </FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => openNotificationWithIcon('success')}
                  className="login-form-button "
                >
                  Create new project
                </Button>
              </Form>
            </Card>
          </div>
          <Divider />
          <Banner title="Info" status="info">
            <p>You can position your cursor over the Projects list and scroll down to see more projects.</p>
          </Banner>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div className="projects-resourcelist">
            <Card title="Projects">
              <ResourceList items={ResourceListItems} renderItem={item => <ResourceList.Item {...item} />} />
            </Card>
          </div>
        </Content>
      </Layout>
    );
  }
}

Projects.propTypes = {
  user: PropTypes.string
};

export default Projects;
