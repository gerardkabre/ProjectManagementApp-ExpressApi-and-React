import React, { Component } from 'react';
import { getUser } from '../../utils/apiCalls';

import UserHome from './UserHome';
import GuestHome from './GuestHome';

class Home extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    getUser(this.props.token)
      .then(data => data.json())
      .then(data => {
        if (data.success) this.setState({ user: data.message });
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.user ? <UserHome user={this.state.user} /> : <GuestHome />;
  }
}
export default Home;
