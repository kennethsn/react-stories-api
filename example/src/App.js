import React, { Component } from 'react'

import  { Components as StoriesAPIComponents } from 'react-stories-api';

const { WikidataMoment } = StoriesAPIComponents.Moments;

export default class App extends Component {
  render () {
    return (
      <div>
        <WikidataMoment
          title="react-stories-api"
          subtitle="Currently Under Construction"
          entity_id="Q385378"
        />
      </div>
    )
  }
}
