import React, { Component } from "react";
import s from "./PostForm.module.scss";
import classNames from 'classnames';

export default class PostForm extends Component {
  render() {
    const { editing } = this.props;
    const titleClass = classNames(s.titleInput, {
      [s.editing]: editing
    })
    return (
      <div>
        <form onSubmit={e => this.props.onSubmit(e)}>
          <label htmlFor="title">제목</label>
          <input
            className={titleClass}
            type="text"
            name="title"
            defaultValue={this.props.title}
          />
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
