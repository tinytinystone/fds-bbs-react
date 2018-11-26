import React, { Component } from "react";
import api from "../api";
import PostForm from "./PostForm";
import { PageConsumer } from "../contexts/PageContext";

class NewPost extends Component {
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
    } = await api.get("posts/" + this.props.currentPostId);
    this.setState({
      title,
      body
    });
  }

  async handleSubmit(e) {
    try {
      e.preventDefault();
      const title = e.target.elements.title.value;
      const body = e.target.elements.body.value;
      const res = await api.patch("/posts/" + this.props.currentPostId, {
        title,
        body
      });
      this.props.onPostDetail(res.data.id);
    } catch (e) {
      alert("자신이 쓴 글 이외에는 수정할 수 없습니다.");
    }
  }
  render() {
    const { title, body } = this.state;
    if (!title) {
      return "Loading...";
    }
    return (
      <PostForm
        editing={true}
        title={title}
        body={body}
        onSubmit={(e, postId, onPostDetail) =>
          this.handleSubmit(e, postId, onPostDetail)
        }
      />
    );
  }
}

export default props => {
  return (
    <PageConsumer>
      {({ currentPostId, onPostDetail }) => (
        <NewPost {...props} currentPostId={currentPostId} onPostDetail={onPostDetail} />
      )}
    </PageConsumer>
  );
};
