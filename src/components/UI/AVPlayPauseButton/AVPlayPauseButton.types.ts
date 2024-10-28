import type { SxProps } from '@mui/material/styles';

export type AVPlayPauseButtonProps = {
  readonly isPlaying: boolean;
  readonly onClick: (isPlaying: boolean) => void;
  readonly sx?: SxProps
};
