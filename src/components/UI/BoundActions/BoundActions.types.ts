import type { BoxProps } from '@mui/material/Box';
import type { PropsWithChildren } from 'react';

export type BoundActionsProps = PropsWithChildren & {
  readonly store: {
    readonly download: () => void;
    readonly isDownloadable: boolean;
    readonly isEditable: boolean;
    readonly isResettable: boolean;
    readonly isSavable: boolean;
    readonly isSaved: boolean;
    readonly isSaving: boolean;
    readonly reset: () => void;
    readonly save: () => void;
  };
  readonly sx?: BoxProps['sx'];
  readonly type: string;
};
