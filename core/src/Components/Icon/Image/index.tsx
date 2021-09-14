import PropTypes from 'prop-types';
import React from 'react';

import IconBase from '..';
import './style.scss';

export interface ImageIconProps {
  name: string;
  url: string;
}

/**
 * General `Icon` used for Image rendering.
 */
const ImageIcon = ({ name, url }: ImageIconProps) => (
  <IconBase
    name={name}
    source="img"
  >
    <img
      src={url}
      alt={name}
    />
  </IconBase>
);

ImageIcon.propTypes = {
  /** Name of the `Icon` */
  name: PropTypes.string,
  /** Reference source of the image file. */
  url: PropTypes.string.isRequired,
};

ImageIcon.defaultProps = { name: 'image icon' };

export default ImageIcon;
