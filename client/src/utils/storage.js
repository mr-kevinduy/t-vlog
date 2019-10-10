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

/**
 * Set info of user
 * @param {any} data
 */
export const setUserInfo = data => {
  setToken(data.access_token);
  setRefreshToken(data.refresh_token);
  setStorageItem('user_info', JSON.stringify(data.user_info));
}
