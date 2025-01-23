import ImageMomentStore from '../../../state/moments/imageMomentStore';

const styles = {
  image: (moment: ImageMomentStore) => ({
    display: 'block',
    height: moment.fitIsCover ? '100%' : 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    mx: 'auto',
    objectFit: moment.fitIsCover ? 'cover' : 'contain',
    objectPosition: moment.position,
    width: moment.fitIsCard ? 'initial' : '100%',
  }),
};

export default styles;
