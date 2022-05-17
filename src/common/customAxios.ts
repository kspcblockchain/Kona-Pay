import axios, { AxiosInstance } from "axios";

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    withCredentials: true,
  },
});

export default class CustomAxios {
  public static async download(endPoint: string) {
    let blob: "blob" = "blob";
    let result = await customAxios.get(endPoint);
    return result;
  }

  public static async get(endPoint: string) {
    let result = await customAxios.get(endPoint);
    return result;
  }

  public static async put(endPoint: string, payload: any) {
    let result = await customAxios.put(endPoint, payload);
    return true;
  }

  public static async patch(endPoint: string, payload: any) {
    let result = await customAxios.patch(endPoint, payload);
    return true;
  }

  public static async post(endPoint: string, payload: any) {
    let result = await customAxios.post(endPoint, payload);
    return result;
  }

  public static async delete(endPoint: string, data: any) {
    let result = await customAxios.delete(endPoint, { data: data });
    return result;
  }
}
