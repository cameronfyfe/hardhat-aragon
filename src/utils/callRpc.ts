import axios, { AxiosRequestConfig } from "axios";

export const callRpc = async (url: string, method: string, params?: any) => {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const body = params ? {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    } : {
      jsonrpc: "2.0",
      method: method,
      id: 1,
    };
  
    const res = await axios.post(url, body, config);

    return res.data.result;
  }
