/*
 import fetch from 'isomorphic-fetch';
 import Config from '../../server/config';

 export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
 process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
 '/api';

 export default function callApi(endpoint, method = 'get', body) {
 return fetch(`${API_URL}/${endpoint}`, {
 headers: {'content-type': 'application/json'},
 method,
 body: JSON.stringify(body),
 }).then(function(response) {
 if (response.status >= 400) {
 throw new Error("Bad response from server");
 }
 return response.json();
 })
 .then(function(stories) {
 console.log(stories);
 });
 }
 */

import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
    '/api';

export default function callApi(endpoint, method = 'get', jwt = '', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': jwt,
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
