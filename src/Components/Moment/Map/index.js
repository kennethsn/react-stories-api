import React, { Component } from 'react';
import MapGL, {
  Marker, Popup, NavigationControl, FullscreenControl
} from 'react-map-gl';
import PropTypes from 'prop-types';

import MomentBase from '../Base';

import { fullscreenControlStyle, mapStyle, navStyle } from './constants';
import './style.scss';


/**
 * Map Moment to integrate a `story` with _OpenStreetMaps_.
 */
export default class MapMoment extends Component {
  static propTypes = {
    /** Children nodes used to fill the cards */
    // children: PropTypes.node.isRequired,
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
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

  }
  static defaultProps = {
    type: "slide_scroll",
  }

  state = {
    viewport: {
      // TODO: Hook up styling to 100%
      // TODO: Make default zoom shrink to fix bounds of points
      width: 400,
      height: 400,
      latitude: 37.785164,
      longitude: -100,
      zoom: 0,
    }
  };

  render() {
    const { children } = this.props;
    const { viewport } = this.state;
    const layout="map"; // TODO: Add constant

    return (
      <MomentBase {...this.props} layout={layout}>
        <div className="map-wrapper">
          <MapGL
            height="100%"
            width="100%"
            mapStyle={mapStyle}
            {...viewport}
            onViewportChange={viewport => this.setState({ viewport })}
          >

            <div className="fullscreen" style={fullscreenControlStyle}>
              <FullscreenControl />
            </div>

            <div className="nav" style={navStyle}>
              <NavigationControl />
            </div>
          </MapGL>
        </div>
      </MomentBase>
    )
  }
}
