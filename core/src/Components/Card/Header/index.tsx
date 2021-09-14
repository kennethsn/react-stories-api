import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';

import './style.scss';

export interface CardHeaderProps {
  text: string | ReactElement;
}

/**
* Header for a Card Component.
*/
const CardHeader = ({ text }: CardHeaderProps) => (
  <div className="story-card__header">
    {text}
  </div>
);

CardHeader.propTypes = {
  /** Text to fill the `CardHeader` */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default CardHeader;
