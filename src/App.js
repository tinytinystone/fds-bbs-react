import React, { Component } from "react";
import "./App.css";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";
import EditPostForm from "./components/EditPostForm";

// 로그인 폼에 회원가입 버튼 만들기
// 회원가입 버튼 클릭하면 회원가입 폼 보여주기

class App extends Component {
  constructor(props) {
    super(props);
    // page === 'login' 로그인
    // page === 'register' 회원가입
    // page === 'post-list' 게시물 목록
    // page === 'post-detail' 게시물 상세
    // page === 'new-post' 새 글 쓰기
    this.state = {
      page: "post-list",
      // 현재 보고 있는 게시물의 ID
      postId: null
    };
  }
  handleRegisterPage() {
    this.setState({
      page: "register"
    });
  }
  handlePostListPage() {
    this.setState({
      page: "post-list"
    });
  }
  handlePostDetailPage(postId) {
    this.setState({
      page: "post-detail",
      postId
    });
  }
  handleNewPost() {
    this.setState({
      page: "new-post"
    });
  }
  handleEditPostFormPage(postId) {
    this.setState({
      page: "edit-post-form",
      postId
    });
  }
  render() {
    const { page } = this.state;
    return (
      <div className="App">
        {page === "login" ? (
          <LoginForm onRegister={() => this.handleRegisterPage()} />
        ) : page === "register" ? (
          <RegisterForm onPostList={() => this.handlePostListPage()} />
        ) : page === "post-list" ? (
          <PostList
            onPostDetail={postId => this.handlePostDetailPage(postId)}
            onNewPost={() => this.handleNewPost()}
          />
        ) : page === "post-detail" ? (
          <PostDetail
            postId={this.state.postId}
            onEditPostFormPage={postId => this.handleEditPostFormPage(postId)}
          />
        ) : page === "new-post" ? (
          <NewPost
            postId={this.state.postId}
            onPostDetail={postId => this.handlePostDetailPage(postId)}
          />
        ) : page === "edit-post-form" ? (
          <EditPostForm 
            postId={this.state.postId}
            onPostDetail={postId => this.handlePostDetailPage(postId)}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
