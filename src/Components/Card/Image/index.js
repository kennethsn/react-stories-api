import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss';

 /**
  * Image for a Card Component.
  */
export default class CardImage extends Component {
  static propTypes = {
    /** Alt Text to describe the `CardImage` */
    alt: PropTypes.string,
    /** Source to fill the `CardImage` */
    src: PropTypes.string.isRequired,
  };

  static defaultProps = {
  };

  render() {
    return (
      <div className="story-card__image">
        <img {...this.props} />
      </div>
    )
  }
}
