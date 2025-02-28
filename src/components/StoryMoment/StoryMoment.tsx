import { observer } from 'mobx-react-lite';
import { lazy, Suspense } from 'react';

import { MomentProvider } from '../../providers';
import StatusPage from '../UI/StatusPage/StatusPage';
import type { StoryMomentProps } from './StoryMoment.types';

const StoryMoment = observer(({ moment }: StoryMomentProps) => {
  const Moment = lazy(() => import(`../Moments/${moment.component}/${moment.component}.tsx`));

  return (
    <MomentProvider moment={moment}>
      <Suspense
        fallback={(
          <StatusPage
            isLoading
            message="Loading Moment..."
          />
        )}
      >
        <Moment moment={moment} />
      </Suspense>
    </MomentProvider>
  );
});

export default StoryMoment;
