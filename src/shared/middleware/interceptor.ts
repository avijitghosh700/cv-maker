import store from "../../store/store";
import { addEMSIToken } from "../../store/auth/authSlice";

import { EMSIAuthentication } from "../services/api";
import axiosInstance from "./httpConfig";

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.url?.includes("skills")) {
      req.headers = {
        Authorization: `Bearer ${store.getState().auth.emsi_access_token}`,
      };
    }
    return req;
  },
  (error) => error
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      const data = await EMSIAuthentication();

      if (data && Object.keys(data).length) {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data?.access_token}`;

        store.dispatch(addEMSIToken(data?.access_token));
        return axiosInstance(error.config);
      }
    }
    return error;
  }
);
