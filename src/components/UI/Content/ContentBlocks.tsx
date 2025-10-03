import { deepMerge } from '../../../utils/object';
import type { ContentProps } from './Content.types';
import ContentBlock from './ContentBlock';

export default function ContentBlocks({ content, sxBlockMap }: ContentProps) {
  return (
    <>
      {content.blocks.map((block, index) => (
        <ContentBlock
          key={block.id || `block-${index}`}
          content={content}
          index={index}
          sx={deepMerge(sxBlockMap?.[block.type], block.sx)}
          sxBlockMap={sxBlockMap}
        />
      ))}
    </>
  );
}
