import Box from '@mui/material/Box';

import type { ButtonContentBlock } from '../../../types';
import { Content } from '../Content';
import styles from './IdBadge.styles';
import type { IdBadgeProps } from './IdBadge.types';

export default function IdBadge({ idBadge }: IdBadgeProps) {
  const {
    background_image: backgroundImage,
    logo,
    content,
    information,
  } = idBadge;
  const buttonBlocks = information?.blocks.filter(
    (b): b is ButtonContentBlock => b.type === 'BUTTON' && 'button' in b,
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.topGraphic}>
        <img
          alt="ID badge clip graphic"
          src="https://stories-api-public.s3.amazonaws.com/employer-card-top.png"
        />
      </Box>

      <Box className="badge" sx={styles.badge}>
        <Box className="badge-inner">
          {backgroundImage?.url ? (
            <Box
              className="badge-inner__bg"
              sx={{ backgroundImage: `url(${backgroundImage.url})` }}
            />
          ) : null}

          <Box className="badge-body">
            {logo?.url ? (
              <Box className="badge-logo">
                <img alt={logo.alt || 'Logo'} src={logo.url} />
              </Box>
            ) : null}

            {content ? (
              <Box className="badge-dates">
                <Content content={content} />
              </Box>
            ) : null}

            {buttonBlocks && buttonBlocks.length > 0 ? (
              <Box className="badge-info-panel">
                {buttonBlocks.map((block) => {
                  const href = 'collection_id' in block.button
                    ? `/collections/${block.button.collection_id}`
                    : '#';
                  return (
                    <Box
                      key={block.id}
                      component="a"
                      href={href}
                      sx={{ display: 'inline-block', mt: 1 }}
                    >
                      {block.button.label}
                    </Box>
                  );
                })}
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
