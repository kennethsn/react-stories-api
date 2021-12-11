import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';
import * as ReactIcons from 'react-icons/all';

import IconBase from '..';

export type ReactIconName = keyof typeof ReactIcons;

export interface FaProps {
  name: ReactIconName;
  style?: CSSProperties;
}

/**
 * Wrapper of _react-icons_ FontAwesome integration with the Stories-API styling and integration
 */
const ReactIcon = ({ name, style }: FaProps) => {
  const ReactIcon = ReactIcons[name]!;
  return (
    <IconBase
      name={name}
      source="react"
      style={style}
    >
      <ReactIcon />
    </IconBase>
  );
};

ReactIcon.propTypes = {
  /** Name of the `Icon` */
  name: PropTypes.string.isRequired,
  /** Styling object of the `Icon` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

ReactIcon.defaultProps = { style: undefined };

export default ReactIcon;
