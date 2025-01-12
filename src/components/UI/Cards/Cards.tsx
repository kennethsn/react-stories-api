/* eslint-disable react/jsx-props-no-spreading */
import { Case, Switch } from 'react-if';

import type { CardsProps } from './Cards.types';
import CardsGridLayout from './CardsGridLayout';

// KSN TODO: carousel layout
// KSN TODO: merry-go-round layout
// KSN TODO: row
// KSN TODO: stack layout

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
    </Switch>
  );
}
