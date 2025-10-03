import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Animation from '../Animation/Animation';
import styles from './CardsBrowser.styles';

export default function CardsBrowserNoResultsCard() {
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
