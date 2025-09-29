import type { SxProps } from '@mui/material/styles';

import type CardsBaseMomentStore from '../../../state/moments/cardsBaseMomentStore';
import type { MomentData } from '../../../types';
import type { CardsProps } from '../../UI/Cards/Cards.types';
import type { BaseMomentProps } from '../BaseMoment/BaseMoment.types';

export type CardsBaseMomentProps<T extends CardsBaseMomentStore<object, object>> =
  BaseMomentProps<T> & {
    readonly cardsContainerSx?: SxProps;
    readonly children: CardsProps['children'];
    readonly gridColumnsMax?: CardsProps['gridColumnsMax'];
    readonly disableAnimation?: boolean;
    readonly sx?: CardsProps['sx'];
  };

export type CardsBaseMomentPropsWithoutChildren<T extends CardsBaseMomentStore<object, object>> =
  Omit<CardsBaseMomentProps<T>, 'children'>;

export type CardsBaseMomentStackCaptionProps = {
  readonly moment: CardsBaseMomentStore<MomentData, object>;
};
