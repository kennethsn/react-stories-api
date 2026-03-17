const styles = {
  actionsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mt: 0.5,
  },
  badge: {
    mx: 0,
    px: 1,
    py: 0.5,
  },
  badgeText: {
    fontSize: 'inherit',
    lineHeight: 1,
    mx: 0,
    p: 0,
  },
  description: {
    display: 'inline-block',
    lineHeight: 1.4,
  },
  divider: {
    mx: -1,
    my: 0.5,
  },
  label: {
    display: 'inline',
    lineHeight: 1.2,
    mr: 0.5,
  },
  labelContainer: (hasBranding: boolean) => ({
    p: 2,
    pt: hasBranding ? 0 : 2,
  }),
  storyId: {
    display: 'inline-block',
  },
};

export default styles;
