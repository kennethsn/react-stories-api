import ChecklistIcon from '@mui/icons-material/Checklist';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { When } from 'react-if';

import { formatNumberString } from '../../../utils';
import styles from './SearchFacets.styles';
import type { SearchFacetSelectorControlsProps } from './SearchFacets.types';

export default function SearchFacetSelectorControls({
  onDeselectAll,
  onSelectAll,
  selectedCount,
}: SearchFacetSelectorControlsProps) {
  const hasSelectedValues = selectedCount > 0;
  const selectedCountFormatted = formatNumberString(selectedCount);

  const handleSelectAll = () => onSelectAll();

  const handleDeselectAll = () => onDeselectAll();

  return (
    <Box sx={styles.facetSelectorControls}>
      <IconButton
        onClick={handleSelectAll}
        size="small"
        title="Select all"
      >
        <ChecklistIcon sx={styles.facetSelectorControlIcon} />
      </IconButton>

      <IconButton
        disabled={!selectedCount}
        onClick={handleDeselectAll}
        size="small"
        title="Deselect all"
      >
        <HighlightOffIcon sx={styles.facetSelectorControlIcon} />
      </IconButton>

      <When condition={hasSelectedValues}>
        <Typography
          sx={styles.facetSelectorSelectedCount}
          variant="finePrint"
        >
          {`(${selectedCountFormatted} options selected)`}
        </Typography>
      </When>
    </Box>
  );
}
