import { isObjectEmpty } from '../../utils/common';
// import { setUserInfo } from '../../utils/storage';
import validRegister from '../validate/register';
import validLogin from '../validate/login';
import { apiService } from './index';

// export const authService = apiService.setInstanceID('auth');

export const registerAuth = async (username, email, password, repeatPassword, fullname = '') => {
  const errors = validRegister({ username, email, password, repeatPassword });

  if (!isObjectEmpty(errors)) return ({
    status: 0,
    errors
  });

  return await apiService.query('auth/register', {
    user: { username, email, password, repeatPassword }
  }, 'post')
    .then(res => res)
    .catch(errs => ({ errors: errs }));
}

export const loginAuth = async (email, password) => {
  const errors = validLogin({ email, password });

  if (!isObjectEmpty(errors)) return ({
    status: 0,
    errors
  })

  return await apiService.query('auth/login', {
    user: { email, password }
  }, 'post')
    .then(res => {
      // setUserInfo({ access_token: res.payload, refresh_token: '', user_info: res.payload });
      const { token, email, username } = res.payload;
      localStorage.setItem('access_token', token);
      apiService.setAuthorizationHeader(token);
      console.log('Login header set: ', apiService.getHeaders());
      return res;
    })
    .catch(errs => ({ errors: errs }));
}
