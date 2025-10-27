import { Case, Switch } from 'react-if';

import type {
  BulletedListContentBlock as IBulletedListContentBlock,
  ButtonContentBlock as IButtonContentBlock,
  ImageContentBlock as IImageContentBlock,
  NumberedListContentBlock as INumberedListContentBlock,
  RichTextContentBlock as IRichTextContentBlock,
  TextContentBlock as ITextContentBlock,
} from '../../../types';
import { deepMerge } from '../../../utils/object';
import BulletedListContentBlock from './BulletedListContentBlock';
import ButtonContentBlock from './ButtonContentBlock';
import type { ContentBlockProps } from './Content.types';
import ImageContentBlock from './ImageContentBlock';
import NumberedListContentBlock from './NumberedListContentBlock';
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
      <Case condition={blockType === 'BULLETED_LIST'}>
        <BulletedListContentBlock
          contentBlock={contentBlock as IBulletedListContentBlock}
          sx={deepMerge(sxBlockMap?.BULLETED_LIST, sx)}
        />
      </Case>

      <Case condition={blockType === 'BUTTON'}>
        <ButtonContentBlock
          contentBlock={contentBlock as IButtonContentBlock}
          sx={deepMerge(sxBlockMap?.BUTTON, sx)}
        />
      </Case>

      <Case condition={blockType === 'IMAGE'}>
        <ImageContentBlock
          contentBlock={contentBlock as IImageContentBlock}
          sx={sx}
        />
      </Case>

      <Case condition={blockType === 'NUMBERED_LIST'}>
        <NumberedListContentBlock
          contentBlock={contentBlock as INumberedListContentBlock}
          sx={deepMerge(sxBlockMap?.NUMBERED_LIST, sx)}
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
