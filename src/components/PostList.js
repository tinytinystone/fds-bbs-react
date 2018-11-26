import React, { Component } from "react";
import api from "../api";
import Layout from "./Layout";
import { withPage } from "../contexts/PageContext";
import classNames from "classnames";

import './PostList.scss'

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true
    }
  }

  async componentDidMount() {
    const { data: posts } = await api.get("/posts");
    this.setState({
      posts,
      loading: false
    });
  }

  render() {
    const { postId, onPostDetail, onNewPostForm } = this.props;
    const { posts, loading } = this.state;
    const titleClass = classNames(
      'PostList__title', 
      {
        'PostList__title--loading': loading
      }
      )
    return <Layout title="게시물 목록">
        <h1 className={titleClass}>게시물 목록</h1>
        <ul className="PostList__list">
          {posts.map(post => (
            <li
              className="PostList__item"
              key={post.id}
              onClick={postId => onPostDetail(postId)}
            >
              {post.title}
            </li>
          ))}
        </ul>
        <button onClick={onNewPostForm}>새 글 쓰기</button>
      </Layout>;
  }
}

export default withPage(PostList);
