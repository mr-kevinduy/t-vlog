/**
 * Set a item storage.
 * @param  {string} name
 * @param  {any} data
 * @return {void}
 */
export const setStorageItem = (name, data) => {
  localStorage.setItem(name, data);
}

/**
 * Get a item localstorage.
 * @param  {string} name
 * @return {any}     data
 */
export const getStorageItem = name => localstorage.getItem(name);

/**
 * Remove a item storage.
 * @param  {string} name
 * @return {void}
 */
export const removeStorageItem = name => {
  localstorage.removeItem(name);
}

/**
 * Clear all localstorage
 * @return {void}
 */
export const clearAllStorage = () => {
  localStorage.clear();
}
