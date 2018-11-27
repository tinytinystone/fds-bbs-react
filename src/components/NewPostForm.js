import React, { Component } from 'react';
import api from '../api';
import PostForm from './PostForm';

import { PageConsumer } from '../contexts/PageContext';
import Layout from './Layout';

export default class NewPostForm extends Component {
  async handleSubmit(title, body) {
    const { data: id } = await api.post('/posts/', {
      title,
      body,
    });
    this.props.onPostDetail(id);
  }
  render() {
    return (
      <PageConsumer>
        {({ onPostDetail }) => {
          return (
            <Layout>
              <PostForm
                onSubmit={(title, body) => this.handleSubmit(title, body)}
              />
            </Layout>
          );
        }}
      </PageConsumer>
    );
  }
}
