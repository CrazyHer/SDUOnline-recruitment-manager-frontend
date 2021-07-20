import { overrideFetch } from '.';

export default function customFetch(token: string = '') {
  overrideFetch({
    prefix: 'http://rap2api.taobao.org/app/mock/286854',
    fetchOption: { headers: { token } },
  });
}
