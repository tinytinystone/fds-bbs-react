import React from 'react'
import api from '../api'

export default class LoginForm extends React.Component {
  async handleSubmit(e) {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    // FIXME: 사용자 이름 중복 체크 해야 함
    const res = await api.post('/users/login/', {
      username,
      password
    })
    localStorage.setItem('token', res.data.token)
    // TODO: 게시글 목록 보여주기
  }
  render() {
    const { onRegister } = this.props
    return (
      <React.Fragment>
        <form onSubmit={e => this.handleSubmit(e)}>
          <h1>로그인</h1>
          <input type="text" name="username" />
          <input type="password" name="password" />
          <button>로그인</button>
        </form>
        <button onClick={() => onRegister()}>회원가입</button>
      </React.Fragment>
    )
  }
}