import React, { Component } from 'react'
import Layout from '../components/Layout'
import PostDetail from '../containers/PostDetail'

export default class PostDetailPage extends Component {
  render() {
    return (
      <Layout title="게시물 내용">
        <PostDetail {...this.props} />
      </Layout>
    )
  }
}
