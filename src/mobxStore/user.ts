import { action, makeAutoObservable } from 'mobx';
import customFetch from '../rapper/customFetch';

export default class User {
  constructor() {
    makeAutoObservable(this);
    this.token = localStorage.getItem('token') || '';
    customFetch(this.token);
  }

  token: string;

  @action setToken = (token: string) => {
    this.token = token;
    customFetch(token);
  };
}
