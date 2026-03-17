import type { Theme } from '@mui/material/styles';

const styles = {
  facetDateInput: ({ typography }: Theme) => ({

    '& .MuiInputBase-root': {
      ...typography.caption,
      bgcolor: 'background.paper',
      borderRadius: 1,
    },
  }),
  facetDivider: {
    borderBottom: '1px solid',
    borderColor: 'divider',
    pb: 2,
  },
  facetLabel: (selected: boolean) => ({
    color: selected ? 'primary.main' : 'text.secondary',
    fontWeight: selected ? 'bold' : 'normal',
  }),
  facetLabelClearButton: {
    ml: 1,
  },
  facetLabelContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    mb: 0.25,
  },
  facetNumberInput: ({ typography }: Theme) => ({

    '& .MuiInputBase-root': {
      ...typography.caption,
      bgcolor: 'background.paper',
      borderRadius: 1,
    },
  }),
  facetSelectorAutocomplete: ({ typography }: Theme) => ({

    '& .MuiInputBase-root': {
      ...typography.caption,
      bgcolor: 'background.paper',
      borderRadius: 2,
    },
  }),
  facetSelectorControlIcon: {
    fontSize: 16,
  },
  facetSelectorControls: {
    alignItems: 'center',
    display: 'flex',
  },
  facetSelectorSeeMoreButton: ({ typography }: Theme) => ({
    color: 'text.secondary',
    display: 'block',
    fontSize: typography.caption.fontSize as number,
    fontWeight: typography.caption.fontWeight as number,
    p: 1,
    textAlign: 'left',
    textTransform: 'none',
    width: '100%',

    '&:hover': {
      backgroundColor: 'action.selected',
    },
  }),
  facetSelectorSelectedCount: {
    display: 'inline-block',
  },
  facetSelectorValue: (isSelected: boolean) => ({
    opacity: isSelected ? 1 : 0.5,
  }),
  facetSelectorValueCount: {
    color: 'text.secondary',
    ml: 0.5,
  },
  facetSelectorValueLabel: (isSelected: boolean) => ({ typography }: Theme) => ({
    ...typography.caption,
    color: isSelected ? 'primary.main' : 'text.primary',
  }),
  facetYearSlider: (hasSelection: boolean) => ({

    '& .MuiSlider-thumb': {
      color: hasSelection ? 'primary.main' : 'action.disabled',
    },
    '& .MuiSlider-track': {
      color: hasSelection ? 'primary.main' : 'action.disabled',
    },
    '& .MuiSlider-rail': {
      color: 'action.disabled',
    },
  }),
  facetYearSliderContainer: {
    px: 1,
  },
  facetYearSliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: -1,
  },
  root: {
    width: '100%',
  },
};

export default styles;
