import { action, makeAutoObservable } from 'mobx';
import { Models } from '../rapper';

export default class State {
  depart: string;
  candidateList: {
    id: number;
    name: string;
    username: string;
    college: string;
    phone: string;
    qq: string;
    score: string;
    status: number;
    first: string;
    key: number;
  }[];
  constructor() {
    this.depart = '';
    this.candidateList = [];
    makeAutoObservable(this);
  }
  @action setDepart(depart: string) {
    this.depart = depart;
  }
  @action setCandidateList(
    candidateList: Models['POST/manager/interview/list']['Res']['data']['list']
  ) {
    this.candidateList = candidateList
      .sort((a, b) => a.id - b.id)
      .map((v) => ({ ...v, key: v.id }));
  }
}
