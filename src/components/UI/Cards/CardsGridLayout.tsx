import { Masonry } from '@mui/lab';

import { buildDynamicGridColumns } from '../../../utils/grid';
import { getRandomNumber } from '../../../utils/math';
import { deepMerge } from '../../../utils/object';
import Animation from '../Animation/Animation';
import styles from './Cards.styles';
import type { CardsLayoutProps } from './Cards.types';

export default function CardsGridLayout({
  children,
  keyFn,
  overrideTotalCount,
  sx,
}: CardsLayoutProps) {
  const columns = buildDynamicGridColumns(overrideTotalCount ?? children.length, { xs: 2 });
  return (
    <Masonry
      columns={columns}
      sx={deepMerge(styles.gridRoot, sx)}
    >
      {children.map((item, index) => (
        <div
          key={keyFn(index)}
          style={{ flexShrink: 0 }}
        >
          <Animation
            animation="fadeUp"
            persist
            speed={getRandomNumber(600, 1500)}
          >
            {item}
          </Animation>
        </div>
      ))}
    </Masonry>
  );
}
