import React, { Component } from 'react';
import api from '../api';

import { withPage } from '../contexts/PageContext';
import { withUser } from '../contexts/UserContext';

import PostDetailView from '../components/PostDetailView';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      userId: null,
      username: '',
      comments: [],
      commentUserList: [],
      loading: true,
    };
  }
  async componentDidMount() {
    const {
      data: { title, body, user, comments },
    } = await api.get('/posts/' + this.props.currentPostId, {
      params: {
        _expand: 'user',
        _embed: 'comments',
      },
    });
    const params = new URLSearchParams();
    comments.forEach(comment => {
      params.append('id', comment.userId);
    });
    const { data: commentUserList } = await api.get('/users/', { params });
    this.setState({
      title,
      body,
      username: user.username,
      userId: user.id,
      comments,
      commentUserList,
      loading: false,
    });
  }
  async handleDeletePost(e) {
    try {
      await api.delete('/posts/' + this.props.currentPostId);
      alert('삭제되었습니다.');
      this.props.onPostList();
    } catch (e) {
      alert('자신이 쓴 글만 삭제할 수 있습니다.');
    }
  }
  async handleCommentSubmit(e) {
    e.preventDefault();
    const body = e.target.elements.body.value;
    const res = await api.post('/comments/', {
      postId: this.props.currentPostId,
      body,
    });
    this.componentDidMount();
  }
  render() {
    console.log(this.props.currentPostId);
    const {
      title,
      body,
      userId,
      username,
      comments,
      commentUserList,
      loading,
    } = this.state;
    console.log(comments);
    return (
      <PostDetailView
        userId={userId}
        title={title}
        body={body}
        username={username}
        comments={comments}
        commentUserList={commentUserList}
        loading={loading}
      />
    );
  }
}

export default withPage(withUser(PostDetail));
