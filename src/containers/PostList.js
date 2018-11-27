import React, { Component } from "react";
import api from "../api";
import { withPage } from "../contexts/PageContext";

import "../components/PostList.scss";
import PostListView from "../components/PostListView";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true
    };
  }
  async componentDidMount() {
    const { data: posts } = await api.get("/posts");
    this.setState({
      posts,
      loading: false
    });
  }
  render() {
    const { posts, loading } = this.state;
    return <PostListView posts={posts} loading={loading} />;
  }
}

export default withPage(PostList);
