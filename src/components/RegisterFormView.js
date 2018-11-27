import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class RegisterFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 현재 입력 필드에 입력된 사용자 이름과 암호
      username: '',
      password: '',
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  handleFieldChange(value, name) {
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { handleSubmit, username, password } = this.props;
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          const username = e.target.elements.username.value;
          const password = e.target.elements.password.value;
          handleSubmit(username, password);
        }}
      >
        <h1>회원 가입</h1>
        <Form.Input
          label="아이디"
          type="text"
          name="username"
          value={username}
          onChange={e => {
            e.preventDefault();
            const value = e.target.value;
            this.handleFieldChange(value, 'username');
          }}
        />
        <Form.Input
          label="비밀번호"
          type="password"
          name="password"
          value={password}
          onChange={e => {
            e.preventDefault();
            const value = e.target.value;
            this.handleFieldChange(value, 'password');
          }}
        />
        <Form.Button>가입</Form.Button>
      </Form>
    );
  }
}
