import React from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../containers/RegisterForm.js';

export default function RegisterFormPage(props) {
  return (
    <Layout title="회원가입">
      <RegisterForm {...props} />
    </Layout>
  );
}
