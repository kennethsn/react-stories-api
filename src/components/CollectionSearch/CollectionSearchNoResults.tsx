import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Animation from '../UI/Animation/Animation';
import styles from './CollectionSearch.styles';

export default function CollectionSearchNoResults() {
  return (
    <Animation
      animation="fade"
      persist
    >
      <Card sx={styles.noResults}>
        <CardContent>
          <TravelExploreIcon />

          <Typography color="textSecondary">
            No results found. Try a new search.
          </Typography>

        </CardContent>
      </Card>
    </Animation>

  );
}
