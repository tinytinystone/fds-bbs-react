import React, { Component } from "react";
import api from "../api";

export default class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      username: "",
      loading: false
    };
  }

  async componentDidMount() {
    const {
      data: { title, body, userId }
    } = await api.get("/posts/" + this.props.postId);
    const {
      data: { username }
    } = await api.get("/users/" + userId);
    this.setState({
      title,
      body,
      username
    });
  }
  render() {
    const { postId, onEditPostFormPage } = this.props;
    const { title, body, username } = this.state;
    return (
      <>
        <h1>POST DETAIL</h1>
        <div className="post">
        <button onClick={() => onEditPostFormPage(postId)}>수정</button>
          <div>
            ({postId} 번 게시물){title}
          </div>
          <div>쓴 사람: {username}</div>
          <div>{body}</div>
        </div>
      </>
    );
  }
}
