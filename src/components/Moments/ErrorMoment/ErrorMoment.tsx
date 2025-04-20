import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useErrorBoundary } from 'react-use-error-boundary';

import BaseMoment from '../BaseMoment/BaseMoment';
import type { ErrorMomentProps } from './ErrorMoment.types';

const ErrorMoment = observer(({ moment }: ErrorMomentProps) => {
  const [error] = useErrorBoundary();
  useEffect(
    () => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error in ErrorMoment:', error);
      }
    },
    [error],
  );

  return (
    <BaseMoment
      hideContent
      moment={moment}
      noContentElevation
    />
  );
});

export default ErrorMoment;
