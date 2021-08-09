/* eslint-disable react-hooks/exhaustive-deps */
import Style from './Login.module.css';
import logo from '../../assets/sduonline-logo.png';
import { Input, Button, Form, message } from 'antd';
import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import User from '../../mobxStore/user';
import { fetch, Models } from '../../rapper';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props: any) => {
  const user = props.user as User;

  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();
  // 若用户已登录，自动跳转到主页
  useEffect(() => {
    if (user.token !== '') {
      history.replace('/');
    }
  }, [user.token]);

  const handleLogin = async (data: Models['POST/login']['Req']) => {
    setLoading(true);
    try {
      const res = await fetch['POST/login'](data);
      if (res.success) {
        const { token, role } = res.data;
        user.setToken(token);
        user.setLoginInfo(data.username, role);
      } else {
        message.warn(`登陆失败,${res.errorMsg}`);
        console.log(res);
      }
    } catch (error) {
      message.error(`登陆失败，请求异常`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.body}>
      <div className={Style.header}>
        <span />
        <h1>欢迎登录</h1>
        <span />
      </div>
      <div className={Style.content}>
        <img src={logo} alt='学线LOGO' />
        <div className={Style.loginFrame}>
          <Form
            className={Style.loginForm}
            initialValues={{ username: user.username }}
            onFinish={handleLogin}>
            <Form.Item
              name='username'
              rules={[{ required: true, message: '请输入账号!' }]}>
              <Input prefix={<UserOutlined />} placeholder='账号' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[{ required: true, message: '请输入密码!' }]}>
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder='密码'
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ width: '100%' }}
                type='primary'
                htmlType='submit'
                className='login-form-button'
                loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default inject('user')(observer(Login));
