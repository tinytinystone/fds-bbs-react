import React from 'react';
import Layout from '../components/Layout';
import PostList from '../containers/PostList.js';

export default function PostListPage(props) {
  const { onLoginFormPage, ...rest } = props;
  return (
    <Layout title="게시글 목록" onLoginFormPage={onLoginFormPage}>
      <PostList {...rest} />
    </Layout>
  );
}
