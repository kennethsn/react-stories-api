import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import {
  Else,
  If,
  Then,
  When,
} from 'react-if';

import { STORIES_SERVICES_BASE_URL } from '../../constants';
import useMoments from '../../hooks/useMoments';
import useStory from '../../hooks/useStory';
import type MomentStore from '../../state/momentStore';
import type { MomentGroupWithMoments } from '../../types';
import { isMomentGroup } from '../../utils/momentUtils';
import MomentNavigatorGroup from '../MomentNavigatorGroup/MomentNavigatorGroup';
import MomentNavigatorHeader from '../MomentNavigatorHeader/MomentNavigatorHeader';
import MomentNavigatorListItem from '../MomentNavigatorListItem/MomentNavigatorListItem';
import ClickableImage from '../UI/ClickableImage/ClickableImage';
import styles from './MomentNavigator.styles';

// KSN TODO: colors
// KSN TODO: scroll to height on change
// KSN TODO: Grouping sidebar content should not spread to full height
const MomentNavigator = observer(() => {
  const story = useStory();
  const moments = useMoments();

  const handleImageClick = () => moments.goToBeginning();
  return (
    <Grid
      container
      spacing={2}
      sx={styles.root}
    >
      <When condition={story.hasBranding}>
        <Grid
          size={12}
          sx={styles.brandingContainer}
        >
          {story.branding}
        </Grid>
      </When>

      <MomentNavigatorHeader />

      <When condition={!!story.image}>
        <Grid
          size={12}
          sx={styles.imageContainer}
        >
          <ClickableImage
            alt={story.label}
            onClick={handleImageClick}
            src={story.image!}
          />
        </Grid>
      </When>

      <Grid size={12}>
        <List
          dense
          subheader={<li />}
          sx={styles.listContainer}
        >
          {moments.groupedMoments.map((momentOrGroup) => (
            <If
              key={momentOrGroup.id}
              condition={isMomentGroup(momentOrGroup)}
            >
              <Then>
                {() => (
                  <MomentNavigatorGroup
                    momentGroup={momentOrGroup as MomentGroupWithMoments<MomentStore>}
                  />
                )}
              </Then>

              <Else>
                {() => {
                  const moment = momentOrGroup as MomentStore;
                  return (
                    <MomentNavigatorListItem
                      key={`moment-${moment.index}`}
                      moment={moment}
                    />
                  );
                }}
              </Else>
            </If>

          ))}
        </List>
      </Grid>

      <Grid sx={styles.footerContainer}>
        <Typography
          sx={styles.storiesServicesLink}
          variant="caption"
        >
          <a
            href={STORIES_SERVICES_BASE_URL}
            rel="noreferrer"
            target="_blank"
          >
            Powered by Stories Services
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
});

export default MomentNavigator;
