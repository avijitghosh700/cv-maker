import axios from "axios";
import store from "../store/store";
import { EMSIAuthentication } from "./services/api";
import { addEMSIToken } from "../store/auth/authSlice";

export const BASE_AUTH: string = "https://auth.emsicloud.com";
export const BASE_URL: string = "https://emsiservices.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// EMSI API config
export const EMSI_CONFIG = {
  client_id: "vcb8mg0r0cv9czh5",
  client_secret: "eIDhuFAx",
  grant_type: "client_credentials",
  scope: "emsi_open",
};
// END

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

export default axiosInstance;
