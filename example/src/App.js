import React, { Component } from 'react'
import StoriesAPIStory from 'react-stories-api';


export default class App extends Component {
  render () {
    return (
      <StoriesAPIStory
        id="Q11641"
        endpoint="https://stories-api-stage.herokuapp.com"
        collection={1}
        apiKey="G69Rkdmn.kpTHArUusmaUDNizmsEnbmZzHm3kn6Ul"
      />
    )
  }
}
