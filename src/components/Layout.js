import React, { Component } from "react";

import { withUser } from "../contexts/UserContext";
import { withPage } from "../contexts/PageContext";

class Layout extends Component {
  render() {
    const { username, logout, onLoginForm } = this.props
    return (
      <React.Fragment>
          <div className="header">
              { username ? (
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
          </div>
        {this.props.children}
        <div className="footer" />
      </React.Fragment>
    );
  }
}

export default withPage(withUser(Layout));
