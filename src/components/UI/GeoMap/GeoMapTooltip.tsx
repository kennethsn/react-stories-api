import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { When } from 'react-if';

import useGeoMap from '../../../hooks/useGeoMap';
import Content from '../Content/Content';
import styles from './GeoMap.styles';

const GeoMapTooltip = observer(() => {
  const geoMap = useGeoMap();

  const handleClick = useCallback(() => {
    geoMap.onTooltipClick();
  }, [geoMap]);

  const handleMouseEnter = useCallback(() => {
    geoMap.lockTooltip();
  }, [geoMap]);

  const handleMouseLeave = useCallback(() => {
    geoMap.unlockTooltip();
  }, [geoMap]);

  return (
    <Box
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={styles.tooltipRoot(geoMap)}
    >
      <When condition={!!geoMap.shouldShowTooltip}>
        <Content
          content={geoMap.tooltipContent!}
          sx={styles.tooltipContent}
        />
      </When>
    </Box>
  );
});

export default GeoMapTooltip;
