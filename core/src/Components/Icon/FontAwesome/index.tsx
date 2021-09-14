import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';
import * as ReactIconsFA from 'react-icons/fa';

import IconBase from '..';
import './style.scss';

export type FAIconName = keyof typeof ReactIconsFA;

export interface FaProps {
  name: FAIconName;
  style?: CSSProperties;
}

/**
 * Wrapper of _react-icons_ FontAwesome integration with the Stories-API styling and integration
 */
const FontAwesomeIcon = ({ name, style }: FaProps) => {
  const ReactIcon = ReactIconsFA[name]!;
  return (
    <IconBase
      name={name}
      source="fa"
      style={style}
    >
      <ReactIcon />
    </IconBase>
  );
};

FontAwesomeIcon.propTypes = {
  /** Name of the `Icon` */
  name: PropTypes.string.isRequired,
  /** Styling object of the `Icon` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

FontAwesomeIcon.defaultProps = { style: undefined };

export default FontAwesomeIcon;
