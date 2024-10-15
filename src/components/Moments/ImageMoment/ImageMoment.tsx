import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './ImageMoment.styles';
import type { ImageMomentProps } from './ImageMoment.types';
// KSN TODO: lock swiper on preview
// KSN TODO: ability to link a button in a caption
// KSN TODO: support markdown in caption for links
export default function ImageMoment({ moment }: ImageMomentProps) {
  const { label, title } = moment;
  const {
    image: {
      fit: imageFit = 'card',
      position: imagePosition = 'center',
      size: imageSize,
      url: src,
    },
  } = moment.data;
  const imageFitIsCard = imageFit === 'card';
  const imageFitIsCover = imageFit === 'cover';
  return (
    <BaseMoment
      contentFit={imageFit}
      contentSize={imageSize}
      moment={moment}
    >
      <PreviewableImage
        alt={title ?? label}
        className="moment-image"
        src={src}
        sx={styles.image(imageFitIsCard, imageFitIsCover, imagePosition)}
      />
    </BaseMoment>
  );
}
