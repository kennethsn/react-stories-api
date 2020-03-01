import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { classList } from '../../../utils';
import CardDetail from '../../Card/Detail';
import CardImage from '../../Card/Image';
import MomentBase from '../Base';

import './style.scss';

const useStyles = makeStyles(theme => ({
  momentBody: {
    background: theme.palette.background.default,
  },
  simple: {
    maxWidth: "100%",
    objectFit: "cover",
    width: "100%",
    maxHeight: "70vh",
    boxShadow: theme.shadows[8]
  },
  simpleGrid: {
    padding: theme.spacing(8),
  },
  simpleGridContainer: {
    overflowY: "scroll",
    maxHeight: "100vh",
    paddingBottom: "30vh",
  },
}));


/**
 * General Image layout Moment.
 */
function ImageMoment(props){
  const { caption, direction, label, url } = props;
  const classes = useStyles();

  const layout = "image";
  const containerClasses = classList(
    "moment-image-container",
    `moment-image-container-${direction}`
  );

  return (
    <MomentBase bodyClassName={classes.momentBody} {...props} layout={layout}>
      {!caption ? (
        <Grid
          container
          justify="center"
          className={classes.simpleGridContainer}
        >
          <Grid item xs={10} md={8} className={classes.simpleGrid}>
            <img className={classes.simple} src={url} alt={label}/>
          </Grid>
        </Grid>
      ) : (
        <div className={containerClasses}>
          <div className="moment-image-container__image">
            <CardImage src={url} />
          </div>
          <div className="moment-image-container__caption">
            <CardDetail>{caption}</CardDetail>
          </div>
        </div>
      )}
    </MomentBase>
  )
};

ImageMoment.propTypes = {
  /** Information to accompany the `Image`. */
  caption: PropTypes.any,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  direction: PropTypes.oneOf(['row', 'column']),
  /** Determines the `SideBarSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
  /** The source of the Image to render in the `Moment`'s body. */
  url: PropTypes.string.isRequired,
}

ImageMoment.defaultProps = {
  direction: "row",
  type: "image",
}

export default ImageMoment;
