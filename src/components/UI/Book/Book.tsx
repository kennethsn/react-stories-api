import { observer } from 'mobx-react-lite';

import styles from './Book.styles';
import { BookProps } from './Book.types';

const Book = observer(({
  accentColor,
  coverColor,
  author,
  onClick,
  style,
  subtitle,
  textColor,
  title,
}: BookProps) => (
  <styles.container
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    style={style}
    tabIndex={0}
  >
    <styles.cover className="BookCover" style={{ background: accentColor }}>
      <div className="CoverContent" style={{ background: coverColor, color: textColor }}>
        <div className="CoverTitle">{title}</div>

        {subtitle ? <div className="CoverSubtitle">{subtitle}</div> : null}

        {author ? <div className="CoverAuthor">{author}</div> : null}
      </div>
    </styles.cover>
  </styles.container>
));

export default Book;
