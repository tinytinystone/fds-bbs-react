import React, { Component } from "react";
import api from "../api";

const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      await this.refreshUser();
    }
  }
  async login(username, password) {
    const res = await api.post("/users/login/", {
      username,
      password
    });
    localStorage.setItem("token", res.data.token);
    // TODO: 게시글 목록 보여주기
    await this.refreshUser();
  }
  async refreshUser() {
    const res = await api.get("/me");
    this.setState({
      id: res.data.id,
      username: res.data.username
    });
  }
  render() {
    const value = {
      username: this.state.username,
      id: this.state.id,
      login: this.login.bind(this)
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
