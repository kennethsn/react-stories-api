import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AudioPlayer from 'material-ui-audio-player';
import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import './style.scss';
import useStyles from './useStyles';

export interface AudioPlayerCardProps {
  description?: string;
  image?: string;
  style?: CSSProperties;
  src: string;
  title: string;
}

/**
 * `Card` for displaying an Audio file, information, and playback controls
 */
const AudioPlayerCard = ({
  description,
  image,
  style,
  src,
  title,
}: AudioPlayerCardProps) => {
  const classes = useStyles();
  const muiTheme = createTheme({});
  return (
    <div
      className="story-audio-player-card"
      style={style}
    >
      <CardBase style={{ display: 'flex', minHeight: '60vh' }}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardHeader text={title} />
            <Divider />
            <Typography
              color="textSecondary"
              variant="subtitle1"
            >
              {description}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <MuiThemeProvider theme={muiTheme}>
              <AudioPlayer src={src} />
            </MuiThemeProvider>
          </div>
        </div>
        {
          image && (
            <CardMedia
              className={classes.cover}
              image={image}
              title={title}
            />
          )
        }
      </CardBase>
    </div>
  );
};

AudioPlayerCard.propTypes = {
  /** Additional information to place in the body of the `Card` */
  description: PropTypes.string,
  /** accompany the Audio with an Artwork/Thumbnail image */
  image: PropTypes.string,
  /** Source URL of the Audio file  */
  src: PropTypes.string.isRequired,
  /** Determines the `CardHeader` text. */
  title: PropTypes.string.isRequired,
  /** Styling object of the `Card` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

AudioPlayerCard.defaultProps = {
  description: '',
  image: undefined,
  style: {
    padding: 50,
  },
};

export default AudioPlayerCard;
