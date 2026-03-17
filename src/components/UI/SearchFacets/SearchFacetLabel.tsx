import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Tooltip from '../Tooltip/Tooltip';
import styles from './SearchFacets.styles';
import type { SearchFacetLabelProps } from './SearchFacets.types';

function SearchFacetLabel({
  description,
  hasValue,
  label,
  onClear,
}: SearchFacetLabelProps) {
  const labelText = (
    <Typography
      component="span"
      sx={styles.facetLabel(hasValue)}
      variant="subtitle1"
    >
      {label}
    </Typography>
  );

  const labelContent = (
    <Box sx={styles.facetLabelContainer}>
      {description ? (
        <Tooltip title={description}>
          {labelText}
        </Tooltip>
      ) : labelText}

      {!!hasValue && !!onClear && (
        <Tooltip title={`Remove ${label} Selections`}>
          <IconButton
            aria-label={`Remove ${label} Selections`}
            onClick={onClear}
            size="small"
            sx={styles.facetLabelClearButton}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  return labelContent;
}

export default SearchFacetLabel;
