import React from 'react';
import {
  Button, Divider, Grid, makeStyles, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types'

import MerryGoRoundMoment from '../MerryGoRound';

import BackgroundImage from './background.jpg';
import AwardCertificate from './Certificate';


const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  sideBarRoot: {
    backgroundColor: theme.palette.grey[700],
    textAlign: "center",
    minWidth: "40%",
  },
  sideBarHeader: {
    fontWeight: 300,
    padding: theme.spacing(3),
  },
  sideBarBody: {
    background: theme.palette.background.paper,
  },
  sideBarAward: {
    padding: theme.spacing(8),
  },
  sideBarFooter: {
    padding: theme.spacing(4),
    color: theme.palette.background.paper,
  },
  divider: {
    background: theme.palette.common.white,
    opacity: .45,
  },
  sideBarImage: {
    maxHeight: "50vh",
    maxWidth: "100%"
  }
}));


/**
 * Moment to display achievements.
 */
function AwardMoment(props) {
  const { data, name } = props;
  const classes = useStyles();

  const renderCertificates = () => {
    return data.map(award => <AwardCertificate name={name} {...award} />);
  };

  const renderSideBarContent = (award) => {
    if (!award) return ;
    const { color, conferred_by, image, label, website } = award.props;

    return (
      <Grid container spacing={5} justify="center">
        <Grid item xs={12} className={classes.sideBarBody}>
          <Grid container justify="center" spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.sideBarHeader}>
                {label}
              </Typography>
              <Divider variant="middle" />
              <div className={classes.sideBarAward}>{award}</div>
              <Divider variant="middle" />
            </Grid>
            {image && (
              <Grid item xs={10}>
                <img
                  className={classes.sideBarImage}
                  src={image}
                  alt={`Image of ${label}`}
                />
              </Grid>
            )}
            {website && (
              <Grid item xs={10}>
                <Button
                  style={{background: color.light}}
                  target="_blank"
                  href={website}
                  variant="contained"
                >
                  Learn More
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {conferred_by && (
          <Grid item className={classes.sideBarFooter}>
            <Typography variant="h6" color="palette.common.white">
              This Award is Presented by {conferred_by.label}
            </Typography>
            <Divider className={classes.divider}/>
            <Typography variant="overline" color="palette.background.paper">
              {conferred_by.description}
            </Typography>
          </Grid>
        )}
      </Grid>
    )
  };

  const style = {
    minHeight: "80vh",
    backgroundSize: "cover",
    backgroundPositionY: "57%",
    width: "100%",
    backgroundImage: `url(${BackgroundImage})`
  };

  return (
    <MerryGoRoundMoment
      {...props}
      sideBarClassName={classes.sideBarRoot}
      sideBarContent={renderSideBarContent}
      style={style}
    >
      {renderCertificates()}
    </MerryGoRoundMoment>
  )
}

AwardMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Information to build the `AwardCertificate`s */
  data: PropTypes.array.isRequired,
  /** Determines the `SideBarSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Determines the name written on the `AwardCertificate`s. */
  name: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

AwardMoment.defaultProps = {
  type: "award",
};

export default AwardMoment;
