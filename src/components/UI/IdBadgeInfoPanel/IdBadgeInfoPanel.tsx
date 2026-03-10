import Box from '@mui/material/Box';

import type { Content as ContentType } from '../../../types';
import { Content } from '../Content';
import styles from '../IdBadge/IdBadge.styles';

interface IdBadgeInfoPanelProps {
  readonly caption?: ContentType;
}
export default function IdBadgeInfoPanel({ caption }: IdBadgeInfoPanelProps = {}) {
  if (!caption) return null;

  return (
    <Box className="info-panel" sx={styles.infoPanel}>
      <Box sx={{ padding: 12, flex: 1 }}>
        <Content content={caption} />
      </Box>
    </Box>
  );
}
