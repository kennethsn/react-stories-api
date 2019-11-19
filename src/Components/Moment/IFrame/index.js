import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MomentBase from '../';
import './style.scss';

/**
 * General iFrame layout Moment.
 */
export default class IFrameMoment extends Component {
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
    /** The source of the iFrame to render in the `Moment`'s body. */
    url: PropTypes.string.isRequired,

  }
  static defaultProps = {
    color: {
      background: "gray",
      text: "white"
    },
    type: "iframe",
  }

  render() {
    const layout="iframe"; // TODO: Add constant
    const { url } = this.props;
    return (
      <MomentBase {...this.props} layout={layout}>
        <iframe src={url} width="100%" height="100vh" allowFullScreen
          frameBorder="0"></iframe>
      </MomentBase>
    )
  }
}
