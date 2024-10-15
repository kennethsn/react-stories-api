const styles = {
  image: (imageFitIsCard: boolean, imageFitIsCover: boolean, imagePosition: string) => ({
    display: 'block',
    height: imageFitIsCover ? '100%' : 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    mx: 'auto',
    objectFit: imageFitIsCover ? 'cover' : 'contain',
    objectPosition: imagePosition,
    width: imageFitIsCard ? 'initial' : '100%',
  }),
};

export default styles;
