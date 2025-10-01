/* eslint-disable react/jsx-props-no-spreading */
import { observer } from 'mobx-react-lite';
import { Case, Switch } from 'react-if';

import type { CardsProps } from './Cards.types';
import CardsGridLayout from './CardsGridLayout';
import CardsOrbitLayout from './CardsOrbitLayout';
import CardsStackLayout from './CardsStackLayout';

// KSN TODO: carousel layout
// KSN TODO: row

const Cards = observer((props: CardsProps) => {
  const { layout = 'grid' } = props;
  const layoutProps = {
    keyFn: (index: number) => `${layout}-${index}`,
    layout,
    ...props,
  };
  return (
    <Switch>
      <Case condition={layout === 'grid'}>
        <CardsGridLayout {...layoutProps} />
      </Case>

      <Case condition={layout === 'orbit'}>
        <CardsOrbitLayout {...layoutProps} />
      </Case>

      <Case condition={layout === 'stack'}>
        <CardsStackLayout {...layoutProps} />
      </Case>
    </Switch>
  );
});

export default Cards;
