import { action, makeAutoObservable } from 'mobx';
import customFetch from '../rapper/customFetch';

export default class User {
  token: string;
  username: string;
  role: string;
  depart: string[];
  group: string;
  area: string;
  name: string;
  major: string;
  college: string;
  constructor() {
    makeAutoObservable(this);

    this.token = localStorage.getItem('token') || '';
    this.username = localStorage.getItem('username') || '';
    this.role = '';
    this.depart = [];
    this.group = '';
    this.area = '';
    this.name = '';
    this.major = '';
    this.college = '';
    customFetch(this.token);
  }

  @action setToken = (token: string) => {
    this.token = token;
    localStorage.setItem('token', token);
    customFetch(token);
  };

  @action setLoginInfo = (username: string, role: string) => {
    this.role = role;
    this.username = username;
    localStorage.setItem('username', username);
  };

  @action setUserInfo = (
    name: string,
    area: string,
    major: string,
    college: string,
    group: string,
    depart: string[]
  ) => {
    this.name = name;
    this.area = area;
    this.major = major;
    this.college = college;
    this.group = group;
    this.depart = depart;
  };
}
