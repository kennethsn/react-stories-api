import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss';

 /**
  * Header for a Card Component.
  */
export default class CardHeader extends Component {
  static propTypes = {
    /** Text to fill the `CardHeader` */
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { text } = this.props;
    return (
      <div className="story-card__header">{text}</div>
    )
  }
}
