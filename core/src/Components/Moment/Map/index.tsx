import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MapGL, {
  FullscreenControl,
  FlyToInterpolator,
  InteractiveMapProps,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import FontAwesomeIcon from '../../Icon/FontAwesome';
import MomentBase from '../Base';
import {
  fullscreenControlStyle,
  MapLocation,
  mapStyle,
  navStyle,
  sideBarControlStyle,
} from './constants';
import MapPin from './Pin';
import MapSideBar from './SideBar';
import './style.scss';

export interface MapMomentProps extends MomentProps {
  data: MapLocation[];
}

/**
 * Map Moment to integrate a `story` with _OpenStreetMaps_.
 */
const MapMoment = (props: MapMomentProps) => {
  const { data } = props;
  const [sidebar, setSidebar] = useState(true);
  // TODO: Make default zoom shrink to fix bounds of points
  const [viewport, setViewport] = useState(
    { latitude: 37.785164, longitude: -100, zoom: 1 } as InteractiveMapProps,
  );
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(
    undefined as number | undefined,
  );
  const [selectedLocation, setSelectedLocation] = useState(undefined as MapLocation | undefined);
  const [tooltip, setTooltip] = useState(undefined as string | undefined);
  const selectLocation = (index: number) => {
    setSelectedLocationIndex(index);
    const location = data[index];
    if (!location) return;
    setSelectedLocation(location);
    const { coordinates, label } = location;
    setTooltip(label);
    setViewport({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: 'auto',
      zoom: 11,
    } as InteractiveMapProps);
  };
  const markerKey = (index: number) => `marker-${index}`;
  const markers = data.map(({ coordinates, details }, index) => (
    <Marker
      key={markerKey(index)}
      latitude={coordinates.latitude}
      longitude={coordinates.longitude}
    >
      <MapPin
        size={10 + ((details && details.length * 20) || 0)}
        onClick={() => selectLocation(index)}
      />
    </Marker>
  ));
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase {...props}>
      <MapSideBar
        data={data}
        onSelect={selectLocation}
        open={sidebar}
        selectedIndex={selectedLocationIndex}
      >
        <div className="map-wrapper">
          <MapGL
            mapStyle={mapStyle}
            {...viewport}
            height="100%"
            width="100%"
            onViewportChange={(vp: InteractiveMapProps) => setViewport(vp)}
          >
            {markers}
            {tooltip && selectedLocation && (
              <Popup
                anchor="top"
                closeOnClick={false}
                latitude={selectedLocation!.coordinates.latitude}
                longitude={selectedLocation!.coordinates.longitude}
                onClose={() => setTooltip(undefined)}
                tipSize={5}
              >
                {selectedLocation!.label}
              </Popup>
            )}
            <div
              className="fullscreen"
              style={fullscreenControlStyle}
            >
              <FullscreenControl />
            </div>
            <div style={sideBarControlStyle}>
              <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                <button
                  className="mapboxgl-ctrl-icon"
                  onClick={() => setSidebar(!sidebar)}
                  type="button"
                  title="Toggle Info Panel"
                >
                  <FontAwesomeIcon name="FaMapSigns" />
                </button>
              </div>
            </div>
            <div
              className="nav"
              style={navStyle}
            >
              <NavigationControl />
            </div>
          </MapGL>
        </div>
      </MapSideBar>
    </MomentBase>
  );
};

MapMoment.propTypes = {
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
      point: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    label: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.object),
  })),
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

MapMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  data: [],
  layout: MomentLayout.Map,
  type: MomentType.Map,
};

export default MapMoment;
