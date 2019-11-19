import React, { Component } from 'react'

import { WikidataMoment } from 'react-stories-api';

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
