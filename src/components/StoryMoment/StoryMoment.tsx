import { observer } from 'mobx-react-lite';
import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy, Suspense, useMemo } from 'react';
import { useErrorBoundary } from 'react-use-error-boundary';

import { MomentProvider } from '../../providers';
import ErrorMoment from '../Moments/ErrorMoment/ErrorMoment';
import StatusPage from '../UI/StatusPage/StatusPage';
import type { StoryMomentProps } from './StoryMoment.types';

type ResolvedMomentComponent =
  ComponentType<StoryMomentProps>
  | LazyExoticComponent<ComponentType<StoryMomentProps>>;

const StoryMoment = observer(({ moment }: StoryMomentProps) => {
  const BuiltInMomentComponent = useMemo(() => {
    if (typeof moment.component !== 'string') {
      return null;
    }

    return lazy(() => import(
      `../Moments/${moment.component}/${moment.component}.tsx`
    ));
  }, [moment.component]);

  const [error] = useErrorBoundary();
  let Moment: ResolvedMomentComponent = ErrorMoment;
  if (!error) {
    if (typeof moment.component === 'string') {
      Moment = BuiltInMomentComponent ?? ErrorMoment;
    } else {
      Moment = moment.component;
    }
  }

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
