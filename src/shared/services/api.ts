import axios from "axios";
import qs from "qs";

import axiosInstance, { BASE_AUTH, EMSI_CONFIG } from "../httpConfig";

export const EMSIAuthentication = async (): Promise<Record<string, any>> => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_AUTH}/connect/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(EMSI_CONFIG),
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const EMSISearchSkills = async (query: string, limit: number): Promise<any> => {
  return axiosInstance.get("/skills/versions/latest/skills", {
    params: {
      q: query,
      typeIds: "ST1,ST2",
      fields: "id,name,type,infoUrl",
      limit,
    },
  });
};
