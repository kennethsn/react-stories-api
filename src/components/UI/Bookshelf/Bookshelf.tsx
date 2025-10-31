import 'react-multi-carousel/lib/styles.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';
// TODO: switch this to swiper
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
    <Box sx={styles.root}>
      <When condition={!!title}>
        <Typography
          sx={styles.title}
          variant="h3"
        >
          {title}
        </Typography>
      </When>

      <Box sx={styles.carouselWrapper}>
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
              title={book.title || book.label}
            />
          ))}
        </Carousel>
      </Box>

      <When condition={!!graphic}>
        <Box sx={styles.graphic}>
          <img
            alt="Bookshelf Graphic"
            src={graphic?.url}
          />
        </Box>
      </When>

      {moment.modalIsOpen && moment.selectedBook ? (
        <BookModal
          moment={moment}
        />
      ) : null}
    </Box>
  );
});

export default Bookshelf;
