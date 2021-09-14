import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

interface Props {
  accentColor?: string;
  coverColor?: string;
  detail?: string;
  onClick?: () => void;
  style?: object;
  subtitle?: string;
  textColor?: string;
  title: string;
}

/**
* Book for a `LibraryShelf` Component.
*/
const LibraryBook = ({
  accentColor,
  coverColor,
  detail,
  onClick,
  style,
  subtitle,
  textColor,
  title,
}: Props) => (
  <div
    className="story-library-book"
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    style={style}
    tabIndex={0}
  >
    <div className="story-library-book__cover">
      <div
        className="story-library-book__cover__container"
        style={{ background: accentColor }}
      >
        <div
          className="story-library-book__cover__content"
          style={{ background: coverColor, color: textColor }}
        >
          <div className="story-library-book__cover__title">
            {title}
          </div>
          <div className="story-library-book__cover__subtitle">
            {subtitle}
          </div>
          <div className="story-library-book__cover__detail">
            {detail}
          </div>
        </div>
      </div>
    </div>
  </div>
);

LibraryBook.propTypes = {
  /** Color to style the cover's borders */
  accentColor: PropTypes.string,
  /** Color to style the cover's background */
  coverColor: PropTypes.string,
  /** Smallest text at the bottom of the `Book` */
  detail: PropTypes.string,
  /** Click handler callback used by the `LibraryShelf` */
  onClick: PropTypes.func,
  /** Styling object of the `Book` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** Text underneath the title of the `Book` */
  subtitle: PropTypes.string,
  /** Color to style the cover's text */
  textColor: PropTypes.string,
  /** Largest text at the top of the `Book` */
  title: PropTypes.string.isRequired,
};

LibraryBook.defaultProps = {
  onClick: () => {},
  accentColor: 'brown',
  coverColor: '#fefdf9',
  detail: '',
  style: {},
  subtitle: '',
  textColor: 'black',
};

export default LibraryBook;
