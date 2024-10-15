import Grid from '@mui/material/Grid2';
import {
  Else,
  If,
  Then,
} from 'react-if';

import useStory from '../../hooks/useStory';
import { getGridItemHeights, getGridItemSizes } from '../../utils/momentLayoutUtils';
import styles from './MomentBodyLayout.styles';
import type { MomentBodyLayoutProps } from './MomentBodyLayout.types';
import MomentBodyLayoutCaptionGridItem from './MomentBodyLayoutCaptionGridItem';
import MomentBodyLayoutContentGridItem from './MomentBodyLayoutContentGridItem';
// KSN TODO: lock swiper on preview
// KSN TODO: ability to link a button in a caption
// KSN TODO: support markdown in caption for links
export default function MomentBodyLayout({
  children,
  contentFit = 'card',
  contentSize: inputContentSize,
  moment,
}: MomentBodyLayoutProps) {
  const { layoutIsMobile } = useStory();
  const {
    caption: {
      content: captionContent,
      fit: captionFit = 'full-width',
      position: captionPosition = 'bottom',
    } = {},
  } = moment.data;
  const hasCaption = !!captionContent;
  const captionIsTop = captionPosition === 'top';
  const captionFitIsFullWidth = captionFit === 'full-width';
  const showCaptionFirst = captionIsTop || (!layoutIsMobile && captionPosition === 'left');
  const layoutIsVertical = layoutIsMobile || captionIsTop || captionPosition === 'bottom';
  const layoutIsHorizontal = !layoutIsVertical;
  const contentFitIsCard = contentFit === 'card';

  const { caption: captionSize, content: contentSize } = getGridItemSizes(
    inputContentSize,
    hasCaption,
    layoutIsHorizontal,
    layoutIsMobile,
  );
  const { caption: captionHeight, content: contentHeight } = getGridItemHeights(
    inputContentSize,
    contentFit,
    captionPosition,
    layoutIsHorizontal,
    layoutIsMobile,
    hasCaption,
  );

  const captionGridItem = (
    <MomentBodyLayoutCaptionGridItem
      boxShadow={captionFitIsFullWidth ? 0 : 1}
      content={captionContent}
      height={captionHeight}
      hide={!hasCaption}
      m={captionFitIsFullWidth ? 0 : 3}
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
      bgcolor={captionFitIsFullWidth ? 'background.lightGrey' : undefined}
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
}
