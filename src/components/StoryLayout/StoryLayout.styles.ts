const styles = {
  root: (isFullscreen: boolean) => ({
    height: isFullscreen ? '100vh' : '100%',
    width: isFullscreen ? '100vw' : '100%',

    '.moment-navigator-panel': {
      boxShadow: 2,
      zIndex: 3,
    },

    '.story-layout-panel-group': {
      height: '100%',
      width: '100%',
    },
  }),
};

export default styles;
