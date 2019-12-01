import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MomentBase from '../Base';
import './style.scss';

/**
 * General Parallax image layout Moment.
 */
export default class ParallaxMoment extends Component {
  static propTypes = {
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
    type: "parallax",
  }

  render() {
    const { children } = this.props; // Should be instances of ParallaxImage
    return (
      <MomentBase {...this.props} layout="parallax">
        {children}
      </MomentBase>
    )
  }
}
