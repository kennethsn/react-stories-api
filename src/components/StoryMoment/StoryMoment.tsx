import { observer } from 'mobx-react-lite';
import { lazy, Suspense } from 'react';

import type { StoryMomentProps } from './StoryMoment.types';

// KSN TODO: Add skeleton loader
const loading = <div>Loading Story...</div>;

const StoryMoment = observer(({ moment }: StoryMomentProps) => {
  const Moment = lazy(() => import(`../Moments/${moment.component}/${moment.component}.tsx`));

  return (
    <Suspense fallback={loading}>
      <Moment moment={moment} />
    </Suspense>
  );
});

export default StoryMoment;
