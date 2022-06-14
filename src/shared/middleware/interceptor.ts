import axios from 'axios';

import store from '../../store/store';
import { addEMSIToken } from '../../store/auth/authSlice';

import { EMSIAuthentication } from '../services/api';

axios.interceptors.request.use(
  (req) => {
    if (req.baseURL?.includes('skills')) {
      req.headers = {
        'Authorization': `Bearer ${store.getState().auth.emsi_access_token}`,
      };
    }
    return req;
  },
  (error) => error
)

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      const data = await EMSIAuthentication();

      if (data && Object.keys(data).length) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data?.access_token}`;
        store.dispatch(addEMSIToken(data?.access_token));
        return axios(error.config);
      }
    }
    return error;
  }
)