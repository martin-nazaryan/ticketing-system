import React, {useState} from 'react';
import {Button, Form, Input, Typography} from 'antd';
import cookies from "js-cookie";
import {useHistory} from "react-router-dom";

import UsersSvc from "../../../services/UsersSvc";
import {ACCESS_TOKEN} from "../../../constants";

import './styles.scss';

const Login = () => {
  const [error, setError] = useState('');
  const history = useHistory();

  const onFinish = async (values) => {
    const res = await UsersSvc.signIn(values);
    if (res.status) {
      const {token} = res.data;
      cookies.set(ACCESS_TOKEN, token);
      history.push('/');
    }

    setError(res.message)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className="login-container">
      <Typography.Title level={4}>
        Sign In
      </Typography.Title>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text type="danger">
        {error}
      </Typography.Text>
    </section>
  );
};

export default Login;
