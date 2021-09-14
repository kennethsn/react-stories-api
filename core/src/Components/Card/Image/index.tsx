import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

export interface CardImageProps {
  alt: string;
  draggable?: boolean;
  src: string;
}

/**
* Image for a Card Component.
*/
const CardImage = (props: CardImageProps) => {
  const { alt } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className="story-card__image">
      <img
        {...props}
        alt={alt}
      />
    </div>
  );
};

CardImage.propTypes = {
  /** Alt Text to describe the `CardImage` */
  alt: PropTypes.string.isRequired,
  /** Determines if the `CardImage` can be click+dragged */
  draggable: PropTypes.bool,
  /** Source to fill the `CardImage` */
  src: PropTypes.string.isRequired,
};

CardImage.defaultProps = {
  draggable: undefined,
};

export default CardImage;
