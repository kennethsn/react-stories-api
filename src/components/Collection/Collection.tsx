import CollectionLayout from '../CollectionLayout/CollectionLayout';
import CollectionStoriesList from '../CollectionStoriesList/CollectionStoriesList';
import type { CollectionProps } from './Collection.types';
import CollectionWrapper from './CollectionWrapper';

export default function Collection({ collection }: CollectionProps) {
  return (
    <CollectionWrapper collection={collection}>
      <CollectionLayout>
        <CollectionStoriesList />
      </CollectionLayout>
    </CollectionWrapper>
  );
}
