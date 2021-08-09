import { overrideFetch } from '.';
import axios, { AxiosRequestConfig } from 'axios';

// 使用axios重写请求方法
const customFetch = (token: string) => {
  overrideFetch(
    ({ url, method, params }) =>
      new Promise<any>(async (resolve, reject) => {
        try {
          const config: AxiosRequestConfig = {
            method,
            url,
            data: params,
            baseURL: 'http://8.131.52.114:7001',
          };
          const response = await axios(
            // 登录接口请求头不附带token
            url === '/login' ? config : { ...config, headers: { token } }
          );
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      })
  );
};

export default customFetch;
