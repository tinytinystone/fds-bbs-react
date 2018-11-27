import React from 'react';
import classNames from 'classnames';

import { withPage } from '../contexts/PageContext';

import './PostList.scss';
import { withLoading } from '../hoc/withLoading';

function PostListView(props) {
  const { posts, loading, onPostDetail, onNewPostForm } = props;
  const titleClass = classNames('PostList__title', {
    'PostList__title--loading': loading,
  });
  return (
    <React.Fragment>
      <h1 className={titleClass}>게시물 목록</h1>
      {posts && posts.length > 0 ? (
        <ul className="PostList__list">
          {posts.map(post => (
            <li
              className="PostList__item"
              key={post.id}
              onClick={() => onPostDetail(post.id)}
            >
              {post.title}
            </li>
          ))}
        </ul>
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <button onClick={onNewPostForm}>새 글 쓰기</button>
    </React.Fragment>
  );
}

export default withLoading(withPage(PostListView));
