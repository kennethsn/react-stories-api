import type {
  ContentBlock,
  TextContentBlock,
} from '../types';

export const buildTextContentBlock = (
  text: string,
  options: Partial<TextContentBlock> | null = null,
): TextContentBlock => ({
  ...options,
  text,
  type: 'TEXT',
});

const contentBlockTypeGuard = <T extends ContentBlock['type']>(type: T) => (
  (block: ContentBlock): block is Extract<ContentBlock, { type: T }> => (
    block.type === type
  )
);

export const isImageContentBlock = contentBlockTypeGuard('IMAGE');

export const isTextContentBlock = contentBlockTypeGuard('TEXT');
