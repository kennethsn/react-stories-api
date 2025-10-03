import { Case, Switch } from 'react-if';

import type {
  ImageContentBlock as IImageContentBlock,
  RichTextContentBlock as IRichTextContentBlock,
  TextContentBlock as ITextContentBlock,
} from '../../../types';
import { deepMerge } from '../../../utils/object';
import type { ContentBlockProps } from './Content.types';
import ImageContentBlock from './ImageContentBlock';
import RichTextContentBlock from './RichTextContentBlock';
import TextContentBlock from './TextContentBlock';

export default function ContentBlock({
  content,
  index,
  sx,
  sxBlockMap,
}: ContentBlockProps) {
  const contentBlock = content.blocks[index];
  const { type: blockType } = contentBlock;
  return (
    <Switch>
      <Case condition={blockType === 'IMAGE'}>
        <ImageContentBlock
          contentBlock={contentBlock as IImageContentBlock}
          sx={sx}
        />
      </Case>

      <Case condition={blockType === 'RICH_TEXT'}>
        <RichTextContentBlock
          contentBlock={contentBlock as IRichTextContentBlock}
          sx={deepMerge(sxBlockMap?.TEXT, sx)}
        />
      </Case>

      <Case condition={blockType === 'TEXT'}>
        <TextContentBlock
          contentBlock={contentBlock as ITextContentBlock}
          sx={sx}
        />
      </Case>
    </Switch>
  );
}
