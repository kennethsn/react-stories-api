export interface MapLocation {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  details?: {
    description?: string;
    image?: string;
    label: string;
    title: string;
  }[];
  image?: string;
  label: string;
}

const position = 'absolute' as 'absolute';

export const fullscreenControlStyle = {
  left: 0,
  padding: '10px',
  position,
  top: 0,
};

export const mapStyle = {
  version: 8,
  name: 'OSM',
  metadata: {},
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      minzoom: 0,
      maxzoom: 14,
      attribution:
      'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    },
  },
  // sprite: 'https://openmaptiles.github.io/klokantech-basic-gl-style/sprite',
  glyphs: 'https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=undefined',
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
  ],
  id: 'klokantech-basic',
};

export const navStyle = {
  left: 0,
  padding: '10px',
  position,
  top: 2 * 36,
};

export const sideBarControlStyle = {
  left: 0,
  padding: '10px',
  position,
  top: 36,
};
