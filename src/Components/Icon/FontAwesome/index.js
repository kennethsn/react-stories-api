import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ReactIconsFA from 'react-icons/fa';

import IconBase from '../';
import './style.scss';


/**
 * Wrapper of _react-icons_ FontAwesome integration with the Stories-API styling and integration
 */
export default class FontAwesomeIcon extends Component {
  static propTypes = {
    /** Name of the `Icon` */
    name: PropTypes.string.isRequired,
    /** Styling object of the `Icon` */
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const { name, style } = this.props;
    const ReactIcon = ReactIconsFA[name];
    return (
      <IconBase source="fa" name={name} style={style} >
        <ReactIcon />
      </IconBase>
    )
  }
}
