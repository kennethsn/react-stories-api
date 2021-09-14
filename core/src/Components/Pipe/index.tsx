import PropTypes from 'prop-types';
import React from 'react';

import { classList } from '../../utils';
import './style.scss';

export interface PipeProps {
  color?: string;
  type: 'normal' | 'thick' | 'thin';
}

/**
* Styled Pipe text separator.
*/
const Pipe = ({ color, type }: PipeProps) => {
  const classes = classList('story-pipe', `story-pipe-${type}`);
  const style = { color };
  return (
    <div
      className={classes}
      style={style}
    >
      |
    </div>
  );
};

Pipe.propTypes = {
  /** The color of the `Pipe` separator */
  color: PropTypes.string,
  /** Specify the thickness of the `Pipe` separator */
  type: PropTypes.oneOf(['normal', 'thin', 'thick']),
};

Pipe.defaultProps = {
  color: undefined,
  type: 'normal',
};

export default Pipe;
