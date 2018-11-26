import React from "react";
import { UserConsumer } from "../contexts/UserContext";
import {Form, Button} from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  async handleSubmit(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    await this.props.login(username, password);
  }
  render() {
    const { onRegister, onModal } = this.props;
    return <React.Fragment>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <h1>로그인</h1>
          <Form.Input label="사용자 이름" type="text" name="username" />
          <Form.Input label="비밀번호" type="password" name="password" />
          <Form.Button onClick={onModal}>로그인</Form.Button>
        </Form>
        <Button onClick={onRegister}>회원가입</Button>
      </React.Fragment>;
  }
}

export default props => {
  return (
    <UserConsumer>
      {({ login, onPostList, onRegister }) => (
        <LoginForm
          {...props}
          login={login}
          onPostList={onPostList}
        />
      )}
    </UserConsumer>
  );
};
