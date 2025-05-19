/* eslint-disable react/jsx-props-no-spreading */
import { Case, Switch } from 'react-if';

import type { CardsProps } from './Cards.types';
import CardsGridLayout from './CardsGridLayout';
import CardsStackLayout from './CardsStackLayout';

// KSN TODO: carousel layout
// KSN TODO: merry-go-round layout
// KSN TODO: row

export default function Cards(props: CardsProps) {
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

      <Case condition={layout === 'stack'}>
        <CardsStackLayout {...layoutProps} />
      </Case>
    </Switch>
  );
}
