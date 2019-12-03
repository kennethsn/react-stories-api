import axios from "axios";

export default class StoriesAPIClient {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.client = this.buildClient();
  };

  buildClient(){
    const storyAPIRequest = axios.create();

    storyAPIRequest.interceptors.request.use(config => {
      // Parse slug with base url
      config.url = `${this.baseUrl}/api/story/${config.url}`;
      return config;
    });

    storyAPIRequest.interceptors.response.use(response => {
      return response.data;
    });
    return storyAPIRequest;
  }

  get(slug, callback, err){
    return this.client.get(slug)
    .then(data => {
      return callback(data);
    }, error => {
      console.log(error);
      return err(error);
    })
  }
}
