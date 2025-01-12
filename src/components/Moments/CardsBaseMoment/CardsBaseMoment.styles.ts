import type { SxProps } from '@mui/material';

import type { CardsLayout } from '../../../types';

const styles = {
  cardsContainer: (layout: CardsLayout) => (({
    grid: {
      p: { xs: 3, md: 4 },
    },
  } as Partial<Record<CardsLayout, SxProps>>)[layout]),
};

export default styles;
