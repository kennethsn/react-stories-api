import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import CardImage from '../../../Card/Image';
import CardSection from '../../../Card/Section';
import { MapLocation } from '../constants';
import './style.scss';

export interface Props {
  active: boolean;
  data: MapLocation;
  style?: CSSProperties;
}

/**
* Info Card for a `MapMarker` Component.
*/
const MapInfoCard = ({ active, data, style }: Props) => {
  const {
    description,
    details,
    image,
    label,
  } = data;
  return (
    <div
      className="story-map__info-card"
      style={style}
    >
      <CardBase>
        <CardHeader text={label} />
        {active && (
          <div>
            {description && (
              <div className="map-detail-small">
                {description}
              </div>
            )}
            {image && (
              <CardImage
                alt={label}
                src={image}
              />
            )}
            {details && details.map(({
              description: detailDesc,
              image: detailImg,
              label: detailLabel,
              title,
            }) => (
              <CardSection key={`${detailLabel}-${title}`}>
                <div style={{ fontSize: '75%', fontWeight: 400 }}>
                  {title}
                </div>
                <Divider />
                <div style={{ fontSize: '60%', paddingBottom: 5 }}>
                  {detailLabel}
                </div>
                {detailDesc && (
                  <div className="map-detail-small">
                    {detailDesc}
                  </div>
                )}
                {detailImg && (
                  <CardImage
                    alt={detailLabel}
                    src={detailImg}
                  />
                )}
              </CardSection>
            ))}
          </div>
        )}
      </CardBase>
    </div>
  );
};

MapInfoCard.propTypes = {
  /** Determines if the current marker is at this position. */
  active: PropTypes.bool,
  /** Information to render in the `Card` */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  /** Styling object of the `Card` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

MapInfoCard.defaultProps = {
  active: false,
  style: {},
};

export default MapInfoCard;
