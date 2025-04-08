const styles = {
  icon: {
    color: 'primary.main',
    fontSize: '45rem',
    left: '-5rem',
    maxWidth: '90vw',
    opacity: 0.05,
    position: 'absolute',
    top: '-5rem',
  },
  progress: {
    display: 'flex',
    justifySelf: 'center',
  },
  root: (isFullscreen?: boolean) => ({
    alignContent: 'center',
    bgcolor: 'background.lightGrey',
    flexDirection: 'column',
    height: isFullscreen ? '100vh' : '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    width: isFullscreen ? '100vw' : '100%',
  }),
};

export default styles;
