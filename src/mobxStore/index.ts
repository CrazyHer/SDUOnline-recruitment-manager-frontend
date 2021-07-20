import { configure } from 'mobx';
import State from './state';
import User from './user';

configure({ enforceActions: 'observed' });

const user = new User();
const state = new State();

const stores = { user, state };

export default stores;
