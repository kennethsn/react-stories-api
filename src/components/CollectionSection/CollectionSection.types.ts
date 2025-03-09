import type { SxProps, Theme } from '@mui/material';

import type { CollectionStore } from '../../state';

export type CollectionSectionProps = {
  readonly collection: CollectionStore;
  readonly enabled?: boolean;
  readonly sx?: SxProps<Theme>;
};
