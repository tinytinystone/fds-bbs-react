import React, { Component } from 'react'
import api from '../api';
import PostForm from './PostForm'

import { PageConsumer } from "../contexts/PageContext";
import Layout from './Layout';

export default class NewPostForm extends Component {
  async handleSubmit(e, onPostDetail){
    e.preventDefault()
    const title = e.target.elements.title.value
    const body = e.target.elements.body.value
    const res = await api.post('/posts/', {
      title,
      body
    })
    onPostDetail(res.data.id);
  }
  render() {
    return (
      <PageConsumer>
        {({onPostDetail}) => {
          return (
            <Layout>
              <PostForm onSubmit={e => this.handleSubmit(e, onPostDetail)} />
            </Layout>
          )
        }}
      </PageConsumer>
    )
  }
}
