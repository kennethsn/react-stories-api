import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import Stat, { StatProps } from '../../Stat';
import GridListMoment from '../GridList';
import useStyles from './useStyles';

export interface StatMomentProps extends MomentProps {
  data: StatProps[];
}

/**
*  Moment for listing External Resources.
*/
const StatMoment = (props: StatMomentProps) => {
  const { data } = props;
  const classes = useStyles(props);
  const key = (label: string, index: number) => `${label}-${index}`;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <GridListMoment
      {...props}
      bodyClassName={classes.body}
      containerProps={{ spacing: 5 }}
    >
      {data.map(({
        color,
        description,
        icon,
        image,
        label,
        type,
        url,
        value,
      }, index) => (
        <Grid
          className={classes.item}
          item
          key={key(label, index)}
          lg={4}
          md={5}
        >
          <Stat
            color={color || props.color}
            description={description}
            icon={icon}
            image={image}
            label={label}
            type={type}
            url={url}
            value={value}
          />
        </Grid>
      ))}
    </GridListMoment>
  );
};

StatMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Stories-API data context. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
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

StatMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Stat,
  type: MomentType.Stat,
};

export default StatMoment;
