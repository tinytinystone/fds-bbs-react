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
    await this.refreshUser();
    this.props.onPostListPage();
  }
  async logout() {
    localStorage.removeItem('token')
    this.setState({
      id: null,
      username: null
    })
    this.props.onPostListPage()
  }
  async refreshUser() {
    const { data: { id, username }} = await api.get("/me");
    this.setState({
      id,
      username
    });
  }
  render() {
    const value = {
      username: this.state.username,
      id: this.state.id,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
      onLoginFormPage: this.props.onLoginFormPage.bind(this)
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
