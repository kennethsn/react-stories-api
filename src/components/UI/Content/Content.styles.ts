const styles = {
  bulletedListBlock: {
    display: 'block',
    my: 0.5,
    pl: 3,
    '& li': {
      listStyleType: 'disc',
      mb: 0.25,
    },
  },
  buttonBlock: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    p: 2,
  },
  imageBlock: {
    display: 'block',
    maxWidth: '100%',
    my: 0.5,
  },
  numberedListBlock: {
    display: 'block',
    my: 0.5,
    pl: 3,
    '& li': {
      listStyleType: 'decimal',
      mb: 0.25,
      '&:last-child': { mb: 0 },
    },
  },
  richTextBlock: {
    '& a': {
      color: 'primary.main',
      lineHeight: 1,
      textDecoration: 'none',
      wordBreak: 'break-word',
    },
  },
  textBlock: {
    display: 'block',
    my: 0.5,

    '&.MuiTypography-finePrint': {
      lineHeight: 1.2,
    },
  },
};

export default styles;
