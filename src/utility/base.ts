import z, { type ZodType } from "zod";
import axios, { AxiosError, type AxiosResponse } from "axios";

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
        if (error instanceof z.ZodError) {
          const prettyError = z.prettifyError(error);
          return Promise.reject({
            ...error,
            response,
            message: prettyError,
            isValidationError: true,
          });
        }
        throw error;
      }
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 || status === 403)
      console.warn("Session expired. Redirecting to login.");

    return Promise.reject(error);
  },
);
export default base; 