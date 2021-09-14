import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { CSSProperties, ReactNode } from 'react';

import useStyles from './useStyles';

export interface CardSectionProps {
  children: ReactNode | string;
  style: CSSProperties;
}

/**
* Section for a Card Component.
*/
const CardSection = ({ children, style }: CardSectionProps) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.section} story-card__section`}
      style={style}
    >
      <Typography variant="caption">
        {children}
      </Typography>
    </div>
  );
};

CardSection.propTypes = {
  /** Styling object of the `Card` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

CardSection.defaultProps = {
  style: undefined,
};

export default CardSection;
