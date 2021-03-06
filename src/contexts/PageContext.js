import React, { Component } from 'react';
import { withUser } from './UserContext';

const { Provider, Consumer } = React.createContext();

export default class PageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // page === 'login' 로그인
      // page === 'register' 회원가입
      // page === 'post-list' 게시물 목록
      // page === 'post-detail' 게시물 상세
      // page === 'new-post-form' 새 글 쓰기
      // page === 'edit-post-form' 글 수정하기}
      page: 'post-list',
      currentPostId: null,
      showModal: false,
      onLoginForm: this.onLoginForm.bind(this),
      onRegister: this.onRegister.bind(this),
      onPostList: this.onPostList.bind(this),
      onPostDetail: this.onPostDetail.bind(this),
      onNewPostForm: this.onNewPostForm.bind(this),
      onEditPostForm: this.onEditPostForm.bind(this),
    };
  }
  onRegister() {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      page: 'register',
    }));
  }
  onPostList() {
    this.setState({
      page: 'post-list',
    });
  }
  onPostDetail(postId) {
    this.setState({
      page: 'post-detail',
      currentPostId: postId,
    });
  }
  onNewPostForm() {
    this.setState({
      page: 'new-post-form',
    });
  }
  onEditPostForm(postId) {
    this.setState({
      page: 'edit-post-form',
      currentPostId: postId,
    });
  }
  onLoginForm() {
    this.setState(prevState => ({
      page: 'login',
      showModal: !prevState.showModal,
    }));
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withPage(WrappedComponent) {
  function WithPage(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  }
  WithPage.displayName = `withPage(${getDisplayName(WrappedComponent)})`;
  return WithPage;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export { PageProvider, Consumer as PageConsumer, withPage };
