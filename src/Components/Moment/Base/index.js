import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'

import { classList } from '../../../utils';


const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    height: "100%",
    width: "100%",
    backfaceVisibility: "hidden",
    backgroundSize: "auto 80%",
    backgroundPosition: "50% 0%",
  },
  header: {
    padding: theme.spacing(4),
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  body: {
    overflowY: "scroll",
    height: "100%",
    maxHeight: "100vh"
  }
}));

/**
 * The Base `Moment` that all other `Moment`s derive from.
 */
function MomentBase(props) {
  const {
    bodyClassName, children, color, index, layout, subtitle, title, type
  } = props;
  const classes = useStyles();
  const containerClasses = classList(
    classes.container,
    'story-moment',
    `story-moment-layout-${layout}`,
    `story-moment-${type}`
  );
  const bodyClasses = classList(
    classes.body,
    "story-moment__content__body ",
    bodyClassName
  );

  return (
    <Grid
      container
      justify="center"
      className={containerClasses}
      id="story-moment{index}"
    >
      <Grid
        item
        xs={12}
        className={classes.header}
        style={{background: color.background, color:color.text}}
      >
        <Grid container spacing={2} justify="center">
          <Grid item xs={10}>
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5">
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={bodyClasses}>
        {children}
      </Grid>
    </Grid>
  )
}

MomentBase.propTypes = {
  /** Determines the body className. */
  bodyClassName: PropTypes.string,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Determines the `SideBarSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Determines the structural styling of the `Moment`. */
  layout: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

MomentBase.defaultProps = {
  bodyClassName: "",
  color: {
    background: "gray",
    text: "white"
  },
  layout: "base",
  type: "base",
};

export default MomentBase;
