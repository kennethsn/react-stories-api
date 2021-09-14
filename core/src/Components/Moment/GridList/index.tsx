import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';

export interface GridListMomentProps extends MomentProps {
  containerProps: object;
}

/**
* General Moment for integrating a `Grid` component with a Moment.
*/
const GridListMoment = (props: GridListMomentProps) => {
  const { children, containerProps = {} } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase {...props}>
      <Grid container {...containerProps}>
        {children}
      </Grid>
    </MomentBase>
  );
};

GridListMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
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
  ...MOMENT_BASE_DEFAULT_PROPS,
  containerProps: {},
  layout: MomentLayout.GridList,
  type: MomentType.GridList,
};

export default GridListMoment;
