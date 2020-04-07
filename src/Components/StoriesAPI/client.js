import axios from "axios";
const RETRY_STATUS_CODE = 206;
const RETRY_WAIT_TIME = 1000;

export default class StoriesAPIClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.client = this.buildClient();
  };

  buildClient(){
    const storyAPIRequest = axios.create();
    const sleepRequest = (milliseconds, originalRequest) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(storyAPIRequest(originalRequest)),
                   milliseconds);
      });
    };
    storyAPIRequest.interceptors.request.use(config => {
      // Set API Key
      config.headers.Authorization = "Api-Key " + this.apiKey;
      // Parse slug with base url
      if (!config.url.startsWith("http")) {
        config.url = `${this.baseUrl}/api/${config.url}`;
      }
      return config;
    });

    storyAPIRequest.interceptors.response.use(response => {
      const { config, data, status } = response;
      if (status === RETRY_STATUS_CODE && data && data.retry_url){
        const newConfig = {...config};
        newConfig.url = data.retry_url;
        newConfig.params = {};
        return sleepRequest(RETRY_WAIT_TIME, newConfig);
      }
      return data;
    });
    return storyAPIRequest;
  };

  request(slug, callback, err){
    return this.client.get(slug)
    .then(data => {
      return callback(data);
    }, error => {
      console.log(error);
      return err(error);
    })
  };

  story(slug, collection, page, q, callback, err){
    if (collection !== null){
      slug += `?collection=${collection}`;
      if (page) {
        slug += `&page=${page}`;
      };
      if (q) {
        slug += `&q=${q}`;
      }
    };
    return this.request("story/"+slug, callback, err);
  };

  collection(slug, callback, err){
    return this.request("collection/"+slug, callback, err);
  };
}
