import { userService } from './index';

export const getUsers = async () => {
  return await userService.query('/', {}, 'get')
    .then(res => {
      // setUserInfo({ access_token: res.payload, refresh_token: '', user_info: res.payload });
      console.log('getUsers: ', res);

      return {
        status: 1,
        payload: res.payload
      };
    })
    .catch(errs => ({ errors: errs.errors }));
}
