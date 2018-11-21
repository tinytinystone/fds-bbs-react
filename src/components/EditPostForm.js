import React, { Component } from "react";
import api from "../api";
import PostForm from "./PostForm";

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  async componentDidMount() {
    const {
      data: { title, body }
    } = await api.get(`/posts/${this.props.postId}`);
    this.setState({
      title,
      body
    });
  }

  async handleSubmit(e) {
    try {
      e.preventDefault();
      const title = e.target.elements.title.value;
      const body = e.target.elements.body.value;
      const res = await api.patch("/posts/" + this.props.postId, {
        title,
        body
      });
      this.props.onPostDetail(res.data.id);
    }
    catch (e) {
      alert('자신이 쓴 글 이외에는 수정할 수 없습니다.')
    }
  }
  render() {
    const { title, body } = this.state;
    if ( !title ) {
      return 'Loading...'
    }
    return (
      <div>
        <PostForm
          title={title}
          body={body}
          onSubmit={e => this.handleSubmit(e)}
        />
      </div>
    );
  }
}
