import type { SxProps, Theme } from '@mui/material/styles';

const cornerSize = 50;

const styles = {
  root: {
    alignItems: 'center',
    bgcolor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    color: 'text.primary',
    display: 'flex',
    flexDirection: 'column',
    height: '250px',
    justifyContent: 'center',
    maxWidth: '100%',
    minHeight: 250,
    position: 'relative',
    textAlign: 'center',
    width: { xs: '100%', sm: 360, md: 400 },
  } as SxProps<Theme>,

  content: {
    maxWidth: '90%',
  },

  corner: {
    topLeft: (color: string) => ({
      borderRight: `${cornerSize}px solid transparent`,
      borderTop: `${cornerSize}px solid ${color}`,
      height: 0,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 0,
    }),
    topRight: (color: string) => ({
      borderLeft: `${cornerSize}px solid transparent`,
      borderTop: `${cornerSize}px solid ${color}`,
      height: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      width: 0,
    }),
    bottomLeft: (color: string) => ({
      borderBottom: `${cornerSize}px solid ${color}`,
      borderRight: `${cornerSize}px solid transparent`,
      bottom: 0,
      height: 0,
      left: 0,
      position: 'absolute',
      width: 0,
    }),
    bottomRight: (color: string) => ({
      borderBottom: `${cornerSize}px solid ${color}`,
      borderLeft: `${cornerSize}px solid transparent`,
      bottom: 0,
      height: 0,
      position: 'absolute',
      right: 0,
      width: 0,
    }),
  },

  awardIcon: (color: string): SxProps<Theme> => ({
    color,
    mb: 1,
  }),
  recipient: {
    fontSize: { xs: '1.2rem', sm: '1.5rem' },
    fontWeight: 700,
  },
  subtitle: {
    fontSize: { xs: '1rem', sm: '1.2rem' },
    fontWeight: 500,
  },
  description: {
    fontSize: { xs: '0.9rem', sm: '1rem' },
    mt: 0.5,
  },
  title: {
    fontSize: '0.95rem',
    mt: 0.5,
  },
  conferredBy: {
    fontSize: '0.85rem',
    fontStyle: 'italic',
    mt: 1,
  },
  year: {
    fontSize: '0.85rem',
    mt: 0.5,
  },
};

export default styles;
