import React, { Component } from 'react';

export default class CommentForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={e => this.props.onSubmit(e)}>
          <label htmlFor="body">코멘트</label>
          <input type="text" name="body" defaultValue={this.props.body} />
          <button>전송</button>
        </form>
      </div>
    );
  }
}
