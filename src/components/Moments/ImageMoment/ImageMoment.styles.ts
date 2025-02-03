import type { SxProps } from '@mui/material';

import ImageMomentStore from '../../../state/moments/imageMomentStore';

const styles = {
  image: (moment: ImageMomentStore): SxProps => ({
    display: 'block',
    filter: moment.fitIsCard ? 'drop-shadow(0px 0px 6px rgba(50, 50, 50, 0.6))' : undefined,
    height: (moment.fitIsCover || moment.fitIsCard) ? '100%' : 'auto',
    maxWidth: moment.fitIsCard ? undefined : '100%',
    maxHeight: moment.fitIsCard ? undefined : '100%',
    mx: 'auto',
    objectFit: moment.fitIsCover ? 'cover' : 'contain',
    objectPosition: moment.position,
    width: '100%',
  }),
};

export default styles;
