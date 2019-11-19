import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss';

 /**
  * Pill for a Card Component.
  */
export default class CardPill extends Component {
  static propTypes = {
    /** Styling object of the `Card` */
    style: PropTypes.object,
    /** Text to fill the `CardPill` */
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { style, text } = this.props;
    return (
      <div className="story-card__pill" style={style}>{text}</div>
    )
  }
}
