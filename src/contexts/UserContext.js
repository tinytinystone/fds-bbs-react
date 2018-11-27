import React, { Component } from 'react';
import api from '../api';
import { withPage } from './PageContext';

const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: null,
      currentUsername: null,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }
  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.refreshUser();
    }
  }
  async login(username, password) {
    const res = await api.post('/users/login/', {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    await this.refreshUser();
    this.props.onPostList();
  }
  async logout() {
    localStorage.removeItem('token');
    this.setState({
      currentId: null,
      currentUsername: null,
    });
    this.props.onPostList();
  }
  async refreshUser() {
    const {
      data: { id, username },
    } = await api.get('/me');
    this.setState({
      currentId: id,
      currentUsername: username,
    });
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withUser(WrappedComponent) {
  return function(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

UserProvider = withPage(UserProvider);

export { UserProvider, Consumer as UserConsumer, withUser };
