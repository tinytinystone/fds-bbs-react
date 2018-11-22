import React, { Component } from "react";
import { UserConsumer } from "../contexts/UserContext";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <UserConsumer>
            {({ username, logout, onLoginFormPage }) =>
              username ? (
                <React.Fragment>
                  <div>{username} 님, 환영합니다.</div>
                  <button onClick={logout}>Logout</button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span>로그인 해주세요.</span>
                  <button onClick={onLoginFormPage}>로그인</button>
                </React.Fragment>
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
