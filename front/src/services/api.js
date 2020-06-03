import axios from 'axios';
import cookies from 'js-cookie';
import {ACCESS_TOKEN} from "../constants";

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  if (config.url !== '/auth/sign-in') {
    let accessToken = cookies.get(ACCESS_TOKEN);
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
