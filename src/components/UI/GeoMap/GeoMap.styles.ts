import type { Theme } from '@mui/material/styles';

import type GeoMapStore from '../../../state/geoMapStore';

const styles = {
  canvasRoot: {
    bgcolor: '#d4dadc', // color-match the default map background
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  infoPanelItemContentBlockMap: {
    IMAGE: {
      borderRadius: 2,
      maxHeight: '60vh',
      maxWidth: '80%',
    },
  },
  infoPanelItem: (isSelected: boolean, anotherItemIsSelected: boolean) => ({ palette }: Theme) => ({
    backgroundColor: isSelected ? palette.background.lightGrey : null,
    borderBottom: `1px solid ${palette.divider}`,
    boxShadow: isSelected ? 3 : undefined,
    opacity: anotherItemIsSelected && !isSelected ? 0.6 : 1,
    p: 2,
    transition: 'opacity 0.3s linear, background-color 0.3s linear, box-shadow 0.3s linear',
  }),
  infoPanelItemLabel: (isSelected: boolean) => ({ palette }: Theme) => ({
    cursor: 'pointer',
    color: isSelected ? palette.primary.main : palette.text.primary,
    lineHeight: 1.2,
    transition: 'color 0.3s linear',

    ':hover': { color: palette.primary.main },
  }),
  infoPanelItemDescription: {
    color: 'text.secondary',
    lineHeight: 1.3,
  },
  infoPanelRoot: ({ palette }: Theme) => ({
    backgroundColor: palette.background.paper,
    height: '100%',
    p: 2,
    overflowY: 'auto',
    width: '100%',
  }),
  root: {
    height: '100%',
    width: '100%',
  },
  tooltipContent: {
    bgcolor: 'background.lightGrey',
    boxShadow: 2,
    borderRadius: 1,
    color: 'text.primary',
    m: 0,
    maxWidth: 200,
    opacity: 0.85,
    pointerEvents: 'auto',
    px: 1,
    py: 0.5,
  },
  tooltipRoot: (geoMap: GeoMapStore) => ({
    left: geoMap.tooltipLeft!,
    opacity: geoMap.shouldShowTooltip ? 1 : 0,
    // Buffer space around the tooltip box to help with positioning and avoid flickering
    p: 1,
    pointerEvents: 'none',
    position: 'absolute',
    top: geoMap.tooltipTop!,
    transition: 'opacity 0.6s',
    zIndex: 1000,
  }),
};

export default styles;
