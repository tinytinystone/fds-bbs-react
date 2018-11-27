import React, { Component } from 'react';
import api from '../api';
import RegisterFormView from '../components/RegisterFormView';

import { withUser } from '../contexts/UserContext';
import { withPage } from '../contexts/PageContext';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(username, password) {
    const { data: users } = await api.get('/users', {
      params: {
        username,
      },
    });
    if (users.length > 0) {
      alert('이미 같은 이름이 사용 중입니다.');
      return;
    }
    const { data: token } = await api.post('/users/register/', {
      username,
      password,
    });
    localStorage.setItem('token', token);
    alert('가입이 완료 되었습니다!');
    this.props.onPostList();
  }
  render() {
    return (
      <RegisterFormView {...this.props} handleSubmit={this.handleSubmit} />
    );
  }
}

export default withPage(withUser(RegisterForm));
