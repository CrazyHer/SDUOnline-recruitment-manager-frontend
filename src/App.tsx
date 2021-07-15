import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

const HLayout = lazy(() => import('./components/HLayout'));
const Index = lazy(() => import('./pages/index/Index'));
const Login = lazy(() => import('./pages/login/Login'));

const LoadingPage = (
  <div
    style={{
      width: '100%',
      top: '40%',
      position: 'absolute',
      margin: '0 auto',
      textAlign: 'center',
    }}>
    <Spin spinning={true} size='large'></Spin>
    <p>加载中...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={LoadingPage}>
        <HLayout>
          <Suspense fallback={<></>}>
            <Switch>
              <Route path='/' exact component={Index} />
              <Route path='/login' component={Login} />
              <Redirect to='/' />
            </Switch>
          </Suspense>
        </HLayout>
      </Suspense>
    </Router>
  );
}

export default App;
