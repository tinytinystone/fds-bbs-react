import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// 스토리북의 다른 페이지로 넘어갈 수 있음.
// 간단하게 시연하고 싶을 때
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import PostForm from "./PostForm";

const actions = {
  onSubmit: action("onSubmit")
};


storiesOf("PostForm", module)
  // action으로 호출하면 함수가 반환 (고차함수) => 자기에게 들어온 인수를 그대로 출력해주는 기능.
  .add("default", () => <PostForm {...actions} />)
  .add("loading", () => <PostForm {...actions} loading={true} />)
  .add("editing", () => <PostForm {...actions} editing={true} />);
