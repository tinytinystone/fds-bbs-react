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
import { PageProvider, PageConsumer } from "./contexts/PageContext";

// 로그인 폼에 회원가입 버튼 만들기
// 회원가입 버튼 클릭하면 회원가입 폼 보여주기

export default class App extends Component {
  render() {
    return (
      <PageProvider>
        <UserProvider>
          <div className="App">
            <PageConsumer>
              {({ page }) => {
                return page === "login" ? (
                  <Modal>
                    <div className="modal">
                      <LoginForm onRegister={this.onRegister} />
                    </div>
                  </Modal>
                ) : page === "register" ? (
                  <RegisterForm onPostList={this.onPostList} />
                ) : page === "post-list" ? (
                  <PostList
                    onNewPostForm={this.onNewPostForm}
                    onPostDetail={this.onPostDetail}
                  />
                ) : page === "post-detail" ? (
                  <PostDetail onEditPostForm={this.onEditPostForm} />
                ) : page === "new-post-form" ? (
                  <NewPostForm />
                ) : page === "edit-post-form" ? (
                  <EditPostForm />
                ) : null;
              }}
            </PageConsumer>
          </div>
        </UserProvider>
      </PageProvider>
    );
  }
}
