import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IFrameMoment from '../IFrame';
import './style.scss';

/**
 * YouTube layout Moment.
 */
export default class YouTubeMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** YouTube Video Identifier */
    video_id: PropTypes.string,
    /** The full embedable URL of the YouTube video */
    url: PropTypes.string,
  }
  static defaultProps = {
    title: "YouTube Video"
  };

  render() {
    const props = {...this.props};
    props.url = props.url = props.url || `https://www.youtube.com/embed/${props.video_id}`;
    return (
      <IFrameMoment {...props} type="youtube" />
    )
  }
}
