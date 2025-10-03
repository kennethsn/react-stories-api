const styles = {
  description: {
    display: 'inline-block',
    lineHeight: 1.4,
  },
  divider: {
    mx: -1,
    my: 0.5,
  },
  label: {
    lineHeight: 1.2,
  },
  labelContainer: (hasBranding: boolean) => ({
    p: 2,
    pt: hasBranding ? 0 : 2,
  }),
};

export default styles;
