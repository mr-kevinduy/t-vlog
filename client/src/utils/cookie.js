import Cookies from 'universal-cookie';
import { getEnvironment } from './environment';

const cookies = new Cookies();

/**
 * Set cookie.
 * @param  {string} name    cookie key/name.
 * @param  {string} data   data save to cookie.
 * @param  {Object} options Options config cookie.
 * @return {void}
 */
export const setCookie = (name, data, options = {}) => {
  cookies.set(name, data, Object.assign({
    path: '/',
    maxAge: 604800,
    secure: getEnvironment() === 'production'
  }, options));
};

/**
 * Get cookie.
 * @param  {string} name cookie key/name.
 * @return {string} cookie data
 */
export const getCookie = name => cookies.get(name);

/**
 * Delete cookie.
 * @param  {string} name cookie key/name.
 * @return {any}
 */
export const removeCookie = name => cookies.remove(name);
