import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '../../../Icon/FontAwesome';

import './style.scss';
 /**
  * Pin for a `MapMarker` Component.
  */
export default class MapPin extends Component {
  static propTypes = {
    /** `FontAwesomeIcon` name to render */
    iconName: PropTypes.string.isRequired,
    /** Click handler callback used by the `MapMarker` */
    onClick: PropTypes.func,
    /** Size of the `Pin` icon. */
    size: PropTypes.number,
    /** Styling object of the `Pin` */
    style: PropTypes.object,
  };

  static defaultProps = {
    iconName: "FaMapMarkerAlt",
    onClick: () => {},
    size: 20,
    style: {},
  };

  render() {
    const { iconName, onClick, size, style } = this.props;
    const iconStyle = {transform: `scale(${size/20})`};
    return (
      <div className="story-map__pin" style={style} onClick={onClick}>
        <FontAwesomeIcon name={iconName} style={iconStyle}/>
      </div>
    )
  }
}
