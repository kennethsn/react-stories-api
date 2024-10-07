import Grid from '@mui/material/Grid2';
import {
  Else,
  If,
  Then,
} from 'react-if';

import useStory from '../../../hooks/useStory';
import { getGridItemHeights, getGridItemSizes } from '../../../utils/imageMomentUtils';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './ImageMoment.styles';
import type { ImageMomentProps } from './ImageMoment.types';
import ImageMomentCaptionGridItem from './ImageMomentCaptionGridItem';
import ImageMomentImageGridItem from './ImageMomentImageGridItem';
// KSN TODO: lock swiper on preview

export default function ImageMoment({ moment }: ImageMomentProps) {
  const { layoutIsMobile } = useStory();
  const { label, title } = moment;
  const {
    caption: {
      content: captionContent,
      fit: captionFit = 'full-width',
      position: captionPosition = 'bottom',
    } = {},
    image: {
      fit: imageFit = 'card',
      size: inputImageSize,
      url: src,
    },
  } = moment.data;
  const hasCaption = !!captionContent;
  const captionFitIsFullWidth = captionFit === 'full-width';
  const showCaptionFirst = !layoutIsMobile && (captionPosition === 'top' || captionPosition === 'left');
  const layoutIsVertical = layoutIsMobile || captionPosition === 'top' || captionPosition === 'bottom';
  const layoutIsHorizontal = !layoutIsVertical;
  const imageFitIsCard = imageFit === 'card';

  const { caption: captionSize, image: imageSize } = getGridItemSizes(
    inputImageSize,
    hasCaption,
    layoutIsHorizontal,
    layoutIsMobile,
  );
  const { caption: captionHeight, image: imageHeight } = getGridItemHeights(
    inputImageSize,
    imageFit,
    captionPosition,
    layoutIsHorizontal,
    layoutIsMobile,
    hasCaption,
  );

  const captionGridItem = (
    <ImageMomentCaptionGridItem
      boxShadow={captionFitIsFullWidth ? 0 : 1}
      content={captionContent}
      height={captionHeight}
      hide={!hasCaption}
      m={captionFitIsFullWidth ? 0 : 3}
      size={captionSize}
    />
  );

  const imageGridItem = (
    <ImageMomentImageGridItem
      alt={title ?? label}
      boxSx={styles.image(imageFitIsCard, imageFit === 'cover')}
      display={imageFitIsCard ? 'block' : 'flex'}
      height={imageHeight}
      maxHeight={imageFitIsCard ? '80%' : undefined}
      maxWidth={imageFitIsCard ? '90%' : undefined}
      p={imageFitIsCard ? 2 : 0}
      size={imageSize}
      src={src}
    />
  );

  return (
    <BaseMoment moment={moment}>

      <Grid
        bgcolor={captionFitIsFullWidth ? 'background.lightGrey' : undefined}
        container
        spacing={0}
        sx={styles.root}
      >
        <If condition={showCaptionFirst}>
          <Then>
            {captionGridItem}

            {imageGridItem}
          </Then>

          <Else>
            {imageGridItem}

            {captionGridItem}
          </Else>
        </If>
      </Grid>
    </BaseMoment>
  );
}
