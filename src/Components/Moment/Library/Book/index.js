import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '../../../Icon/FontAwesome';

import './style.scss';


/**
* Book for a `LibraryShelf` Component.
*/
export default class LibraryBook extends Component {
  static propTypes = {
    /** Color to style the cover's borders */
    accentColor: PropTypes.string,
    /** Color to style the cover's background */
    coverColor: PropTypes.string,
    /** Smallest text at the bottom of the `Book` */
    detail: PropTypes.string,
    /** Click handler callback used by the `LibraryShelf` */
    onClick: PropTypes.func,
    /** Styling object of the `Book` */
    style: PropTypes.object,
    /** Text underneath the title of the `Book` */
    subtitle: PropTypes.string,
    /** Color to style the cover's text */
    textColor: PropTypes.string,
    /** Largest text at the top of the `Book` */
    title: PropTypes.string,
  };

  static defaultProps = {
    onClick: () => {},
    coverColor: "#fefdf9",
    accentColor: "brown",
    textColor: "black",
    style: {},
  };

  render() {
    const {
      accentColor, coverColor, detail, onClick, style, subtitle, textColor,
      title
    } = this.props;

    const containerStyle = {background: accentColor};
    const contentStyle = {background: coverColor, color: textColor};
    return (
      <div className="story-library-book" style={style} onClick={onClick}>
        <div className="story-library-book__cover">
          <div
            className="story-library-book__cover__container"
            style={containerStyle}
          >
            <div
              className="story-library-book__cover__content"
              style={contentStyle}
            >
              <div className="story-library-book__cover__title">{title}</div>
              <div className="story-library-book__cover__subtitle">
                {subtitle}
              </div>
              <div className="story-library-book__cover__detail">{detail}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
