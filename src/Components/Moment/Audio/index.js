import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MomentBase from '../Base';

import AudioPlayerCard from './PlayerCard';
import './style.scss';

/**
 * General Audio layout Moment.
 */
export default class AudioMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Information to build the `AudioPlayerCard` */
    data: PropTypes.object.isRequired,
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
    type: "audio",
  }

  render() {
    const layout="audio"; // TODO: Add constant
    const { data } = this.props;
    return (
      <MomentBase {...this.props} layout={layout}>
        <AudioPlayerCard {...data} />
      </MomentBase>
    )
  }
}
