import type { AxiosResponse } from "axios";

abstract class HttpClientInterface {
  abstract get(url: string): Promise<AxiosResponse>
  abstract post(url: string, data: any): Promise<AxiosResponse>
  abstract put(url: string, data: any): Promise<AxiosResponse>
  abstract delete(url: string): Promise<AxiosResponse>
}
export default HttpClientInterface;
