import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
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
      <BrowserRouter>
        <PageProvider>
          <UserProvider>
            <div className="App">
              <PageConsumer>
                {({page}) => {
                  return page === "login" ? (
                    <Modal>
                      <div className="modal">
                        <LoginForm />
                      </div>
                    </Modal>
                  ) : page === "register" ? (
                    <RegisterForm />
                  ) : page === "post-list" ? (
                    <PostListPage />
                  ) : page === "post-detail" ? (
                    <PostDetailPage />
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
      </BrowserRouter>
    );
  }
}
