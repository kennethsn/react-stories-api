import React, { Component } from 'react'

import  { Components as StoriesAPIComponents } from 'react-stories-api';

const { Moments, Story } = StoriesAPIComponents;
const { MomentBase, WikidataMoment } = Moments;

export default class App extends Component {
  render () {
    return (
      <Story label="Example Story">
        <MomentBase
          title="react-stories-api"
          subtitle="Currently Under Construction"
          label="Welcome"
          index={0}
          color={{background:'#3f4d4a', text:'#4ec7ad'}}
        >
          Thank You for Visiting! Please Check back soon.
        </MomentBase>
        <WikidataMoment
          title="react-stories-api"
          subtitle="Currently Under Construction"
          entity_id="Q385378"
          index={1}
          color={{background:'#4ec7ad', text:'#3f4d4a'}}
        />
      </Story>
    )
  }
}
