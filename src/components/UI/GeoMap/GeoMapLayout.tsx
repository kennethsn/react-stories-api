import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import useStoriesAPITheme from '../../../hooks/useStoriesAPITheme';
import { deepMerge } from '../../../utils/object';
import styles from './GeoMap.styles';
import type { GeoMapLayoutProps } from './GeoMap.types';
import GeoMapCanvas from './GeoMapCanvas';
import GeoMapDesktopLayout from './GeoMapDesktopLayout';

const GeoMapLayout = observer(({ sx }: GeoMapLayoutProps) => {
  const { isDesktop } = useStoriesAPITheme();
  return (
    <Box sx={deepMerge(styles.root, sx)}>
      <If condition={isDesktop}>
        <Then>
          <GeoMapDesktopLayout />
        </Then>

        <Else>
          <GeoMapCanvas />
        </Else>
      </If>
    </Box>
  );
});

export default GeoMapLayout;
