import { action, makeAutoObservable } from 'mobx';

export default class State {
  depart: string;
  constructor() {
    this.depart = '';
    makeAutoObservable(this);
  }
  @action setDepart(depart: string) {
    this.depart = depart;
  }
}
