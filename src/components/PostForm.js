import React, { Component } from "react";

export default class PostForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={e => this.props.onSubmit(e)}>
          <label htmlFor="title">제목</label>
          <input type="text" name="title" defaultValue={this.props.title} />
          <label htmlFor="body">내용</label>
          <textarea
            name="body"
            cols="30"
            rows="10"
            defaultValue={this.props.body}
          />
          <button>전송</button>
        </form>
      </div>
    );
  }
}
