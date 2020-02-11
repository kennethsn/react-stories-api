import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  section: {
    borderBottom: "2px dotted #606060",
    padding: "15px 5px",
    display: "block",
    background: "#f5f5f5",
    textAlign: "center",
  }
}));


 /**
  * Section for a Card Component.
  */
function CardSection (props){
  const { children, style } = props;
  const classes = useStyles();

  return (
    <div className={classes.section + " story-card__section"} style={style}>
      <Typography variant="caption">
        {children}
      </Typography>
    </div>
  )
}

CardSection.propTypes = {
  /** Styling object of the `Card` */
  style: PropTypes.object
};

CardSection.defaultProps = {
};

export default CardSection;
