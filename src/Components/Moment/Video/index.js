import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MomentBase from '../Base';
import './style.scss';

/**
 * General Video layout Moment.
 */
export default class VideoMoment extends Component {
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
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,
    /** The source of the Video to render in the `Moment`'s body. */
    url: PropTypes.string.isRequired,

  }
  static defaultProps = {
    type: "video",
  }

  render() {
    const layout="video"; // TODO: Add constant
    const { url } = this.props;
    return (
      <MomentBase {...this.props} layout={layout}>
        <video width="100%" controls>
            <source src={url} />
          Your browser does not support the video tag.
        </video>
      </MomentBase>
    )
  }
}
