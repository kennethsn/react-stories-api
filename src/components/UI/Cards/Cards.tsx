/* eslint-disable react/jsx-props-no-spreading */
import { observer } from 'mobx-react-lite';
import { Case, Switch } from 'react-if';

import type { CardsProps } from './Cards.types';
import CardsCarouselLayout from './CardsCarouselLayout';
import CardsGridLayout from './CardsGridLayout';
import CardsOrbitLayout from './CardsOrbitLayout';
import CardsRowLayout from './CardsRowLayout';
import CardsStackLayout from './CardsStackLayout';

const Cards = observer((props: CardsProps) => {
  const { layout = 'grid' } = props;
  const layoutProps = {
    keyFn: (index: number) => `${layout}-${index}`,
    layout,
    ...props,
  };
  return (
    <Switch>
      <Case condition={layout === 'carousel'}>
        <CardsCarouselLayout {...layoutProps} />
      </Case>

      <Case condition={layout === 'grid'}>
        <CardsGridLayout {...layoutProps} />
      </Case>

      <Case condition={layout === 'orbit'}>
        <CardsOrbitLayout {...layoutProps} />
      </Case>

      <Case condition={layout === 'row'}>
        <CardsRowLayout {...layoutProps} />
      </Case>

      <Case condition={layout === 'stack'}>
        <CardsStackLayout {...layoutProps} />
      </Case>
    </Switch>
  );
});

export default Cards;
