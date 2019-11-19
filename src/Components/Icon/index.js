import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classList } from '../../utils';
import './style.scss';

 /**
  * The Base `Icon` that all other `Icon`s derive from.
  */
export default class IconBase extends Component {
  static propTypes = {
    /** Name of the `Icon` */
    name: PropTypes.string.isRequired,
    /** Reference source of the `Icon`. */
    source: PropTypes.string.isRequired,

  };

  static defaultProps = {
  };

  render() {
    const { children, name, source } = this.props;
    const classes = classList(
      'story-icon',
      `story-icon-${source}`
    );

    return (
      <div className={classes} title={name}>
        {children}
      </div>
    )
  }
}
