import type { SxProps, Theme } from '@mui/material';

import type { CollectionStore } from '../../state';

export type CollectionsProps = {
  readonly collections: CollectionStore[];
  readonly enableAllCollections?: boolean;
  readonly layout?: 'list' | 'sections';
  readonly sx?: SxProps<Theme>;
};
