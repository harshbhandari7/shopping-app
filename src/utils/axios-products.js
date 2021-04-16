import axios from 'axios';

import {baseURL} from './envvariable';

const instance = axios.create({
    baseURL:baseURL,
    withCredentials: false,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
  }
});

export default instance;