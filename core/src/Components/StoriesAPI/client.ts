import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const RETRY_STATUS_CODE = 206;
const RETRY_WAIT_TIME = 1000;

export type RequestCallback = (data: object | object[]) => void;
export type RequestErrorCallback = (error: Error) => void;

export default class StoriesAPIClient {
  apiKey: string;

  baseUrl: string;

  client: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.client = this.buildClient();
  }

  buildClient() {
    const storyAPIRequest = axios.create();
    const sleepRequest = (milliseconds: number, originalRequest: AxiosRequestConfig) => (
      new Promise((resolve) => setTimeout(
        () => resolve(storyAPIRequest(originalRequest)),
        milliseconds,
      ))
    );
    storyAPIRequest.interceptors.request.use((config) => {
      const updatedConfig = { ...config };
      // Set API Key
      updatedConfig.headers.Authorization = `Api-Key ${this.apiKey}`;
      // Parse slug with base url
      if (!updatedConfig.url?.startsWith('http')) {
        updatedConfig.url = `${this.baseUrl}/api/${updatedConfig.url}`;
      }
      return updatedConfig;
    });

    storyAPIRequest.interceptors.response.use((response) => {
      const { config, data, status } = response;
      if (status === RETRY_STATUS_CODE && data && data.retry_url) {
        const newConfig = { ...config };
        newConfig.url = data.retry_url;
        newConfig.params = {};
        return sleepRequest(RETRY_WAIT_TIME, newConfig);
      }
      return data;
    });
    return storyAPIRequest;
  }

  request(slug: string, callback?: RequestCallback, err?: RequestErrorCallback) {
    return this.client.get(slug)
      .then((data) => callback && callback(data), (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        return err && err(error);
      });
  }

  story(
    slug: string,
    collection?: number | string,
    page?: number,
    q?: string,
    callback?: RequestCallback,
    err?: RequestErrorCallback,
  ) {
    let newSlug = slug;
    if (collection != null) {
      newSlug += `?collection=${collection}`;
      if (page) {
        newSlug += `&page=${page}`;
      }
      if (q) {
        newSlug += `&q=${q}`;
      }
    }
    return this.request(`story/${newSlug}`, callback, err);
  }

  collection(slug: string, callback?: RequestCallback, err?: RequestErrorCallback) {
    return this.request(`collection/${slug}`, callback, err);
  }
}
