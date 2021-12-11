import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import { classList } from '../../../utils';
import useStyles from './useStyles';

export interface MomentBaseProps extends MomentProps {
}

/**
 * The Base `Moment` that all other `Moment`s derive from.
 */
const MomentBase = (props: MomentBaseProps) => {
  const {
    bodyClassName,
    children,
    index,
    layout,
    subtitle,
    title,
    type,
  } = props;
  const classes = useStyles(props);
  const containerClasses = classList(
    classes.container,
    'story-moment',
    `story-moment-layout-${layout}`,
    `story-moment-${type}`,
  );
  const bodyClasses = classList('story-moment__content__body ', classes.content);
  // NOTE: The second toolbar is to prepend enough gutter space
  const toolBar = (
    <Toolbar className={classes.gutter}>
      <Typography
        className={classes.headerText}
        variant="h4"
      >
        {title}
      </Typography>
      <Typography
        className={classes.headerText}
        variant="subtitle1"
      >
        {subtitle}
      </Typography>
    </Toolbar>
  );

  return (
    <Grid
      container
      className={containerClasses}
      id={`story-moment${index}`}
      justifyContent="center"
      key={`story-moment${index}`}
    >
      <AppBar className={classes.appBar}>
        {toolBar}
      </AppBar>
      <Grid
        className={classes.body}
        container
      >
        <span className={classes.bufferToolbar}>
          {toolBar}
        </span>
        <div className={bodyClasses}>
          <div className={`${bodyClassName} ${classes.bodyInner}`}>
            {children}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

MomentBase.propTypes = {
  /** Determines the body className. */
  bodyClassName: PropTypes.string,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
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
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Base,
  type: MomentType.Base,
};

export default MomentBase;
