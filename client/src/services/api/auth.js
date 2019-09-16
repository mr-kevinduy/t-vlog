import { authService } from './index';

export const registerAuth = async (username, email, password, fullname = '') => await authService.query('register', {
  user: { username, email, password, fullname }
}, 'post').then(res => res).catch(errors => errors);

export const loginAuth = async (loginId, password) => await authService.query('login', {
  user: { loginId, password }
}, 'post');
