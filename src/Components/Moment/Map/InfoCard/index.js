import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import CardImage from '../../../Card/Image';
import CardSection from '../../../Card/Section';

import './style.scss';
 /**
  * Info Card for a `MapMarker` Component.
  */
export default class MapInfoCard extends Component {
  static propTypes = {
    /** Determines if the current marker is at this position. */
    active: PropTypes.bool.isRequired,
    /** Information to render in the `Card` */
    data: PropTypes.object.isRequired,
    /** Styling object of the `Card` */
    style: PropTypes.object,
  };

  static defaultProps = {
    active: false,
    data: {},
    style: {},
  };

  renderDetails() {
    const { data } = this.props;

    const { description, details, image, label } = data;
    return (
      <div>
        {description && <div className="map-detail-small">{description}</div>}
        {image && <CardImage src={image} alt={`Image of ${label}`} />}

        {details.map(({ description, image, label, title }) => (
          <CardSection>
            <div style={{fontSize: "75%", fontWeight: 400}}>{title}</div>
            <Divider />
            <div style={{fontSize: "60%", paddingBottom: 5}}>{label}</div>
            {description && <div className="map-detail-small">{description}</div>}
            {image && <CardImage src={image} alt={label} />}
          </CardSection>
        ))}
      </div>
    );
  };

  render() {
    const { active, data, style } = this.props;

    const { image, label, } = data;
    return (
      <div className="story-map__info-card" style={style}>
        <CardBase>
          <CardHeader text={label} />
          {active && this.renderDetails()}
        </CardBase>
      </div>
    )
  }
}
