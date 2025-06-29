import 'react-multi-carousel/lib/styles.css';

import { observer } from 'mobx-react-lite';
import Carousel from 'react-multi-carousel';

import Book from '../Book/Book';
import BookModal from '../BookModal/BookModal';
import styles from './Bookshelf.styles';
import { BookItem, BookshelfProps } from './Bookshelf.types';

const Bookshelf = observer(({
  graphic, items, moment, title,
}: BookshelfProps) => {
  const key = (label: string, index: number) => `book-${label}-${index}`;
  const handleClickBook = (book: BookItem) => () => {
    moment.openBookModal(book);
  };

  return (
    <styles.container>
      <styles.title>{title}</styles.title>

      <styles.carouselWrapper>
        <Carousel
          draggable
          infinite
          keyBoardControl
          responsive={{
            monitor: {
              breakpoint: { max: 3000, min: 1800 },
              items: 5,
              slidesToSlide: 3,
            },
            desktop: {
              breakpoint: { max: 1800, min: 1200 },
              items: 5,
              slidesToSlide: 3,
            },
            tablet: {
              breakpoint: { max: 1200, min: 60 },
              items: 3,
              slidesToSlide: 2,
            },
            mobile: {
              breakpoint: { max: 600, min: 500 },
              items: 2,
              slidesToSlide: 1,
            },
            tiny: {
              breakpoint: { max: 500, min: 0 },
              items: 1,
              slidesToSlide: 1,
            },
          }}
          ssr
          swipeable
        >
          {items.map((book, index) => (
            <Book
              key={key(book.label, index)}
              accentColor={book.color?.accent}
              author={book.author}
              coverColor={book.color?.cover}
              description={book.description}
              onClick={handleClickBook(book)}
              subtitle={book.instance}
              textColor={book.color?.text}
              title={book.label}
            />
          ))}
        </Carousel>
      </styles.carouselWrapper>

      {graphic?.url ? (
        <img
          alt="Bookshelf Graphic"
          src={graphic.url}
          style={{ objectFit: 'contain', width: '100%' }}
        />
      ) : null}

      {moment.isModalOpen && moment.selectedBook ? (
        <BookModal
          moment={moment}
        />
      ) : null}
    </styles.container>
  );
});

export default Bookshelf;
