import React, { Component } from "react";
import { UserConsumer } from "../contexts/UserContext";
import { PageConsumer } from "../contexts/PageContext";

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <PageConsumer>
          {({ onLoginForm }) => (
            <div className="header">
              <UserConsumer>
                {({ username, logout }) =>
                  username ? (
                    <React.Fragment>
                      <div>{username} 님, 환영합니다.</div>
                      <button onClick={logout}>Logout</button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span>로그인 해주세요.</span>
                      <button onClick={onLoginForm}>로그인</button>
                    </React.Fragment>
                  )
                }
              </UserConsumer>
            </div>
          )}
        </PageConsumer>
        {this.props.children}
        <div className="footer" />
      </React.Fragment>
    );
  }
}
