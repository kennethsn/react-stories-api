import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import {
  createRef,
  type RefObject,
  useEffect,
  useRef,
} from 'react';
import { When } from 'react-if';

import useGeoMap from '../../../hooks/useGeoMap';
import Content from '../Content/Content';
import styles from './GeoMap.styles';

const GeoMapInformationPanel = observer(() => {
  const geoMap = useGeoMap();
  const handleLabelClick = (item: { select: () => void }) => item.select;
  const itemRefs = useRef(new Map<string, RefObject<HTMLDivElement>>());
  useEffect(() => {
    geoMap.setScrollInfoPanelToKeyFunction((key: string) => {
      const ref = itemRefs.current.get(key);
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  return (
    <Box sx={styles.infoPanelRoot}>
      {geoMap.informationItems.map((item) => {
        if (!itemRefs.current.has(item.key)) {
          itemRefs.current.set(item.key, createRef<HTMLDivElement>());
        }

        const ref = itemRefs.current.get(item.key);
        return (
          <Box
            key={item.key}
            ref={ref}
            sx={styles.infoPanelItem(item.isSelected, geoMap.hasSelectedKey)}
          >
            <Typography
              onClick={handleLabelClick(item)}
              sx={styles.infoPanelItemLabel(item.isSelected)}
              variant="h6"
            >
              {item.label}
            </Typography>

            <When condition={!!item.description}>
              <Typography
                sx={styles.infoPanelItemDescription}
                variant="body2"
              >
                {item.description}
              </Typography>
            </When>

            <When condition={item.isSelected ? !!item.content : false}>
              <Content
                content={item.content!}
                sxBlockMap={styles.infoPanelItemContentBlockMap}
              />
            </When>
          </Box>
        );
      })}
    </Box>
  );
});

export default GeoMapInformationPanel;
