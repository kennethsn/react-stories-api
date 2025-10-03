import type { SxProps, Theme } from '@mui/material/styles';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  statCard: {
    borderRadius: '0.5rem',
    boxShadow: 8,
    margin: '0.5rem',
    padding: '1rem',
    position: 'relative',
    textAlign: 'center',
  } as SxProps<Theme>,
  statDescription: {
    color: '#000',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  statIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  statIconBox: {
    alignItems: 'center',
    backgroundColor: 'var(--accent-color)',
    borderRadius: '0.5rem',
    boxShadow: 8,
    color: '#fff',
    display: 'flex',
    fontSize: '1.25rem',
    justifyContent: 'center',
    left: '0.75rem',
    lineHeight: 1,
    padding: '0.25rem',
    position: 'absolute',
    top: '-0.5rem',
  },
  statImage: {
    margin: '0 auto 0.5rem',
    maxWidth: '48px',
  },
  statLabelBox: {
    backgroundColor: 'var(--accent-color)',
    borderRadius: '0 0.5rem 0 0',
    color: '#fff',
    fontWeight: 300,
    fontSize: '1rem',
    letterSpacing: '0.05em',
    padding: '0.25rem 0.5rem',
    position: 'absolute',
    right: 0,
    textTransform: 'uppercase',
    top: 0,
  },
  statValue: {
    color: '#000',
    fontSize: '1.25rem',
    marginTop: '1.5rem',
  },
};

export default styles;
