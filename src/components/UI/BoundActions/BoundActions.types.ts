import type { BoxProps } from '@mui/material/Box';

export type BoundActionsProps = {
  readonly append?: React.ReactNode;
  readonly className?: string;
  readonly prepend?: React.ReactNode;
  readonly store: {
    readonly download: () => void;
    readonly isDownloadable: boolean;
    readonly isEditable: boolean;
    readonly isFailed: boolean;
    readonly isLocalizable?: boolean;
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
