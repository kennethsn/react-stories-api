import PropTypes from 'prop-types';
import React, { CSSProperties, ReactNode } from 'react';

import { classList } from '../../utils';
import './style.scss';

export interface IconBaseProps {
  children: ReactNode;
  name: string;
  source: string;
  style?: CSSProperties;
}

/**
* The Base `Icon` that all other `Icon`s derive from.
*/
const IconBase = ({
  children,
  name,
  source,
  style,
}: IconBaseProps) => {
  const classes = classList('story-icon', `story-icon-${source}`);
  return (
    <div
      className={classes}
      title={name}
      style={style}
    >
      {children}
    </div>
  );
};

IconBase.propTypes = {
  /** Name of the `Icon` */
  name: PropTypes.string.isRequired,
  /** Reference source of the `Icon`. */
  source: PropTypes.string.isRequired,
  /** Styling object of the `IconBase` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

IconBase.defaultProps = { style: undefined };

export default IconBase;
