import { Case, Switch } from 'react-if';

import type {
  ImageContentBlock as IImageContentBlock,
  TextContentBlock as ITextContentBlock,
} from '../../../types';
import type { ContentBlockProps } from './Content.types';
import ImageContentBlock from './ImageContentBlock';
import TextContentBlock from './TextContentBlock';

export default function ContentBlock({
  content,
  index,
  sx,
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

      <Case condition={blockType === 'TEXT'}>
        <TextContentBlock
          contentBlock={contentBlock as ITextContentBlock}
          sx={sx}
        />
      </Case>
    </Switch>
  );
}
