import axios from "axios";

export default class StoriesAPIClient {

  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.client = this.buildClient();
  };

  buildClient(){
    const storyAPIRequest = axios.create();

    storyAPIRequest.interceptors.request.use(config => {
      // Set API Key
      config.headers.Authorization = "Api-Key " + this.apiKey;
      // Parse slug with base url
      config.url = `${this.baseUrl}/api/${config.url}`;
      return config;
    });

    storyAPIRequest.interceptors.response.use(response => {
      return response.data;
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
