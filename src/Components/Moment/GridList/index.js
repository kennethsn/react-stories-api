import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import MomentBase from '../Base';


/**
* General Moment for integrating a `Grid` component with a Moment.
*/
function GridListMoment(props) {
  const { children, containerProps = {} } = props;
  return (
    <MomentBase {...props}>
      <Grid container {...containerProps}>
        {children}
      </Grid>
    </MomentBase>
  )
};

GridListMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Determines the `GridListSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `GridListSection` text of the `Moment`. */
  label: PropTypes.string,
  /** The layout name of the `Moment` */
  layout: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

GridListMoment.defaultProps = {
  layout: "gridlist",
  type: "gridlist",
  containerProps: {},
};

export default GridListMoment;
