import { overrideFetch } from '.';

export default function customFetch(token: string = '') {
  overrideFetch({
    prefix: 'http://rap2api.taobao.org/app/mock/2018546',
    fetchOption: { headers: { token } },
  });
}
