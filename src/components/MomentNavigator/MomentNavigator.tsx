import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import {
  Else,
  If,
  Then,
  When,
} from 'react-if';

import { STORIES_SERVICES_BASE_URL } from '../../constants';
import useMoments from '../../hooks/useMoments';
import useStory from '../../hooks/useStory';
import type { Moment, MomentGroupWithMoments } from '../../types';
import { isMomentGroup } from '../../utils/momentUtils';
import MomentNavigatorListItem from '../MomentNavigatorListItem/MomentNavigatorListItem';
import ClickableImage from '../UI/ClickableImage/ClickableImage';
import ExpandIcon from '../UI/ExpandIcon/ExpandIcon';
import styles from './MomentNavigator.styles';

// KSN TODO: colors
// KSN TODO: scroll to height on change
export default function MomentNavigator() {
  const { branding, story: { description, image, label } } = useStory();
  const {
    isGroupExpanded,
    groupedMoments,
    goToBeginning,
    toggleGroup,
  } = useMoments();

  const handleGroupButtonClick = (groupId: string) => () => {
    toggleGroup(groupId);
  };

  const handleImageClick = () => goToBeginning();
  const hasBranding = !!branding;
  return (
    <Grid
      container
      spacing={2}
      sx={styles.root}
    >
      <When condition={hasBranding}>
        <Grid
          size={12}
          sx={styles.brandingContainer}
        >
          {branding}
        </Grid>
      </When>

      <Grid
        size={12}
        sx={{
          ...styles.labelContainer,
          pt: hasBranding ? 0 : 2,
        }}
      >
        <Typography
          color="primary"
          variant="h6"
        >
          {label}
        </Typography>

        <When condition={!!description}>
          <Divider sx={styles.divider} />

          <Typography
            color="textSecondary"
            component="div"
            variant="caption"
          >
            {description}
          </Typography>
        </When>
      </Grid>

      <When condition={!!image}>
        <Grid
          size={12}
          sx={styles.imageContainer}
        >
          <ClickableImage
            alt={label}
            onClick={handleImageClick}
            src={image!}
          />
        </Grid>
      </When>

      <Grid size={12}>
        <List
          dense
          subheader={<li />}
          sx={styles.listContainer}
        >
          {groupedMoments.map((momentOrGroup) => (
            <If
              key={momentOrGroup.key}
              condition={isMomentGroup(momentOrGroup)}
            >
              <Then>
                {() => {
                  const group = momentOrGroup as MomentGroupWithMoments;
                  const groupId = group.id;
                  const groupIsExpanded = isGroupExpanded(groupId);
                  return (
                    <li key={`group-${groupId}`}>
                      <ul>
                        <ListSubheader
                          onClick={handleGroupButtonClick(groupId)}
                          sx={styles.subheader}
                        >
                          <ExpandIcon expanded={groupIsExpanded} />

                          <Typography
                            color="primary"
                            sx={styles.subheaderLabel}
                            variant="overline"
                          >
                            {group.label}
                          </Typography>

                        </ListSubheader>

                        <Collapse
                          in={groupIsExpanded}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            component="div"
                            dense
                            disablePadding
                            sx={styles.groupContainer}
                          >
                            {group.moments.map((moment) => (
                              <MomentNavigatorListItem
                                key={`moment-subgroup-${moment.index}`}
                                moment={moment}
                              />
                            ))}
                          </List>
                        </Collapse>
                      </ul>
                    </li>
                  );
                }}
              </Then>

              <Else>
                {() => {
                  const moment = momentOrGroup as Moment;
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
}
