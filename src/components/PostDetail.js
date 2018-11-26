import React, { Component } from "react";
import api from "../api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Layout from "./Layout";

import { withUser } from "../contexts/UserContext";
import { withPage } from "../contexts/PageContext";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      userId: null,
      username: "",
      comments: [],
      commentUserList: [],
      loading: false
    };
  }
  async componentDidMount() {
    const {
      data: { title, body, user, comments }
    } = await api.get("/posts/" + this.props.postId, {
      params: {
        _expand: "user",
        _embed: "comments"
      }
    });
    const params = new URLSearchParams();
    comments.forEach(comment => {
      params.append("id", comment.userId);
    });
    const { data: commentUserList } = await api.get("/users/", { params });
    this.setState({
      title,
      body,
      username: user.username,
      userId: user.id,
      comments,
      commentUserList
    });
  }
  async handleDeletePost(e) {
    try {
      await api.delete("/posts/" + this.props.postId);
      alert("삭제되었습니다.");
      this.props.onPostList();
    } catch (e) {
      alert("자신이 쓴 글만 삭제할 수 있습니다.");
    }
  }
  async handleCommentSubmit(e) {
    e.preventDefault();
    const body = e.target.elements.body.value;
    const res = await api.post("/comments/", {
      postId: this.props.postId,
      body
    });
    this.componentDidMount();
  }
  render() {
    const {
      title,
      body,
      userId,
      username,
      comments,
      commentUserList,
      loading
    } = this.state;
    const { postId, onEditPostForm, onPostList } = this.props;
    return (
      <Layout>
          {({ id }) => {
            if (userId === id) {
              return (
                <React.Fragment>
                  <button onClick={() => onEditPostForm(postId)}>수정</button>
                  <button onClick={e => this.handleDeletePost(e, postId)}>
                    삭제
                  </button>
                </React.Fragment>
              );
            }
          }}
        <div className="post">
          <button onClick={onPostList}>목록으로 가기</button>
          <h1>{title}</h1>
          <div>쓴 사람: {username}</div>
          <div
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid #aaa"
            }}
          >
            {body}
          </div>
          <div
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid #aaa"
            }}
          >
            <CommentList
              postId={postId}
              comments={comments}
              commentUserList={commentUserList}
            />
            <CommentForm onSubmit={e => this.handleCommentSubmit(e, postId)} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default withPage(withUser(PostDetail));
