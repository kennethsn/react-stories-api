import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statCard: {
    borderRadius: '0.75rem',
    margin: '0.5rem',
    minWidth: '160px',
    padding: '1rem',
    textAlign: 'center',
  } as SxProps<Theme>,
  statIcon: {
    marginBottom: '0.5rem',
  },
  statImage: {
    margin: '0 auto 0.5rem',
    maxWidth: '48px',
  },
  statLabel: {
    color: '#000',
    fontWeight: 600,
  },
  statValue: {
    color: '#000',
    fontSize: '1.25rem',
  },
  statDescription: {
    color: '#000',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
};

export default styles;
