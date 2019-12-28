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
      config.url = `${this.baseUrl}/api/story/${config.url}`;
      return config;
    });

    storyAPIRequest.interceptors.response.use(response => {
      return response.data;
    });
    return storyAPIRequest;
  }

  get(slug, collection, callback, err){
    if (collection !== null){
      slug += `?collection=${collection}`;
    }
    return this.client.get(slug)
    .then(data => {
      return callback(data);
    }, error => {
      console.log(error);
      return err(error);
    })
  }
}
