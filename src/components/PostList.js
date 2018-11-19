import React, { Component } from "react";
import api from "../api";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false
    };
  }

  async componentDidMount() {
    const { data: posts } = await api.get('/posts')
    this.setState({
      posts
    })
  }

  render() {
    const { posts, loading } = this.state
    return (
      <div>
        <h1>게시물 목록</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
