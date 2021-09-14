import PropTypes from 'prop-types';
import React, { CSSProperties, ReactNode } from 'react';

import { classList } from '../../utils';
import './style.scss';

export interface CardBaseProps {
  children: ReactNode;
  style?: CSSProperties;
  type: string;
}

/**
* General Card Component.
*/
const CardBase = ({ children, style, type }: CardBaseProps) => {
  const classes = classList('story-card', `story-card-${type}`);
  return (
    <div
      className={classes}
      style={style}
    >
      {children}
    </div>
  );
};

CardBase.propTypes = {
  /** Styling object of the `Card` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** The type of `Card` */
  type: PropTypes.string,
};

CardBase.defaultProps = {
  style: undefined,
  type: 'base',
};

export default CardBase;
