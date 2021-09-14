import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MerryGoRoundMoment from '../MerryGoRound';
import AwardCertificate, { AwardCertificateProps } from './Certificate';
import AWARD_MOMENT_DEFAULT_BACKGROUND_IMAGE from './constants';
import useStyles from './useStyles';

interface Award extends AwardCertificateProps {
  image?: string;
  website?: string;
}

export interface AwardMomentProps extends MomentProps {
  backgroundImage?: string;
  data: Award[];
  name: string;
}

/**
 * Moment to display achievements.
 */
const AwardMoment = (props: AwardMomentProps) => {
  const {
    backgroundImage,
    data,
    name,
    story,
  } = props;
  const classes = useStyles();
  const key = ({ label }: Award, index: number) => `${label}-${index}`;
  const renderCertificates = () => data.map((award, index) => (
    <AwardCertificate
      color={award.color}
      conferred_by={award.conferred_by}
      description={award.description}
      icon={award.icon}
      key={key(award, index)}
      label={award.label}
      name={award.name || name || story.label}
      style={award.style}
      subtitle={award.subtitle}
      year={award.year}
    />
  ));

  const renderSideBarContent = (award: ReactElement<Award>) => {
    if (!award) return undefined;
    const {
      color,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      conferred_by,
      image,
      label,
      website,
    } = award.props;
    return (
      <Grid
        container
        justifyContent="center"
        spacing={5}
      >
        <Grid
          className={classes.sideBarBody}
          item
          xs={12}
        >
          <Grid
            container
            justifyContent="center"
            spacing={5}
          >
            <Grid
              item
              xs={12}
            >
              <Typography
                className={classes.sideBarHeader}
                variant="h4"
              >
                {label}
              </Typography>
              <Divider variant="middle" />
              <div className={classes.sideBarAward}>
                {award}
              </div>
              <Divider variant="middle" />
            </Grid>
            {image && (
              <Grid item xs={10}>
                <img
                  className={classes.sideBarImage}
                  src={image}
                  alt={label}
                />
              </Grid>
            )}
            {website && (
              <Grid
                item
                xs={10}
              >
                <Button
                  href={website}
                  style={{ background: color.light }}
                  target="_blank"
                  variant="contained"
                >
                  Learn More
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {conferred_by && (
          <Grid
            className={classes.sideBarFooter}
            item
          >
            <Typography variant="h6">
              This Award is Presented by
              {' '}
              {conferred_by.label}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="overline">
              {conferred_by.description}
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPositionY: '57%',
    backgroundSize: 'cover',
    minHeight: '80vh',
    width: '100%',
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MerryGoRoundMoment
      {...props}
      sideBarClassName={classes.sideBarRoot}
      sideBarContent={renderSideBarContent}
      style={style}
    >
      {renderCertificates()}
    </MerryGoRoundMoment>
  );
};

AwardMoment.propTypes = {
  backgroundImage: PropTypes.string,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Information to build the `AwardCertificate`s */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Determines the name written on the `AwardCertificate`s. */
  name: PropTypes.string,
  /** `Story` Data */
  // eslint-disable-next-line react/forbid-prop-types
  story: PropTypes.object,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

AwardMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  backgroundImage: AWARD_MOMENT_DEFAULT_BACKGROUND_IMAGE,
  type: MomentType.Award,
};

export default AwardMoment;
