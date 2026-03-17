import { observer } from 'mobx-react-lite';
import { lazy, Suspense } from 'react';
import { useErrorBoundary } from 'react-use-error-boundary';

import { MomentProvider } from '../../providers';
import ErrorMoment from '../Moments/ErrorMoment/ErrorMoment';
import StatusPage from '../UI/StatusPage/StatusPage';
import type { StoryMomentProps } from './StoryMoment.types';

const StoryMoment = observer(({ moment }: StoryMomentProps) => {
  const MomentComponent = lazy(() => import(
    `../Moments/${moment.component}/${moment.component}.tsx`
  ));
  const [error] = useErrorBoundary();
  const Moment = error ? ErrorMoment : MomentComponent;
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
        <Moment
          key={moment.componentKey}
          moment={moment}
        />
      </Suspense>
    </MomentProvider>
  );
});

export default StoryMoment;
