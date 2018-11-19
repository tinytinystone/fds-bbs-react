import React, { Component } from 'react';
import './App.css';

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import PostList from "./components/PostList";

// 로그인 폼에 회원가입 버튼 만들기
// 회원가입 버튼 클릭하면 회원가입 폼 보여주기

class App extends Component {
  constructor(props) {
    super(props);
    // page === 'login' 로그인
    // page === 'register' 회원가입
    // page === 'post-list' 게시물 목록
    this.state = {
      page: "register"
    };
  }
  handleRegisterPage() {
    this.setState({
      page: "register"
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.page === "login" ? (
          <LoginForm onRegister={() => this.handleRegisterPage()} />
        ) : this.state.page === "register" ? (
          <RegisterForm />
        ) : this.state.page === 'post-list' ? (
          <PostList />
        ) : null }
      </div>
    );
  }
}

export default App;
