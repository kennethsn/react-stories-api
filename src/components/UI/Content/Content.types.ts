import type { SxProps } from '@mui/material/styles';

import type {
  Content,
  ContentBlockType,
  ImageContentBlock,
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

export type ImageContentBlockProps = BaseContentBlockProps<ImageContentBlock>;

export type RichTextContentBlockProps = BaseContentBlockProps<RichTextContentBlock>;

export type TextContentBlockProps = BaseContentBlockProps<TextContentBlock>;
