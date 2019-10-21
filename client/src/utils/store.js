import { setCookie, getCookie, removeCookie } from './cookie';

/**
 * Set access token
 * @param {void} token
 */
export const setToken = token => {
  setCookie('access_token', token);
}

/**
 * Get access token
 * @return {string} token
 */
export const getToken = () => getCookie('access_token');

/**
 * Set refresh token
 * @param {any} token
 * @return {void}
 */
export const setRefreshToken = token => {
  setCookie('refresh_token', token);
}

/**
 * Get refresh token
 * @return {string} token
 */
export const getRefreshToken = () => getCookie('refresh_token');

/**
 * Clear token
 * @return {void}
 */
export const clearToken = () => {
  removeCookie('access_token');
  removeCookie('refresh_token');
}

/**
 * Set info of user
 * @param {any} data
 */
export const setUserInfo = data => {
  setToken(data.access_token);
  setRefreshToken(data.refresh_token);
  setCookie('user_info', JSON.stringify(data.user_info));
}
