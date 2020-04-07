import React, { Component } from 'react'
import StoriesAPIStory from 'react-stories-api';


export default class App extends Component {
  render () {
    return (
      <StoriesAPIStory
        id="Q11641"
        endpoint="https://stories-api-stage.herokuapp.com"
        collection={2}
        apiKey="G69Rkdmn.kpTHArUusmaUDNizmsEnbmZzHm3kn6Ul"
        options={{
          onChange: index => console.log("Going to moment " + index),
          logo: <img alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"/>
        }}
      />
    )
  }
}
