import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';
import { GenIcon, IconTree } from 'react-icons';

import IconBase from '..';

export interface ReactIconProps {
  name: string;
  data: IconTree;
  style?: CSSProperties;
}

/**
 * Wrapper of _react-icons_ GenIcon integration with the Stories-API styling
 */
const ReactIcon = ({ name, data, style }: ReactIconProps) => {
  const Icon = GenIcon(data);
  return (
    <IconBase
      name={name}
      source="react"
      style={style}
    >
      <Icon />
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
