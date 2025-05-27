import { Masonry } from '@mui/lab';

import { buildDynamicGridColumns } from '../../../utils/grid';
import { deepMerge } from '../../../utils/object';
import styles from './Cards.styles';
import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';

export default function CardsGridLayout({
  children,
  disableAnimation,
  gridColumnsMax,
  itemSx,
  keyFn,
  overrideTotalCount,
  sx,
}: CardsLayoutProps) {
  const columns = buildDynamicGridColumns(
    overrideTotalCount ?? children.length,
    gridColumnsMax ?? { xs: 2 },
  );
  return (
    <Masonry
      columns={columns}
      sx={deepMerge(styles.gridLayoutRoot, sx)}
    >
      {children.map((item, index) => (
        <CardsItem
          key={keyFn(index)}
          disableAnimation={disableAnimation}
          sx={itemSx}
        >
          {item}
        </CardsItem>
      ))}
    </Masonry>
  );
}
