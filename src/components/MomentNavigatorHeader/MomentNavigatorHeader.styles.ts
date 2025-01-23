const styles = {
  description: {
    display: 'inline',
    lineHeight: 1,
  },
  divider: {
    mx: -1,
    my: 0.5,
  },
  labelContainer: (hasBranding: boolean) => ({
    p: 2,
    pt: hasBranding ? 0 : 2,
  }),
};

export default styles;
