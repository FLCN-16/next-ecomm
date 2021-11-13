import Axios from 'axios';

const config = {
  baseURL: process.env.API_ROUTE + '/api/'
}

const http = Axios.create(config)

http.interceptors.response.use(response => response, error => error.response);

export default http;