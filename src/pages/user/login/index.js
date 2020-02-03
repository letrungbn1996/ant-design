import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Icon, Button, notification, Checkbox } from 'antd';
import { Form } from '@ant-design/compatible';
import styles from '@/pages/user/login/style.less';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h2
          style={{
            maxWidth: '300px',
            margin: '0 auto',
            textAlign: 'center',
            paddingBottom: '20px',
          }}
        >
          Login in your account
        </h2>
        <Form onSubmit={this.handleSubmit} className={styles['form-login']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', width: '100%' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className={styles['login-form-forgot']} href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default WrappedNormalLoginForm;
