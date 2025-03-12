import type { SxProps, Theme } from '@mui/material';

import type CollectionStore from '../../state/collectionStore';

export type CollectionSectionProps = {
  readonly collection: CollectionStore;
  readonly collectionPathFormatter?: string;
  readonly enabled?: boolean;
  readonly sx?: SxProps<Theme>;
};
