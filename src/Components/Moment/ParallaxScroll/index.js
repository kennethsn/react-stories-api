import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ParallaxProvider } from 'react-scroll-parallax';

import MomentBase from '../Base';
import './style.scss';

/**
 * General layout Moment for using Parallax Scroll components.
 */
export default class ParallaxScrollMoment extends Component {
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
    color: {
      background: "gray",
      text: "white"
    },
    type: "parallax_scroll",
  }

  render() {
    const { children } = this.props;

    const layout="parallax_scroll"; // TODO: Add constant

    return (
      <MomentBase {...this.props} layout={layout}>
        <ParallaxProvider>
        <div>
          {children}
          </div>
        </ParallaxProvider>
      </MomentBase>
    )
  }
}
