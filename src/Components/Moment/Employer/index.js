import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { classList, isEven } from '../../../utils';
import CardHeader from '../../Card/Header';
import MomentBase from '../Base';

import EmployerBadge from './Badge';
import './style.scss';


/**
 * Employer Moment.
 */
export default class EmployerMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Determines the information to put in the `Badge`s. */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** Determines the `SideBarSection` `Icon` of the `Moment`. */
    icon: PropTypes.element,
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

  static defaultProps = {
    type: "employer",
  };

  renderBadge(ctx) {
    return (
      <Grid item className="employer-badge-grid-item">
        <div style={{width: 350}}>
          <EmployerBadge {...ctx} />
        </div>
      </Grid>
    )
  }

  renderInfoBox(ctx){
    const { description, label, textColor, website } = ctx;

    return (
      <Grid item className="employer-info-box">
        <CardHeader text={label} />
        <div>
          {description}
        </div>
        {website && (
          <Button
            className="employer-info-box__button"
            variant="outlined"
            href={website}
            target="_blank"
            style={{color: textColor}}
          >
            Learn More
          </Button>
        )}
      </Grid>
    )
  }

  renderSections() {
    const { color, data } = this.props;

    return data.map((employer, index) => {
      let accentColor = color.background;
      let textColor = color.text;
      let angleDirection = "left";
      if (isEven(index)) {
        accentColor = color.text;
        textColor = color.background;
        angleDirection = "right";
      }
      employer.accentColor = accentColor;
      employer.textColor = textColor;
      const angleClasses = classList('angle', `angle-${angleDirection}`)

      return (
        <div className="story-employer-section">
          <div className={angleClasses} style={{background: accentColor}}/>
          <div
            className="angled-section__background"
            style={{background: accentColor, color: textColor}}
          >
            <Grid
              container
              spacing={2}
              className="story-employer-section-grid"
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              {(angleDirection == "left") ? [
                this.renderInfoBox(employer),
                this.renderBadge(employer)
              ] : [
                this.renderBadge(employer),
                this.renderInfoBox(employer)
              ]}
            </Grid>
          </div>
        </div>
    )});
  };

  render() {
    return (
      <MomentBase {...this.props} layout="employer">
        { this.renderSections() }
      </MomentBase>
    )
  };
}
