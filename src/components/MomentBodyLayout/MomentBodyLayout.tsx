import Grid from '@mui/material/Grid2';
import { observer } from 'mobx-react-lite';
import {
  Else,
  If,
  Then,
} from 'react-if';

import useStoryTheme from '../../hooks/useStoryTheme';
import { getGridItemHeights, getGridItemSizes } from '../../utils/momentLayoutUtils';
import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutProps } from './MomentBodyLayout.types';
import MomentBodyLayoutCaptionGridItem from './MomentBodyLayoutCaptionGridItem';
import MomentBodyLayoutContentGridItem from './MomentBodyLayoutContentGridItem';

// KSN TODO: lock swiper on preview
// KSN TODO: support markdown in caption for links

const MomentBodyLayout = observer(({
  children,
  contentFit = 'card',
  contentSize: inputContentSize,
  moment,
}: MomentBodyLayoutProps) => {
  const { layoutIsMobile } = useStoryTheme();
  const { captionPosition } = moment;
  const showCaptionFirst = moment.captionIsTop || (!layoutIsMobile && captionPosition === 'left');
  const layoutIsVertical = layoutIsMobile || moment.captionIsTop || captionPosition === 'bottom';
  const layoutIsHorizontal = !layoutIsVertical;
  const contentFitIsCard = contentFit === 'card';

  const { caption: captionSize, content: contentSize } = getGridItemSizes(
    inputContentSize,
    moment.hasCaption,
    layoutIsHorizontal,
    layoutIsMobile,
  );
  const { caption: captionHeight, content: contentHeight } = getGridItemHeights(
    inputContentSize,
    contentFit,
    captionPosition,
    layoutIsHorizontal,
    layoutIsMobile,
    moment.hasCaption,
  );

  const captionGridItem = (
    <MomentBodyLayoutCaptionGridItem
      boxShadow={moment.captionIsFullWidth ? 0 : 1}
      height={captionHeight}
      hide={!moment.hasCaption}
      m={moment.captionIsFullWidth ? 0 : 3}
      size={captionSize}
    />
  );

  const contentGridItem = (
    <MomentBodyLayoutContentGridItem
      borderRadius={contentFitIsCard ? 2 : 0}
      boxShadow={contentFitIsCard ? 4 : 0}
      display={contentFitIsCard ? 'block' : 'flex'}
      height={contentHeight}
      maxHeight={contentFitIsCard ? '80%' : undefined}
      maxWidth={contentFitIsCard ? '90%' : undefined}
      p={contentFitIsCard ? 2 : 0}
      size={contentSize}
    >
      {children}
    </MomentBodyLayoutContentGridItem>
  );

  return (
    <Grid
      bgcolor={moment.captionIsFullWidth ? 'background.lightGrey' : undefined}
      container
      spacing={0}
      sx={styles.root}
    >
      <If condition={showCaptionFirst}>
        <Then>
          {captionGridItem}

          {contentGridItem}
        </Then>

        <Else>
          {contentGridItem}

          {captionGridItem}
        </Else>
      </If>
    </Grid>
  );
});

export default MomentBodyLayout;
