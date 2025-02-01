import { observer } from 'mobx-react-lite';
import { lazy, Suspense } from 'react';

import { MomentProvider } from '../../providers';
import type { StoryMomentProps } from './StoryMoment.types';

// KSN TODO: Add skeleton loader
const loading = <div>Loading Story...</div>;

const StoryMoment = observer(({ moment }: StoryMomentProps) => {
  const Moment = lazy(() => import(`../Moments/${moment.component}/${moment.component}.tsx`));

  return (
    <MomentProvider moment={moment}>
      <Suspense fallback={loading}>
        <Moment moment={moment} />
      </Suspense>
    </MomentProvider>
  );
});

export default StoryMoment;
