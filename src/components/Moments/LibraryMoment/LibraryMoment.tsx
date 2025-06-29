import { observer } from 'mobx-react-lite';

import Bookshelf from '../../UI/Bookshelf/Bookshelf';
import type { BookItem } from '../../UI/Bookshelf/Bookshelf.types';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { LibraryMomentProps } from './LibraryMoment.types';

const LibraryMoment = observer(({ moment }: LibraryMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    {Object.entries(moment.shelves).map(([key, shelf]) => {
      const items: BookItem[] = shelf.items.map((item) => ({
        author: item.author,
        color: {
          accent: item.color?.accent ?? '#fff',
          cover: item.color?.cover ?? '#fff',
          text: item.color?.text ?? '#000',
        },
        description: item.description,
        image: item.image,
        instance: item.subtitle,
        label: item.title,
        url: item.url,
      }));
      return (
        <Bookshelf
          key={`shelf-${key}`}
          graphic={shelf.graphic}
          items={items}
          moment={moment}
          title={shelf.title ?? ''}
        />
      );
    })}
  </BaseMoment>
));

export default LibraryMoment;
