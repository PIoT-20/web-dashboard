import type HttpClientInterface from "@/interfaces/http-client-interface";
import axios, { type AxiosInstance } from "axios";

function createHttpClient(): HttpClientInterface {
  return axios.create({
    baseURL: "http://localhost",
    headers: { 'Content-Type': 'application/json', Accept: '*/*' },
  })
}
const httpClient = createHttpClient();

export default httpClient;
