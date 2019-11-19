import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classList } from '../../utils';
import './style.scss';

 /**
  * General Card Component.
  */
export default class CardBase extends Component {
  static propTypes = {
    /** Styling object of the `Card` */
    style: PropTypes.object,
    /** The type of `Card` */
    type: PropTypes.string,
  };

  static defaultProps = {
    type: "base",
  };

  render() {
    const { children, style, type } = this.props;
    const classes = classList(
      'story-card',
      `story-card-${type}`
    );
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    )
  }
}
