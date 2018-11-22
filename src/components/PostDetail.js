import React, { Component } from "react";
import api from "../api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Layout from './Layout'
import { UserConsumer } from '../contexts/UserContext'

export default class PostDetail extends Component {
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
        _expand: 'user',
        _embed: 'comments'
      }
    })
    const params = new URLSearchParams()
    comments.forEach(comment => {
      params.append('id', comment.userId)
    })
    const { data: commentUserList } = await api.get('/users/', {params})

    /* 
    await api.get('/posts/1/comments', {
      params: {
        _expand: 'user'
      }
    })
    */

    this.setState({
      title,
      body,
      username: user.username,
      userId: user.id,
      comments,
      commentUserList
    });
  }
  async handleDeletePost(e, postId) {
    try {
      await api.delete("/posts/" + postId);
      alert("삭제되었습니다.");
      this.props.onPostList();
    } catch (e) {
      alert("자신이 쓴 글만 삭제할 수 있습니다.");
    }
  }
  async handleCommentSubmit(e) {
    e.preventDefault()
    const body = e.target.elements.body.value
    const res = await api.post('/comments/', {
      postId: this.props.postId,
      body
    })
    this.componentDidMount()
  }
  render() {
    const { postId, onEditPostFormPage } = this.props;
    const { title, body, username, comments, commentUserList } = this.state;
    return (
      <Layout>
        <UserConsumer>
          {({id}) => {
            if (this.state.userId === id) {
              return (<button onClick={() => onEditPostFormPage(postId)}>수정</button>)
            }
          }}
        </UserConsumer>
      <div className="post">
        <button onClick={e => this.handleDeletePost(e, postId)}>삭제</button>
        <h1>{title}</h1>
        <div>쓴 사람: {username}</div>
        <div style={{margin: "10px", padding: "10px", border:"1px solid #aaa"}}>{body}</div>
        <div style={{ margin: "10px", padding: "10px", border: "1px solid #aaa" }}>
          <CommentList postId={postId} comments={comments} commentUserList={commentUserList} />
          <CommentForm onSubmit={e => this.handleCommentSubmit(e, postId)} />
        </div>
      </div>
      </Layout>
    )
  }
}
