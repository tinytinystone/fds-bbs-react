import { configure } from "@storybook/react";
import "semantic-ui-css/semantic.min.css";
import "../src/index.scss";

const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);