import { isObjectEmpty } from '../../utils/common';
// import { setUserInfo } from '../../utils/storage';
import validRegister from '../validate/register';
import validLogin from '../validate/login';
import { authService } from './index';

export const registerAuth = async (username, email, password, repeatPassword, fullname = '') => {
  const errors = validRegister({ username, email, password, repeatPassword });

  if (!isObjectEmpty(errors)) return ({
    status: 0,
    errors
  })

  return await authService.query('register', {
    user: { username, email, password, repeatPassword }
  }, 'post')
    .then(res => ({
      status: 1,
      payload: res.payload
    }))
    .catch(errs => ({ errors: errs.errors }));
}

export const loginAuth = async (email, password) => {
  const errors = validLogin({ email, password });

  if (!isObjectEmpty(errors)) return ({
    status: 0,
    errors
  })

  return await authService.query('login', {
    user: { email, password }
  }, 'post')
    .then(res => {
      // setUserInfo({ access_token: res.payload, refresh_token: '', user_info: res.payload });
      const { token, email, username } = res.payload;
      localStorage.setItem('access_token', token);
      authService.setAuthorizationHeader(token);

      return {
        status: 1,
        payload: res.payload
      };
    })
    .catch(errs => ({ errors: errs.errors }));
}
