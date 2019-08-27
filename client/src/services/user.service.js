import { UserModel } from './firebase/models';

/**
 * addUser - Create new user
 * @param  {integer} id
 * @param  {any} data
 * @return {Object}
 */
export const addUser = async (id, data) => {
  try {
    const res = await UserModel()
      .doc(id)
      .set(data);

    console.log('Res:setUser :', res);
  } catch (err) {
    console.log('Error:setUser :', err);

    return {
      status: 0,
      code: 'Set user data error'
    }
  }
};

export const updateUser = async (id) => {

};

export const updateUserByColumn = async (col) => {

};
