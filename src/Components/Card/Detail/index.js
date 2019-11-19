import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss';

 /**
  * Detail for a Card Component.
  */
export default class CardDetail extends Component {
  static propTypes = {
    /** Styling object of the `Card` */
    style: PropTypes.object
  };

  static defaultProps = {
  };

  render() {
    const { children, style } = this.props;
    return (
      <div className="story-card__detail" style={style}>{children}</div>
    )
  }
}
