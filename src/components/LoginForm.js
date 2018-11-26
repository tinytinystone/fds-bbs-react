import React from "react";
import { UserConsumer } from "../contexts/UserContext";

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
    const { onRegister } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={e => this.handleSubmit(e)}>
          <h1>로그인</h1>
          <input type="text" name="username" ref={this.usernameRef} />
          <input type="password" name="password" ref={this.passwordRef} />
          <button>로그인</button>
        </form>
        <button onClick={onRegister}>회원가입</button>
      </React.Fragment>
    );
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
