import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import { classList, isEven } from '../../../utils';
import CardHeader from '../../Card/Header';
import MomentBase from '../Base';
import EmployerBadge, { EmployerBadgeProps } from './Badge';
import './style.scss';

export interface EmployerMomentProps extends MomentProps {
  data: EmployerBadgeProps[];
}

/**
 * Employer Moment.
 */
const EmployerMoment = (props: EmployerMomentProps) => {
  const { color, data } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  const renderBadge = (badgeProps: EmployerBadgeProps) => (
    <Grid
      className="employer-badge-grid-item"
      item
    >
      <div style={{ width: 350 }}>
        <EmployerBadge {...badgeProps} />
      </div>
    </Grid>
  );

  const renderInfoBox = ({
    description,
    label,
    textColor,
    website,
  }: EmployerBadgeProps) => (
    <Grid
      className="employer-info-box"
      item
    >
      <CardHeader text={label} />
      <div>
        {description}
      </div>
      {website && (
        <Button
          className="employer-info-box__button"
          href={website}
          style={{ color: textColor }}
          target="_blank"
          variant="outlined"
        >
          Learn More
        </Button>
      )}
    </Grid>
  );
  const sections = data.map((employer, index) => {
    const left = !isEven(index);
    const { label } = employer;
    const key = `${label}-${index}`;
    const accentColor = left ? color.background : color.text;
    const textColor = left ? color.text : color.background;
    const angleDirection = left ? 'left' : 'right';
    const employerProps = { ...employer, accentColor, textColor };
    const angleClasses = classList('angle', `angle-${angleDirection}`);
    return (
      <div
        className="story-employer-section"
        key={key}
      >
        <div
          className={angleClasses}
          style={{ background: accentColor }}
        />
        <div
          className="angled-section__background"
          style={{ background: accentColor, color: textColor }}
        >
          <Grid
            alignItems="center"
            className="story-employer-section-grid"
            container
            direction="row"
            justifyContent="space-evenly"
            spacing={2}
          >
            {(left) ? (
              <>
                {renderInfoBox(employerProps)}
                {renderBadge(employerProps)}
              </>
            ) : (
              <>
                {renderBadge(employerProps)}
                {renderInfoBox(employerProps)}
              </>
            )}
          </Grid>
        </div>
      </div>
    );
  });
  return (
    <MomentBase {...props}>
      {sections}
    </MomentBase>
  );
};

EmployerMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Determines the information to put in the `Badge`s. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

EmployerMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Employer,
  type: MomentType.Employer,
};

export default EmployerMoment;
