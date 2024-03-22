import axios from "axios";

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

export default axiosInstance;
