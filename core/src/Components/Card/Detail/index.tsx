import PropTypes from 'prop-types';
import React, { CSSProperties, ReactNode } from 'react';

import './style.scss';

export interface CardDetailProps {
  children: ReactNode;
  style?: CSSProperties;
}

/**
* Detail for a Card Component.
*/
const CardDetail = ({ children, style }: CardDetailProps) => (
  <div
    className="story-card__detail"
    style={style}
  >
    {children}
  </div>
);

CardDetail.prototypes = {
  /** Styling object of the `Card` */
  style: PropTypes.object,
};

CardDetail.defaultProps = {
  style: {},
};

export default CardDetail;
