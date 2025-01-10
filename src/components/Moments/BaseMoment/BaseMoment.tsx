import { useColor } from '../../../hooks';
import MomentLayout from '../../MomentLayout/MomentLayout';
import ThemeOverride from '../../UI/ThemeOverride/ThemeOverride';
import type { BaseMomentProps } from './BaseMoment.types';

export default function BaseMoment({
  children,
  contentFit,
  contentSize,
  moment,
  title,
}: BaseMomentProps) {
  const { themeOptions } = useColor(moment.color);
  return (
    <ThemeOverride themeOptions={themeOptions}>
      <MomentLayout
        contentFit={contentFit}
        contentSize={contentSize}
        moment={moment}
        title={title}
      >
        {children}
      </MomentLayout>
    </ThemeOverride>
  );
}
