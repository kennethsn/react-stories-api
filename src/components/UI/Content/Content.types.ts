import type { SxProps } from '@mui/material/styles';

import type {
  BulletedListContentBlock,
  ButtonContentBlock,
  Content,
  ContentBlockType,
  ImageContentBlock,
  NumberedListContentBlock,
  RichTextContentBlock,
  TextContentBlock,
} from '../../../types';

type BaseContentBlockProps<T> = {
  readonly sx?: SxProps;
  readonly contentBlock: T;
};

export type ContentProps = {
  readonly content: Content;
  readonly sx?: SxProps;
  readonly sxBlockMap?: Partial<Record<ContentBlockType, SxProps>>;
};

export type ContentBlockProps = {
  readonly index: number;
  readonly content: Content;
  readonly sx?: SxProps;
  readonly sxBlockMap?: Partial<Record<ContentBlockType, SxProps>>;
};

export type BulletedListContentBlockProps = BaseContentBlockProps<BulletedListContentBlock>;

export type ButtonContentBlockProps = BaseContentBlockProps<ButtonContentBlock>;

export type ImageContentBlockProps = BaseContentBlockProps<ImageContentBlock>;

export type NumberedListContentBlockProps = BaseContentBlockProps<NumberedListContentBlock>;

export type RichTextContentBlockProps = BaseContentBlockProps<RichTextContentBlock>;

export type TextContentBlockProps = BaseContentBlockProps<TextContentBlock>;
