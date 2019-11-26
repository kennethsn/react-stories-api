import React, { Component } from 'react';
import MapGL, {
  FullscreenControl, FlyToInterpolator, Marker, NavigationControl, Popup
} from 'react-map-gl';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '../../Icon/FontAwesome';
import MomentBase from '../Base';

import {
  fullscreenControlStyle, mapStyle, navStyle, sideBarControlStyle
} from './constants';
import MapPin from './Pin';
import MapSideBar from './SideBar';
import './style.scss';


/**
 * Map Moment to integrate a `story` with _OpenStreetMaps_.
 */
export default class MapMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Stories-API data context to configure the `MapMarker`s. */
    data: PropTypes.arrayOf(PropTypes.shape({
      coordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        point: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
      }).isRequired,
      label: PropTypes.string,
      details: PropTypes.arrayOf(PropTypes.object)
    })),
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
    type: "map",
    data: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      sidebar: true,
      tooltip: null,
      viewport: {
        // TODO: Make default zoom shrink to fix bounds of points
        latitude: 37.785164,
        longitude: -100,
        zoom: 1,
      }
    };

    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
  };

  handleSelectLocation(location) {
    this.setState({
      currentLocation: location,
      tooltip: location.label,
      viewport: {
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        transitionInterpolator: new FlyToInterpolator({speed: 2}),
        transitionDuration: 'auto',
        zoom: 11,
      }
    })
  };

  handleSidebarToggle() {
    this.setState({sidebar: !this.state.sidebar})
  };

  renderTooltip() {
    const { currentLocation, tooltip } = this.state;

    return (
      tooltip && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={currentLocation.coordinates.longitude}
          latitude={currentLocation.coordinates.latitude}
          closeOnClick={false}
          onClose={() => this.setState({tooltip: null})}
        >
          {currentLocation.label}
        </Popup>
      )
    );
  }

  renderMarkers() {
    const { data } = this.props;
      return data.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.coordinates.longitude}
          latitude={location.coordinates.latitude}
        >
          <MapPin
            size={10 + (location.details && location.details.length * 20)}
            onClick={() => this.handleSelectLocation(location)}
          />
        </Marker>
     ));
   };


  render() {
    const { handleSelectLocation, handleSidebarToggle } = this;
    const { data } = this.props;
    const { currentLocation, sidebar, viewport } = this.state;
    const layout="map"; // TODO: Add constant

    return (
      <MomentBase {...this.props} layout={layout}>
        <MapSideBar
          currentLocation={currentLocation}
          data={data}
          onSelect={handleSelectLocation}
          open={sidebar}
        >
          <div className="map-wrapper">
            <MapGL
              height="100%"
              width="100%"
              mapStyle={mapStyle}
              {...viewport}
              onViewportChange={viewport => this.setState({ viewport })}
            >

              {this.renderMarkers()}

              {this.renderTooltip()}

              <div className="fullscreen" style={fullscreenControlStyle}>
                <FullscreenControl />
              </div>
              <div style={sideBarControlStyle}>
                <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                  <button
                    className="mapboxgl-ctrl-icon"
                    onClick={handleSidebarToggle}
                    type="button"
                    title="Toggle Info Panel"
                  >
                    <FontAwesomeIcon name="FaMapSigns" />
                  </button>
                </div>
              </div>

              <div className="nav" style={navStyle}>
                <NavigationControl />
              </div>
            </MapGL>
          </div>
        </MapSideBar>
      </MomentBase>
    )
  }
}
