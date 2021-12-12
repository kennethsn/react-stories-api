import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { StoriesAPIDate } from '../../../../types';
import { chunk } from '../../../../utils';
import CardHeader from '../../../Card/Header';
import LibraryBook from '../Book';
import responsive from './responsive';
import './style.scss';

export interface LibraryBookItem {
  color?: {
    accent: string;
    cover: string;
    text: string;
  }
  contribution: string;
  date?: StoriesAPIDate;
  description: string;
  image?: string;
  instance: string;
  label: string;
  manifest_url?: string;
  provider?: string;
  url?: string;
}

export interface LibraryShelfProps {
  graphic?: { url: string };
  items: LibraryBookItem[];
  onSelect?: (book: LibraryBookItem) => void;
  style?: object;
  title: string;
}

/**
* Container Component to view `LibraryBook`s.
*/
const LibraryShelf = ({
  graphic,
  items,
  onSelect,
  style,
  title,
}: LibraryShelfProps) => {
  const key = (label: string, index: number) => `lbi-${label}-${index}`;
  const handleClickBook = (book: LibraryBookItem) => (onSelect ? () => onSelect(book) : undefined);
  const renderBooks = (books: LibraryBookItem[]) => books.map((book, index) => {
    const {
      color = { accent: undefined, cover: undefined, text: undefined },
      contribution,
      instance,
      label,
    } = book;
    const { accent, cover, text } = color;
    return (
      <LibraryBook
        key={key(label, index)}
        onClick={handleClickBook(book)}
        title={label}
        subtitle={instance}
        detail={`Contribution: ${contribution}`}
        accentColor={accent}
        coverColor={cover}
        textColor={text}
      />
    );
  });
  const carousels: ReactNode[] = [];
  chunk(items as never, 10, (itemChunk) => {
    const isSmallCarousel = itemChunk.length < responsive.tablet.items;
    carousels.push((
      <Carousel
        arrows={!isSmallCarousel}
        autoPlay={!isSmallCarousel}
        autoPlaySpeed={9000 + Math.floor(Math.random() * 2000)}
        containerClass="story-library-shelf__carousel"
        draggable={!isSmallCarousel}
        infinite={!isSmallCarousel}
        key={`carousel-${title}-${Math.random()}`}
        keyBoardControl
        responsive={responsive}
        ssr
        swipeable={!isSmallCarousel}
      >
        {renderBooks(itemChunk)}
      </Carousel>
    ));
    if (graphic) {
      carousels.push((
        <div
          className="story-library-shelf__graphic"
          key={`carousel-${title}-graphic-${Math.random()}`}
        >
          <img
            alt="Library Shelf"
            src={graphic.url}
          />
        </div>
      ));
    }
  });
  return (
    <div
      className="story-library-shelf"
      style={style}
    >
      <CardHeader text={title} />
      {carousels}
    </div>
  );
};

LibraryShelf.propTypes = {
  /** Determines what media asset to render under the `Carousel` */
  graphic: PropTypes.shape({ url: PropTypes.string.isRequired }),
  /** Data to render `LibraryBook` props */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Click handler callback used by the `LibraryShelf` */
  onSelect: PropTypes.func,
  /** Styling object of the `Shelf` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** Header text to place above the `Shelf` */
  title: PropTypes.string,
};

LibraryShelf.defaultProps = {
  graphic: undefined,
  onSelect: () => {},
  style: {},
  title: '',
};

export default LibraryShelf;
