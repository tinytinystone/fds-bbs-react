import React, { Component } from "react";
import { UserConsumer } from "../contexts/UserContext"

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <UserConsumer>{({ username }) => <div>{username}</div>}</UserConsumer>
        </div>
        {this.props.children}
        <div className="footer">푸터</div>
      </div>
    );
  }
}
