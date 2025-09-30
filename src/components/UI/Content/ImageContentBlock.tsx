import { deepMerge } from '../../../utils/object';
import { PreviewableImage } from '../PreviewableImage';
import styles from './Content.styles';
import type { ImageContentBlockProps } from './Content.types';

export default function ImageContentBlock({ contentBlock, sx }: ImageContentBlockProps) {
  const { image } = contentBlock;
  return (
    <PreviewableImage
      alt={image.alt || 'Image'}
      caption={image.caption}
      src={image.url}
      sx={deepMerge(styles.imageBlock, sx)}
    />
  );
}
