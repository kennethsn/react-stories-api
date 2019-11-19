import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classList } from '../../utils';
import './style.scss';

 /**
  * Styled Pipe text separator. 
  */
export default class Pipe extends Component {
  static propTypes = {
    /** The color of the `Pipe` separator */
    color: PropTypes.string,
    /** Specifiy the thickness of the `Pipe` separator */
    type: PropTypes.oneOf(['normal', 'thin', 'thick']).isRequired,

  };

  static defaultProps = {
    type: 'normal',
  };

  render() {
    const { color, type } = this.props;
    const classes = classList(
      'story-pipe',
      `story-pipe-${type}`
    );
    const style = { color };

    return (
      <div className={classes} style={style}>|</div>
    )
  }
}
