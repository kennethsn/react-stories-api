import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import CardImage from '../../../Card/Image';

import './style.scss';
 /**
  * Info Card for a `MapMarker` Component.
  */
export default class MapInfoCard extends Component {
  static propTypes = {
    /** Information to render in the `Card` */
    data: PropTypes.object.isRequired,
    /** Styling object of the `Card` */
    style: PropTypes.object,
  };

  static defaultProps = {
    data: {},
    style: {},
  };

  render() {
    const { data, style } = this.props;

    const { image, label, } = data;
    return (
      <div className="story-map__info-card" style={style}>
        <CardBase>
          <CardHeader text={label} />
          {
            image && (
              <CardImage src={image} alt={`Image of ${label}`} />
            )
          }

        </CardBase>
      </div>
    )
  }
}
