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
      <React.Fragment>
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
            {comments && comments.length > 0 ? (
              <CommentList
                postId={currentPostId}
                comments={comments}
                commentUserList={commentUserList}
              />
            ) : (
              <div>댓글이 없습니다.</div>
            )}
            <CommentForm
              onSubmit={e => this.handleCommentSubmit(e, currentPostId)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withPage(withUser(PostDetailView));
