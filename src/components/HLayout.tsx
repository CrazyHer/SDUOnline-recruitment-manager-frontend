/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Layout, message, Select, Spin } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import User from '../mobxStore/user';
import Style from './HLayout.module.css';
import logo from '../assets/sduonline-logo.png';
import { fetch } from '../rapper';
import { useState } from 'react';
import State from '../mobxStore/state';

const HLayout = (props: any) => {
  const { children } = props;
  const user = props.user as User;
  const state = props.state as State;
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    // 检查登录状态，若未登录则跳转登录页面
    if (user.token === '' && pathname !== '/login') {
      history.replace('/login');
    }
  }, [pathname, user.token]);

  useEffect(() => {
    if (user.token !== '') {
      user.setLoginLoading(true);
      fetch['POST/manager/info']()
        .then((res) => {
          if (res.success) {
            const { name, area, major, college, group, depart } = res.data;
            user.setUserInfo(name, area, major, college, group, depart);
            setAvailableDeparts(user.depart);
            state.setDepart(user.depart[0]);
          } else {
            message.error(`用户信息获取失败,${res.errorMsg}`);
          }
        })
        .catch((err) => {
          message.error('用户信息获取失败');
          console.error(err);
          handleLogoff();
        })
        .finally(() => user.setLoginLoading(false));
    }
  }, [user.token]);

  const [availableDeparts, setAvailableDeparts] = useState<string[]>([]);

  const handleChange = (value: string) => {
    state.setDepart(value);
  };

  const handleLogoff = () => {
    user.setToken('');
    user.setUserInfo('', '', '', '', '', []);
  };

  if (pathname === '/login') return <>{children}</>;
  // 除登录页面外，其他页面采用顶栏布局
  else {
    // 获取该账号下有权限查看的所有部门
    return (
      <Layout style={{ backgroundColor: 'white' }}>
        <Header
          style={{
            backgroundColor: 'white',
            backdropFilter: 'blur(2px)',
            borderBottom: 'solid 1px #dbdbdb',
            boxShadow: '0 2.5px 0 #f4f5f7',
            marginBottom: '33.25px',
            height: '67.5px',
          }}>
          <div className={Style.header}>
            <div className={Style.title}>
              <img src={logo} alt='学线LOGO' />
              <h1>
                <b>学生在线纳新管理平台</b>
              </h1>
            </div>

            {user.loginLoading ? (
              <Spin spinning={true} />
            ) : (
              <div className={Style.userinfo}>
                <p>{user.group}</p>

                <Select
                  disabled={pathname !== '/'}
                  defaultValue={state.depart}
                  onChange={handleChange}>
                  {availableDeparts.map((v, i) => (
                    <Select.Option key={i} value={v}>
                      {v}
                    </Select.Option>
                  ))}
                </Select>

                <p>{user.name}</p>

                <Button type='link' onClick={handleLogoff}>
                  退出
                </Button>
              </div>
            )}
          </div>
        </Header>
        <Content>{children}</Content>
      </Layout>
    );
  }
};

export default inject('user', 'state')(observer(HLayout));
