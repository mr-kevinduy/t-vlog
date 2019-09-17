import { parseErrors, validateEmail } from '../../utils/common';
import { authService } from './index';

export const registerAuth = async (username, email, password, fullname = '') => {
  const test = parseErrors({
    email: {
      value: email,
      valid: [
        {
          message: 'Can not blank',
          valid: val => !val ? true : true
        },
        {
          message: 'Format not true',
          valid: validateEmail
        }
      ]
    },
    username: {
      value: username,
      valid: [
        {
          message: 'Can not blank',
          valid: val => !val ? true : false
        },
        {
          message: 'Format not true',
          valid: validateEmail
        }
      ]
    }
  });

  console.log(test);
  return test;

  // if (!username) return ({
  //   status: 0,
  //   errors: {
  //     username: 'Can not blank'
  //   }
  // });

  // if (!email) return ({
  //   status: 0,
  //   errors: {
  //     email: 'Can not blank'
  //   }
  // });

  // if (!password) return ({
  //   status: 0,
  //   errors: {
  //     password: 'Can not blank'
  //   }
  // });

  return await authService.query('register', {
    user: { username, email, password, fullname }
  }, 'post').then(res => res).catch(errors => errors);
}

export const loginAuth = async (loginId, password) => await authService.query('login', {
  user: { loginId, password }
}, 'post');
