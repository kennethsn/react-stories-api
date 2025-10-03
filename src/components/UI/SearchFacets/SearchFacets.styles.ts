import type { Theme } from '@mui/material/styles';

const styles = {
  facetLabel: (selected: boolean) => ({
    color: selected ? 'primary.main' : 'text.secondary',
    fontWeight: selected ? 'bold' : 'normal',
  }),
  facetSelectorAutocomplete: ({ typography }: Theme) => ({

    '& .MuiInputBase-root': {
      ...typography.caption,
      bgcolor: 'background.paper',
      borderRadius: 2,
    },
  }),
  facetSelectorControls: {
    alignItems: 'center',
    display: 'flex',
  },
  facetSelectorControlIcon: {
    fontSize: 16,
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
  facetSelectorValueCount: {
    color: 'text.secondary',
    ml: 0.5,
  },
  facetSelectorValueLabel: (isSelected: boolean) => ({ typography }: Theme) => ({
    ...typography.caption,
    color: isSelected ? 'primary.main' : 'text.primary',
  }),
  facetSelectorValue: (isSelected: boolean) => ({
    opacity: isSelected ? 1 : 0.5,
  }),
  root: {
    width: '100%',
  },
};

export default styles;
