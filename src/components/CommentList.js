import React, { Component } from "react";

export default class CommentList extends Component {
  render() {
    const { comments, commentUserList } = this.props;
    return (
      <div>
        <h2>댓글</h2>
        <ul>
          {comments.map(comment => {
            const user = commentUserList.find(user => user.id === comment.userId);
            return  <li key={comment.id}>
              <span>{user.username}</span>
                {comment.body}
              </li>
          }
        )}
        </ul>
      </div>
    );
  }
}
