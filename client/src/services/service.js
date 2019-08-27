import axios from 'axios';
import firebase from './firebase';

export default class Service {
  /**
   * constructor
   * @param  {string} instanceId a instance of api
   * @param  {any} vm         vm of parent Vue component. It's need to access to $socket
   * @param  {object} socketOpts socket options
   * @return {void}
   */
  constructor(instanceId, vm, socketOpts) {
    this.instanceId = instanceId;
    this.axios = axios.create({
      baseURL: `/api/${instanceId}/`,
      responseType: "json"
    });
  }

  /**
   * Call a service action via REST API
   * @param  {string} action name of action
   * @param  {object} params parameters for request
   * @return {Promise}
   */
  query(action, params) {
    return new Promise((resolve, reject) => {
      this.axios.request(action, {
        method: "post",
        data: params
      }).then((response) => {
        if (response.data && response.data.data)
          resolve(response.data.data);
        else
          reject(response);
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          console.error("REST request error!", error.response.data.error);
          reject(error.response.data.error);
        } else
          reject(error);
      });
    });
  }
}
