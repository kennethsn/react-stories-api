import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TileMoment from '../Tile';
import './style.scss';

/**
 * Gallery card layout Moment.
 */
export default class GalleryMoment extends Component {
  static propTypes = {
    /** Children nodes used to fill the cards */
    // children: PropTypes.node.isRequired,
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Determines the `SideBarSection` `Icon` of the `Moment`. */
    icon: PropTypes.element,
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Determines the `SideBarSection` text of the `Moment`. */
    label: PropTypes.string,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,

  }
  static defaultProps = {
    type: "gallery",
  }

  render() {
    const { children } = this.props; // Should be instances of GalleryImage
    return (
      <TileMoment {...this.props}>
        {children}
      </TileMoment>
    )
  }
}
