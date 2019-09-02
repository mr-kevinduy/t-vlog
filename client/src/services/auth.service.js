import axios from "axios";
import { USER_ROLE } from '@/config';
import {
  registerAuth,
  loginAuth,
  logoutAuth,
  getAuthState,
  getCurrentUser,
  resetPasswordAuth,
  sendEmailVerification,
  applyOOBCode,
  checkOOBCode
} from './firebase/auth';
import { addUser } from './user.service';

/**
 * Register user with firebase authentication
 * @param  {tring} username   username/email
 * @param  {string} password user password
 * @param  {string} name name of user
 * @param  {string} role     ADMIN/EDITOR/SHOP/USER
 * @return {Promise}
 */
export const register = async (username, password, name = '', role = USER_ROLE) => {
  try {
    const credential = await registerAuth(username, password);
    console.log('1. credential: ', credential);
    if (credential !== null && credential.user !== null) {
      const sendEmailVerify = await sendEmailVerification();
      const res = await addUser(credential.user.uid, {
        username,
        name,
        role,
        userId: credential.user.uid
      });
      console.log('3. Users: ', res);
      return {
        status: 1,
        code: 'success.AUTH001'
      };
    } else {
      return {
        status: 0,
        code: 'error.AUTH001'
      };
    }
  } catch (err) {
    return {
      status: 0,
      code: 'error.AUTH001'
    };
  }
}

/**
 * Login with firebase authentication
 * @param  {string} username username/email
 * @param  {string} password user password
 * @return {Promise}
 */
export const login = async (username, password) => {
  try {
    const credential = await loginAuth(username, password);
    console.log(credential);
    if (credential !== null && credential.user !== null) {
      // credential.reload();

      if (credential.user.emailVerified === false) {
        return {
          status: 0,
          code: 'error.AUTH006',
          description: null
        };
      }

      const idToken = await credential.user.getIdToken();

      setToken(getCurrentUser());

      return {
        status: 1,
        code: 'success.AUTH002',
        description: null
      };
    } else {
      return {
        status: 0,
        code: 'error.AUTH002',
        description: credential.code
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 0,
      code: 'error.AUTH002',
      description: err.code
    }
  }
}

/**
 * Logout with firebase authentication
 * @return {Promise}
 */
export const logout = async () => {
  try {
    await logoutAuth();

    return {
      status: 1,
      code: 'AUTH001'
    };
  } catch (err) {
    return {
      status: 0,
      code: 'AUTH001'
    };
  }
}

/**
 * Send a password reset.
 * @param  {string} email
 * @return {any}
 */
export const resetPassword = async (email) => {
  try {
    const res = await resetPasswordAuth(email);

    return {
      status: 1,
      code: 'AUTH001'
    };
  } catch (err) {
    return {
      status: 0,
      code: 'AUTH001'
    };
  }
}

export const applyActionCode = async code => {
  try {
    const res = await applyOOBCode(code);

    return {
      status: 1,
      code: 'AUTH001'
    }
  } catch (err) {
    return {
      status: 0,
      code: 'AUTH001'
    }
  }
}

export const checkActionCode = async code => {
  try {
    const res = await checkOOBCode(code);

    return {
      status: 1,
      code: 'AUTH001'
    }
  } catch (err) {
    return {
      status: 0,
      code: 'AUTH001'
    }
  }
}

/**
 * Set info of user
 * @param {any} data
 */
export const setUserInfo = data => {
  setToken(data.access_token);
  setRefreshToken(data.refresh_token);
  setStorageItem('user_info', JSON.stringify(data.user_info));
}

/**
 * setAuthorizationHeader
 * @param  {any} token
 */
export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

/**
 * Set access token
 * @param {void} token
 */
export const setToken = token => {
  setStorageItem('access_token', token);
}

/**
 * Get access token
 * @return {string} token
 */
export const getToken = () => getStorageItem('access_token');

/**
 * Set refresh token
 * @param {any} token
 * @return {void}
 */
export const setRefreshToken = token => {
  setStorageItem('refresh_token', token);
}

/**
 * Get refresh token
 * @return {string} token
 */
export const getRefreshToken = () => getStorageItem('refresh_token');

/**
 * Clear token
 * @return {void}
 */
export const clearToken = () => {
  removeStorageItem('access_token');
  removeStorageItem('refresh_token');
}

/**
 * Set a item storage.
 * @param  {string} key
 * @param  {any} data
 * @return {void}
 */
export const setStorageItem = (key, data) => {
  localStorage.setItem(key, data);
}

/**
 * Get a item localstorage.
 * @param  {string} key
 * @return {any}     data
 */
export const getStorageItem = key => localstorage.getItem(key);

/**
 * Remove a item storage.
 * @param  {string} key
 * @return {void}
 */
export const removeStorageItem = key => {
  localstorage.removeItem(key);
}

/**
 * Clear all localstorage
 * @return {void}
 */
export const clearAllStorage = () => {
  localStorage.clear();
}
