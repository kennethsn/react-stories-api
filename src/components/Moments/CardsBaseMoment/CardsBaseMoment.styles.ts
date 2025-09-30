import type { SxProps } from '@mui/material';

import type CardsBaseMomentStore from '../../../state/moments/cardsBaseMomentStore';
import type { CardsLayout } from '../../../types';

const styles = {
  cards: (moment: CardsBaseMomentStore<object, object>, layout: CardsLayout) => (({
    grid: {
      overflowY: 'auto',
    },
    stack: {
      height: '100%',
      width: moment.itemsHaveCaptions ? '50%' : '85%',
    },
  } as Partial<Record<CardsLayout, SxProps>>)[layout]),

  cardsContainer: (layout: CardsLayout) => (({
    grid: {
      overflow: 'auto',
      p: { md: 4, xs: 3 },
    },
    orbit: {
      alignItems: 'center',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      display: 'flex',
      height: '600px',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    stack: {
      alignItems: 'center',
      display: 'flex',
      gap: '16px',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  } as Partial<Record<CardsLayout, SxProps>>)[layout]),
  stackLayoutCaptionContainer: {
    maxHeight: '100%',
    overflowY: 'auto',
    px: 2,
    py: 3,
  },
};

export default styles;
