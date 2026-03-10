import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React, { isValidElement } from 'react';

import { deepMerge } from '../../../utils/object';
import type { CardsLayoutProps } from './Cards.types';
import CardsItem from './CardsItem';
import styles from './CardsZigZagLayout.styles';

export default function CardsZigZagLayout({
  children,
  keyFn,
  sx,
}: CardsLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cards = React.Children.toArray(children);

  type CaptionBlock =
  | { id: string; type: 'TEXT'; text: string }
  | { id: string; type: 'BUTTON'; button: { collection_id?: number; label?: string } };

  return (
    <Box sx={deepMerge(styles.zigZagLayoutRoot, sx)}>
      {cards.map((card, index) => {
        const isEven = index % 2 === 0;
        const caption = isValidElement(card) && card?.props?.caption;
        const canRenderCaption = caption && Array.isArray(caption.blocks);
        // TODO: replace this with content component and use styling to overlay zigzag styles
        const renderCaption = canRenderCaption ? (
          <Box sx={styles.zigZagCaption.container}>
            {caption.blocks.map((block: CaptionBlock) => {
              if (block.type === 'TEXT' && 'text' in block) {
                return (
                  <Box
                    key={block.id}
                    sx={styles.zigZagCaption.textBlock}
                  >
                    {block.text}
                  </Box>
                );
              }
              if (block.type === 'BUTTON' && 'button' in block) {
                return (
                  <Box
                    key={block.id}
                    component="a"
                    href={block.button.collection_id ? `/collection/${block.button.collection_id}` : '#'}
                    sx={{
                      ...styles.zigZagCaption.buttonBlock,
                      color: isEven ? 'primary.main' : 'white',
                      backgroundColor: isEven ? 'transparent' : 'primary.dark',
                      borderColor: isEven ? 'primary.main' : 'primary.dark',
                      '&:hover': {
                        backgroundColor: isEven ? 'primary.light' : 'primary.main',
                        color: isEven ? 'white' : 'white',
                      },
                    }}
                  >
                    {block.button.label}
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        ) : null;

        return (
          <Box
            key={keyFn(index)}
            sx={{
              ...styles.zigZagSection,
              ...(isEven ? styles.zigZagSectionLeft : styles.zigZagSectionRight),
            }}
          >
            <Box
              sx={{
                ...styles.angle,
                ...(isEven ? styles.angleLeft : styles.angleRight),
              }}
            />

            <Grid
              alignItems="center"
              container
              justifyContent={{ xs: 'center', md: 'space-between' }}
              spacing={isMobile ? 2 : 4}
              sx={{
                ...styles.zigZagGrid,
                flexDirection: {
                  xs: 'column',
                  md: isEven ? 'row' : 'row-reverse',
                },
              }}
            >

              <Grid size={{ xs: 12, md: isEven ? 7 : 5 }}>
                <CardsItem disableAnimation sx={styles.zigZagCard}>
                  {card}
                </CardsItem>
              </Grid>

              <Grid
                size={{ xs: 12, md: isEven ? 5 : 7 }}
                sx={{
                  mt: { xs: 2, md: 0 },
                  minWidth: 0,
                }}
              >
                {renderCaption}
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
