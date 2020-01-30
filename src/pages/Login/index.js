import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { router } from 'umi';
import ReactDOM from 'react-dom';
import RootComponent from '@/components/RootComponent/index';
import styles from '@/pages/Login/index.less';

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  onFinish = values => {
    console.log('Received values of form: ', values);
    const { username, password } = values;
    if ( username === 'test@example.com' && password === '123456') {
      notification.success({
        message: 'Notification Title',
        description: 'Login successfully',
      });
      router.push('/');
    } else {
      notification.error({
        message: 'Notification Title',
        description: 'Username or Password incorrect',
      });
    }
  };
  render () {
    return (
      <>
      <h2 className={styles["tittle-login"]}>Login to your account</h2>
      <Form
        name="normal_login"
        className={styles["form-login"]}
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={styles["login-form-forgot"]} href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      </>
      );
  }
}

export default Login;

