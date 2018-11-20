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
    // FIXME: 내가 쓴 글이 아니면, 수정할 수 없다는 알림을 띄워주어야 한다.
    e.preventDefault();
    const title = e.target.elements.title.value;
    const body = e.target.elements.body.value;
    const res = await api.patch("/posts/" + this.props.postId, {
      title,
      body
    });
    this.props.onPostDetail(res.data.id);
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
