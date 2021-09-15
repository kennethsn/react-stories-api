import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { StoriesAPIStory as APIStory } from '../../../types';
import Story from '../../Story';
import StoriesAPIClient from '../client';
import useStyles from './useStyles';
import { MomentUtils } from './utils';

export interface StoriesAPIStoryProps {
  apiKey?: string;
  collection?: number;
  data?: APIStory;
  endpoint?: string;
  errorComponent?: ReactNode;
  id?: number | string;
  options?: object;
  onLoad?: (story: APIStory) => void;
}

/**
* Story generated by the Stories-API endpoint.
*/
const StoriesAPIStory = ({
  apiKey,
  collection,
  data,
  endpoint,
  errorComponent,
  id,
  onLoad,
  options,
}: StoriesAPIStoryProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState(data as APIStory);
  const [error, setError] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (data || story || loading) return; // Override API with passed in data
    setLoading(true);
    const client = new StoriesAPIClient(endpoint!, apiKey!);
    client.story(`${id!}`, collection, undefined, undefined, (storyData: APIStory) => {
      setStory(storyData);
      if (onLoad) onLoad(storyData);
      setLoading(false);
    }, () => setError(true)).then();
  });
  const renderMoments = () => {
    const storyMoments = [] as ReactElement[];
    story?.moments.forEach((moment) => {
      if (MomentUtils.isPublicMoment(moment)) {
        const index = storyMoments.length;
        const element = MomentUtils.buildMoment(story, moment, index);
        if (element) storyMoments.push(element);
      }
    });
    return storyMoments;
  };
  const box = (body: ReactNode) => (
    <Grid
      alignItems="center"
      container
      className={classes.box}
    >
      <Grid
        item
        xs={12}
      >
        { body }
      </Grid>
    </Grid>
  );
  const loader = (loading || !story) && box((
    <>
      <Typography
        color="primary"
        variant="h5"
      >
        Building Your Story ...
      </Typography>
      <LinearProgress color="secondary" />
    </>
  ));

  const renderError = () => errorComponent || box((
    <Typography>
      Something went wrong while loading this collection...
      <br />
      Try Refreshing or Check Back Soon
    </Typography>
  ));
  /* eslint-disable react/jsx-props-no-spreading */
  return (error ? renderError() : (loader || (
    <Story
      {...story!}
      {...options}
    >
      {renderMoments()}
    </Story>
  ))) as JSX.Element;
};

StoriesAPIStory.propTypes = {
  /** API Key to interact with the StoriesAPI */
  apiKey: PropTypes.string,
  /** StoriesAPI collection id */
  collection: PropTypes.number,
  /** Override `StoriesAPI` data fetching to use custom data */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  /** `StoriesAPI` endpoint URL */
  endpoint: PropTypes.string,
  /** Identifier of the `Story` */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /** Props to pass to the `Story` component */
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
};

StoriesAPIStory.defaultProps = {
  apiKey: undefined,
  collection: undefined,
  data: undefined,
  endpoint: undefined,
  options: {},
};

export default StoriesAPIStory;
