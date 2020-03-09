import React from 'react';
import { AppBar, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'

import { classList } from '../../../utils';


const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    textAlign: "center",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    backfaceVisibility: "hidden",
    backgroundSize: "auto 80%",
    backgroundPosition: "50% 0%",
    transform: "translate3d(0, 0, 0)"
  },
  appBar: props => ({
    background: props.color.background,
    color: props.color.text,
    zIndex: 3000 // Watch out for Map Moment's SideBar
    // position: "absolute",
  }),
  body: {
    padding: 0,
    overflowY: "scroll",
    height: "100%",
    maxWidth: "100%",
  },
  gutter: props => ({
    padding: theme.spacing(4),
  }),
  headerText: {
    width: "100%",
  },
}));

/**
 * The Base `Moment` that all other `Moment`s derive from.
 */
function MomentBase(props) {
  const {
    bodyClassName, children, color, index, layout, subtitle, title, type
  } = props;
  const classes = useStyles(props);
  const containerClasses = classList(
    classes.container,
    'story-moment',
    `story-moment-layout-${layout}`,
    `story-moment-${type}`
  );
  const bodyClasses = classList(
    bodyClassName,
    "story-moment__content__body ",

  );
  // NOTE: The second toolbar is to prepend enough gutter space
  const toolBar = (
    <Toolbar className={classes.gutter}>
      <Typography variant="h4" className={classes.headerText}>
        {title}
      </Typography>
      <Typography variant="subtitle1" className={classes.headerText}>
        {subtitle}
      </Typography>
    </Toolbar>
  );

  return (
    <Container
      justify="center"
      className={containerClasses}
      id="story-moment{index}"
    >
      <AppBar className={classes.appBar}>
        {toolBar}
      </AppBar>
      <Container className={classes.body}>
        <span style={{opacity: 0}}>{toolBar}</span>
        <div className={bodyClasses}>
          {children}
        </div>
      </Container>
    </Container>
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
