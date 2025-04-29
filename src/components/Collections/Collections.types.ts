import type { SxProps, Theme } from '@mui/material';

import type CollectionStore from '../../state/collectionStore';

export type CollectionsProps = {
  readonly buttonLabel?: string;
  readonly collectionPathFormatter?: string;
  readonly collections: CollectionStore[];
  readonly enableAllCollections?: boolean;
  readonly layout?: 'list' | 'sections';
  readonly sx?: SxProps<Theme>;
};
