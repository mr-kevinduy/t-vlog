import axios from 'axios';
// import firebase from './firebase';

export default class Service {
  /**
   * constructor
   * @param  {string} instanceId a instance of api
   * @param  {any} vm         vm of parent Vue component. It's need to access to $socket
   * @param  {object} socketOpts socket options
   * @return {void}
   */
  constructor(baseUrl, instanceId = null) {
    this.baseUrl = baseUrl;
    this.instanceId = instanceId;
    this.axios = axios.create({
      baseURL: instanceId !== null ? `/${baseUrl}/${instanceId}/` : `/${baseUrl}/`,
      responseType: "json"
    });
  }

  /**
   * Call a service action via REST API
   * @param  {string} action name of action
   * @param  {object} params parameters for request
   * @return {Promise}
   */
  query(action, params, method = 'get') {
    return new Promise((resolve, reject) => {
      return this.axios.request(action, {
        method,
        data: params
      }).then((response) => {
        console.log('Service res: ', response);
        if (response.data && response.data.payload)
          resolve({ status: 1, payload: response.data.payload });
        else
          reject({ status: 1, payload: null });
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          // console.log('error.response', JSON.stringify(error.response.data.errors));
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          reject({ status: 0, errors: error.response.data.errors });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('error.request');
          reject({ status: 0, errors: error.request });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('error.message');
          reject({ status: 0, errors: error.message });
        }
      });
    });
  }

  setAuthorizationHeader(token = null) {
    if (token) {
      this.axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common.authorization;
    }
  }
}
