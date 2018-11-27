import React, { Component } from "react";
import s from "./PostForm.module.scss";
import classNames from "classnames";
import { withLoader } from "./Loader";

class PostForm extends Component {
  static defaultProps = {
    // true가 주어지면 편집모드 스타일이 적용됨. (이렇게 설명을 써준다.)
    editing: false,
    // 폼 전송 시 호출되는 함수. 이벤트 객체가 아니라 title과 body를 인수로 받음.
    onSubmit: () => {}
  };
  render() {
    const { editing, onSubmit } = this.props;
    const titleClass = classNames(s.titleInput, {
      [s.editing]: editing
    });
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const title = e.target.elements.title.value
            const body = e.target.elements.body.value;
            this.props.onSubmit(title, body);
          }}
        >
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

export default withLoader(PostForm);
