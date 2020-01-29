import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Story from '../../Story';
import StoriesAPIClient from '../client';
import { MomentUtils } from './utils';

import './style.scss';


/**
* Story generated by the Stories-API endpoint.
*/
export default class StoriesAPIStory extends Component {
  static propTypes = {
    /** API Key to interact with the StoriesAPI */
    apiKey: PropTypes.string.isRequired,
    /** StoriesAPI collection id */
    collection: PropTypes.number,
    /** Override `StoriesAPI` data fetching to use custom data */
    data: PropTypes.object,
    /** `StoriesAPI` endpoint URL */
    endpoint: PropTypes.string.isRequired,
    /** Identifier of the `Story` */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /** Props to pass to the `Story` component */
    options: PropTypes.object,

  };

  static defaultProps = {
    collection: null,
    data: null,
    endpoint: process.env.STORIES_API_URL,
    options: {},
  };

  constructor(props) {
    super(props);
    const { apiKey, data, endpoint } = props;
    this.state = {
      loading: data ? false : true,
      data: data,
    };

    this.client = new StoriesAPIClient(endpoint, apiKey);
  };

  componentDidMount() {
    if (!this.state.data) {
      this.setState({ loading: true });
      this.fetchData(data => {
        this.setState({loading: false});
      });
    }
  };

  fetchData(callback) {
    const { collection, endpoint, id } = this.props;
    return this.client.story(id, collection, null, story => {
       this.setState({data: story});
       return callback(story);
     });
  };

  renderMoments(){
    const { data } = this.state;

    const storyMoments = [];
    data.moments.map(moment => {
      const { type } = moment;
      if (MomentUtils.isPublicMoment(moment)) {
        const index = storyMoments.length;
        storyMoments.push(MomentUtils.buildMoment(moment, index));
      }
    })
    return storyMoments;
  }

  renderLoading(){
    // TODO (#84): Setup loading
    return <div> LOADING... </div>
  }

  render() {
    const { options } = this.props;
    const { data, loading } = this.state;

    return loading ? this.renderLoading() : (
      <Story {...data} {...options}>
        {this.renderMoments()}
      </Story>
    );
  }
}
