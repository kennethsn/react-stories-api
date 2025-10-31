import { observer } from 'mobx-react-lite';

import Bookshelf from '../../UI/Bookshelf/Bookshelf';
import BaseMoment from '../BaseMoment/BaseMoment';
import type { LibraryMomentProps } from './LibraryMoment.types';

const LibraryMoment = observer(({ moment }: LibraryMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
  >
    {moment.shelves.map((shelf) => (
      <Bookshelf
        key={`shelf-${shelf.id}`}
        graphic={shelf.graphic}
        // @ts-expect-error TS2345 - Need to fix type issue later.
        items={shelf.items}
        moment={moment}
        title={shelf.title ?? ''}
      />
    ))}
  </BaseMoment>
));

export default LibraryMoment;
