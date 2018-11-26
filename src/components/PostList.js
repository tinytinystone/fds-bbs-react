import React, { Component } from "react";
import api from "../api";
import Layout from "./Layout";
import { withPage } from "../contexts/PageContext";

class PostList extends Component {
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
    const { postId, onPostDetail, onNewPostForm } = this.props;
    const { posts, loading } = this.state;
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
    );
  }
}

export default withPage(PostList);
