const styles = {
  imageBlock: {
    display: 'block',
    maxWidth: '100%',
    my: 0.5,
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
