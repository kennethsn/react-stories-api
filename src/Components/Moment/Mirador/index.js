import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Mirador from '../../Mirador';
import MomentBase from '../Base';

import './style.scss';


/**
 * Mirador layout Moment.
 */
export default class MiradorMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Configurations to pass through to the `Mirador` component. */
    config: PropTypes.object,
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
    type: "mirador",
  }

  render() {
    const { config } = this.props;
    const layout="mirador"; // TODO: Add constant

    return (
      <MomentBase {...this.props} layout={layout}>
        <Mirador config={config} />
      </MomentBase>
    )
  }
}
