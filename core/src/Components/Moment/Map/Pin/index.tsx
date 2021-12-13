import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';

import ReactIcon, { ReactIconProps } from '../../../Icon/ReactIcon';
import './style.scss';

interface Props {
  iconName: ReactIconProps['name'];
  onClick?: () => void;
  size: number;
  style: CSSProperties;
}

/**
* Pin for a `MapMarker` Component.
*/
const MapPin = ({
  iconName,
  onClick,
  size,
  style,
}: Props) => (
  <div
    className="story-map__pin"
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    style={style}
    tabIndex={0}
  >
    <ReactIcon
      name={iconName}
      style={{ transform: `scale(${size / 20})` }}
    />
  </div>
);

MapPin.propTypes = {
  /** `FontAwesomeIcon` name to render */
  iconName: PropTypes.string,
  /** Click handler callback used by the `MapMarker` */
  onClick: PropTypes.func,
  /** Size of the `Pin` icon. */
  size: PropTypes.number,
  /** Styling object of the `Pin` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

MapPin.defaultProps = {
  iconName: 'FaMapMarkerAlt',
  onClick: () => {},
  size: 20,
  style: {},
};

export default MapPin;
