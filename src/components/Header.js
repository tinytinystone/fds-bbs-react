import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class Header extends Component {
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}
