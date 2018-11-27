import React, { Component } from 'react';
import api from '../api';
import PostForm from './PostForm';

import { withLoading } from '../hoc/withLoading';
import { withPage } from '../contexts/PageContext';

class EditPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }
  async componentDidMount() {
    const {
      data: { title, body },
    } = await api.get('posts/' + this.props.currentPostId);
    this.setState({
      title,
      body,
    });
  }

  async handleSubmit(title, body) {
    const { data: id } = await api.patch('/posts/' + this.props.currentPostId, {
      title,
      body,
    });
    this.props.onPostDetail(id);
  }
  render() {
    const { title, body } = this.state;
    return (
      <PostForm
        loading={!title}
        editing={true}
        title={title}
        body={body}
        onSubmit={(title, body) => this.handleSubmit(title, body)}
      />
    );
  }
}

export default withPage(EditPostForm);
