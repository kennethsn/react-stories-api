import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from 'prop-types';

import { chunk } from '../../../../utils';
import CardHeader from '../../../Card/Header';
import FontAwesomeIcon from '../../../Icon/FontAwesome';
import LibraryBook from '../Book';

import { responsive } from './constants';
import './style.scss';


/**
* Container Component to view `LibraryBook`s.
*/
export default class LibraryShelf extends Component {
  static propTypes = {
    /** Data to render `LibraryBook` props */
    items: PropTypes.arrayOf(PropTypes.object),
    /** Click handler callback used by the `LibraryShelf` */
    onSelect: PropTypes.func,
    /** Styling object of the `Shelf` */
    style: PropTypes.object,
    /** Header text to place above the `Shelf` */
    title: PropTypes.string,
  };

  static defaultProps = {
    onSelect: () => {},
    style: {},
  };

  renderBooks(items) {
    const { onSelect } = this.props;
    return items.map(book => {
      const { color={}, contribution, description, instance, label, } = book;
      const { accent, cover, text } = color;

      return (
        <LibraryBook
          onClick={() => onSelect(book)}
          title={label}
          subtitle={instance}
          detail={`Contribution: ${contribution}`}
          accentColor={accent}
          coverColor={cover}
          textColor={text}
        />
      )
    })
  }

  renderCarousels() {
    const { graphic, items } = this.props;

    const carousels = [];
    chunk(items, 10, (itemChunk) => {
      const isSmallCarousel = itemChunk.length < responsive.tablet.items;
      carousels.push(
        <Carousel
          responsive={responsive}
          ssr={true}
          swipeable={!isSmallCarousel}
          draggabel={!isSmallCarousel}
          infinite={!isSmallCarousel}
          arrows={!isSmallCarousel}
          autoPlay={!isSmallCarousel}
          autoPlaySpeed={9000 + Math.floor(Math.random() * 2000)}
          keyBoardControl={true}
          containerClass="story-library-shelf__carousel"
          itemClass="carousel-item-padding-40-px"
        >
          {this.renderBooks(itemChunk)}
        </Carousel>
      )

      if (graphic) {
        carousels.push(
          <div className="story-library-shelf__graphic">
            <img src={graphic.url}/>
          </div>
        )
      }
    });

    return carousels;
  }

  render() {
    const { style, title } = this.props;

    return (
      <div className="story-library-shelf" style={style}>
        <CardHeader text={title} />
        {this.renderCarousels()}
      </div>
    )
  }
}
