import { apiService } from './index';

// export const userService = apiService.setInstanceID('users');

export const getUsers = async () => {
  console.log(apiService.getHeaders());
  return await apiService.query('/users', {}, 'get')
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
