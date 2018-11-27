import React, { Component } from 'react';
import api from '../api';
import { Form } from 'semantic-ui-react';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 현재 입력 필드에 입력된 사용자 이름과 암호
      username: '',
      password: '',
    };
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    // FIXME: 사용자 이름 중복 체크 해야 함
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
    // TODO: 게시글 목록 보여주기
    this.props.onPostList();
  }
  handleFieldChange(e, name) {
    // name 변수에 저장되어 있는 문자열을 그대로 속성 이름으로 사용하기
    this.setState({
      [name]: e.target.value,
    });
  }
  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <h1>회원 가입</h1>
        <Form.Input
          label="아이디"
          type="text"
          name="username"
          value={this.state.username}
          onChange={e => this.handleFieldChange(e, 'username')}
        />
        <Form.Input
          label="비밀번호"
          type="password"
          name="password"
          value={this.state.password}
          onChange={e => this.handleFieldChange(e, 'password')}
        />
        <Form.Button>가입</Form.Button>
      </Form>
    );
  }
}
