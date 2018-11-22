import React, { Component } from "react";
import api from "../api";
import Layout from "./Layout";
import { PageConsumer } from "../contexts/PageContext";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false
    };
  }

  async componentDidMount() {
    const { data: posts } = await api.get("/posts");
    this.setState({
      posts
    });
  }

  render() {
    const { posts, loading } = this.state;
    return (
      <PageConsumer>
        {({postId, onPostDetail, onNewPostForm}) => {
          return (
            <Layout title="게시물 목록">
              <h1>게시물 목록</h1>
              <ul>
                {posts.map(post => (
                  <li key={post.id} onClick={postId => onPostDetail(post.id)}>
                    {post.title}
                  </li>
                ))}
              </ul>
              <button onClick={onNewPostForm}>새 글 쓰기</button>
            </Layout>
          )
        }}
      </PageConsumer>
    );
  }
}
