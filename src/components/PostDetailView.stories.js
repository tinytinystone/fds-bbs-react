import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import PostDetailView from './PostDetailView';

storiesOf('PostDetailView', module)
  .add('default', () => <PostDetailView />)
  .add('with content', () => <PostDetailView title="제목" body="내용" />)
  .add('작성자로 로그인 한 경우', () => (
    <PostDetailView title="제목" body="내용" userId={0} />
  ))
  .add('코멘트가 있는 경우', () => (
    <PostDetailView
      postId={1}
      comments={[{ postId: 1, body: '예', userId: 1, id: 1 }]}
      commentUserList={[{ id: 1, username: 'fds' }]}
    />
  ));
