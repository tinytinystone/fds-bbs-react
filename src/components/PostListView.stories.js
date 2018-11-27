import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import PostListView from './PostListView';

storiesOf('PostListView', module)
  .add('default', () => <PostListView />)
  .add('POST가 있을 때', () => (
    <PostListView
      posts={[
        {
          id: 2,
          userId: 1,
          title: 'React 핵심 원리',
          body: 'prop과 state의 역할을 명확히 이해하는 것이 중요합니다.',
        },
      ]}
    />
  ));
