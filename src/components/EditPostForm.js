import React, { Component } from "react";
import api from "../api";
import PostForm from "./PostForm";
import { PageConsumer } from "../contexts/PageContext";
// import { withLoader } from "./Loader";

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

  async handleSubmit(title, body) {
    const { data: id } = await api.patch("/posts/" + this.props.currentPostId, {
      title,
      body
    });
    this.props.onPostDetail(id);
  }
  render() {
    const { title, body } = this.state;
    return (
      <PostForm
        loading={!title}
        editing={true}
        title={title}
        body={body}
        onSubmit={(title, body) => this.handleSubmit(title, body)}
      />
    );
  }
}

export default props => {
  return (
    <PageConsumer>
      {({ currentPostId, onPostDetail }) => (
        <NewPost
          {...props}
          currentPostId={currentPostId}
          onPostDetail={onPostDetail}
        />
      )}
    </PageConsumer>
  );
};
