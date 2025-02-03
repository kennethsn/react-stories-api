import { observer } from 'mobx-react-lite';

import { useColor } from '../../../hooks';
import MomentLayout from '../../MomentLayout/MomentLayout';
import ThemeOverride from '../../UI/ThemeOverride/ThemeOverride';
import type { BaseMomentProps } from './BaseMoment.types';

const BaseMoment = observer(({
  actions,
  children,
  contentFit,
  contentSize,
  moment,
  noContentElevation,
}: BaseMomentProps) => {
  const { themeOptions } = useColor(moment.color);
  return (
    <ThemeOverride themeOptions={themeOptions}>
      <MomentLayout
        actions={actions}
        contentFit={contentFit}
        contentSize={contentSize}
        moment={moment}
        noContentElevation={noContentElevation}
      >
        {children}
      </MomentLayout>
    </ThemeOverride>
  );
});

export default BaseMoment;
