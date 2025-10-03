import type { DeckProps, PickingInfo } from '@deck.gl/core';
import { DeckGL } from '@deck.gl/react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Map } from 'react-map-gl/maplibre';

import { useGeoMap } from '../../../hooks';
import styles from './GeoMap.styles';
import GeoMapTooltip from './GeoMapTooltip';

const GeoMapCanvas = observer(() => {
  const geoMap = useGeoMap();
  if (!geoMap) return null;

  const handleClick = (info: PickingInfo) => {
    geoMap.onCanvasClick(info);
  };

  const handleViewStateChange: DeckProps['onViewStateChange'] = ({ viewState }) => {
    geoMap.setViewState(viewState);
  };

  return (
    <Box sx={styles.canvasRoot}>
      <DeckGL
        controller
        initialViewState={geoMap.viewState}
        layers={geoMap.layers}
        onClick={handleClick}
        onViewStateChange={handleViewStateChange}
      >
        <Map
          mapStyle={geoMap.tilesURL}
          reuseMaps
        />
      </DeckGL>

      <GeoMapTooltip />
    </Box>
  );
});

export default GeoMapCanvas;
