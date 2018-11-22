import React, { Component } from "react";
import { UserConsumer } from "../contexts/UserContext";

export default class Layout extends Component {
  render() {
    const { onLoginFormPage } = this.props
    return (
      <div>
        <div className="header">
          <UserConsumer>
            {({ username, logout }) =>
              username ? (
                <React.Fragment>
                  <div>{username} 님, 환영합니다.</div>
                  <button onClick={logout}>Logout</button>
                </React.Fragment>
              ) : (
                <button onClick={onLoginFormPage}>로그인 해주세요.</button>
              )
            }
          </UserConsumer>
        </div>
        {this.props.children}
        <div className="footer" />
      </div>
    );
  }
}
