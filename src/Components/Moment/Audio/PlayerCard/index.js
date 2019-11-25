import React from 'react';
import { CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import AudioPlayer from 'material-ui-audio-player';
import PropTypes from 'prop-types';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';

import { muiTheme, useStyles } from './constants';
import './style.scss';

/**
 * `Card` for displaying an Audio file, information, and playback controls
 */
function AudioPlayerCard(props) {
  const { description, image, style, src, title } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="story-audio-player-card" style={style}>
      <CardBase style={{ display: 'flex', minHeight: '60vh'}}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <CardHeader text={title} />
            <Divider />
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <ThemeProvider theme={muiTheme}>
              <AudioPlayer src={src} />
            </ThemeProvider>
          </div>
        </div>
        {
          image && (
            <CardMedia className={classes.cover} image={image} title={title} />
          )
        }
      </CardBase>
    </div>
  );
}

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
  style: PropTypes.object,
};


AudioPlayerCard.defaultProps = {
  style: {
    padding: 50
  }
}

export default AudioPlayerCard;
