import React, { Component } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Layout from "./Layout";

import { withUser } from "../contexts/UserContext";
import { withPage } from "../contexts/PageContext";

class PostDetailView extends Component {
  render() {
    const {
      title,
      body,
      userId,
      username,
      comments,
      commentUserList,
      loading,
      currentPostId,
      onEditPostForm,
      onPostList,
      id
    } = this.props;
    return (
      <Layout>
        {userId === id && (
          <React.Fragment>
            <button onClick={() => onEditPostForm(currentPostId)}>수정</button>
            <button onClick={e => this.handleDeletePost(e)}>삭제</button>
          </React.Fragment>
        )}
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
              postId={currentPostId}
              comments={comments}
              commentUserList={commentUserList}
            />
            <CommentForm
              onSubmit={e => this.handleCommentSubmit(e, currentPostId)}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default withPage(withUser(PostDetailView));