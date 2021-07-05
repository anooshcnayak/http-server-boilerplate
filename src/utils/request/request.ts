import RequestConfig from "./request-config";

const Axios = require('axios').default;

const DEFAULT_TIMEOUT = 4000;

class Request {
  public static delete(
      url: string,
      body: any,
      headers?: any,
      config?: RequestConfig
  ): Promise<any> {
    const timeout = (config && config.timeout) || DEFAULT_TIMEOUT;
    const options = {
      timeout,
      method: 'DELETE',
      url,
      data: body,
      headers,
      json: true,
      params: {},
      withCredentials: true,
    };
    return this._request(options);
  }

  public static post(
      url: string,
      body: any,
      headers?: any,
      config?: RequestConfig
  ): Promise<any> {
    const timeout = (config && config.timeout) || DEFAULT_TIMEOUT;
    const options = {
      timeout,
      method: 'POST',
      url,
      data: body,
      headers,
      json: true,
      params: {},
      withCredentials: true,
    };
    return this._request(options);
  }

  public static put(
      url: string,
      body: any,
      headers?: any,
      config?: RequestConfig
  ): Promise<any> {
    const timeout = (config && config.timeout) || DEFAULT_TIMEOUT;
    const options = {
      timeout,
      method: 'PUT',
      url,
      data: body,
      headers,
      json: true,
      params: {},
      withCredentials: true,
    };
    return this._request(options);
  }

  public static get(
      url: string,
      headers?: any,
      config?: RequestConfig
  ): Promise<any> {
    const timeout = (config && config.timeout) || DEFAULT_TIMEOUT;
    const options = {
      timeout,
      method: 'GET',
      url,
      headers,
      json: true,
      params: {},
      withCredentials: true,
    };
    return this._request(options);
  }

  private static async _request(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Axios(options)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
    });
  }
}

export default Request;
