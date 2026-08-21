import { type ZodType } from "zod";
import axios, { type AxiosResponse } from "axios";

const base = axios.create({ baseURL: "/api" });

declare module "axios" {
  export interface AxiosRequestConfig {
    schema?: ZodType<any>;
  }
}
base.interceptors.response.use(
  (response: AxiosResponse) => {
    const schema = response.config.schema;
    if (schema) {
      try {
        const validated = schema.parse(response.data);
        response.data = validated;
      } catch (error) {
        console.log(response.data);
        return Promise.reject(error);
      }
    }
    return response;
  },
  (error) => Promise.reject(error),
);
export default base; 