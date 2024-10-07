import type { ClickableImageProps } from './ClickableImage.types';

export default function ClickableImage({ alt, onClick, src }: ClickableImageProps) {
  return (
    <button
      onClick={onClick}
      type="button"
    >
      <img
        alt={alt}
        src={src}
      />
    </button>
  );
}
