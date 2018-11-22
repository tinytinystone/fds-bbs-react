import React, { Component } from "react";
import "./App.css";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import NewPostForm from "./components/NewPostForm";
import EditPostForm from "./components/EditPostForm";

import Modal from "./components/Modal";

import { UserProvider } from "./contexts/UserContext";

// 로그인 폼에 회원가입 버튼 만들기
// 회원가입 버튼 클릭하면 회원가입 폼 보여주기

class App extends Component {
  constructor(props) {
    super(props);
    // page === 'login' 로그인
    // page === 'register' 회원가입
    // page === 'post-list' 게시물 목록
    // page === 'post-detail' 게시물 상세
    // page === 'new-post-form' 새 글 쓰기
    // page === 'edit-post-form' 글 수정하기
    this.state = {
      page: "post-list",
      // 현재 보고 있는 게시물의 ID
      postId: null,
      showModal: false
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
  handleNewPostFormPage() {
    this.setState({
      page: "new-post-form"
    });
  }
  handleEditPostFormPage(postId) {
    this.setState({
      page: "edit-post-form",
      postId
    });
  }
  handleLoginFormPage() {
    this.setState(prevState => ({
      page: "login",
      showModal: !prevState.showModal
    }));
  }
  render() {
    const { page } = this.state;
    const modal = this.state.showModal;
    return (
      <UserProvider
        onPostListPage={() => this.handlePostListPage()}
        onLoginFormPage={() => this.handleLoginFormPage()}
      >
        <div className="App">
          {page === "login" && modal ? (
            <Modal>
              <div className="modal">
                <LoginForm onRegister={() => this.handleRegisterPage()} />
              </div>
            </Modal>
          ) : page === "register" ? (
            <RegisterForm onPostList={() => this.handlePostListPage()} />
          ) : page === "post-list" ? (
            <PostList
              onPostDetail={postId => this.handlePostDetailPage(postId)}
              onNewPost={() => this.handleNewPostFormPage()}
            />
          ) : page === "post-detail" ? (
            <PostDetail
              postId={this.state.postId}
              onEditPostFormPage={postId => this.handleEditPostFormPage(postId)}
              onPostList={() => this.handlePostListPage()}
            />
          ) : page === "new-post-form" ? (
            <NewPostForm
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
      </UserProvider>
    );
  }
}

export default App;
