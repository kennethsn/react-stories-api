import { observer } from 'mobx-react-lite';

import PreviewableImage from '../../UI/PreviewableImage/PreviewableImage';
import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './ImageMoment.styles';
import type { ImageMomentProps } from './ImageMoment.types';
// KSN TODO: lock swiper on preview
// TODO: Add a caption prop
// KSN TODO: support markdown in caption for links
const ImageMoment = observer(({ moment }: ImageMomentProps) => (
  <BaseMoment
    contentFit={moment.fit}
    contentSize={moment.size}
    moment={moment}
    noContentElevation
  >
    <PreviewableImage
      alt={moment.alt}
      className="moment-image"
      src={moment.url}
      sx={styles.image(moment)}
    />
  </BaseMoment>
));

export default ImageMoment;
