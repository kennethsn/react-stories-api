import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';

import './style.scss';

export interface CardPillProps {
  style: CSSProperties;
  text: string;
}

/**
* Pill for a Card Component.
*/
const CardPill = ({ style, text }: CardPillProps) => (
  <div
    className="story-card__pill"
    style={style}
  >
    {text}
  </div>
);

CardPill.propTypes = {
  /** Styling object of the `Card` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** Text to fill the `CardPill` */
  text: PropTypes.string.isRequired,
};

CardPill.defaultProps = {
  style: undefined,
};

export default CardPill;
