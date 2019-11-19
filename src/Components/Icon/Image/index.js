import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IconBase from '../';
import './style.scss';


/**
 * General `Icon` used for Image rendering.
 */
export default class ImageIcon extends Component {
  static propTypes = {
    /** Name of the `Icon` */
    name: PropTypes.string,
    /** Reference source of the image file. */
    url: PropTypes.string.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { name, url } = this.props;
    return (
      <IconBase source="img" name={name}>
        <img src={url} alt={name} />
      </IconBase>
    )
  }
}
