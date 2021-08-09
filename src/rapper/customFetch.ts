import { overrideFetch } from '.';

export default function customFetch(token: string = '') {
  overrideFetch({
    prefix: 'http://8.131.52.114',
    fetchOption: { headers: { token } },
  });
}
