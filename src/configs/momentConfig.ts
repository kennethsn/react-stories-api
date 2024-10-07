import BaseMoment from '../components/Moments/BaseMoment/BaseMoment';
import ImageMoment from '../components/Moments/ImageMoment/ImageMoment';
import type { Icon, MomentType } from '../types';

type MomentConfig = {
  component: typeof BaseMoment;
  icon?: Icon;
};

// KSN TODO: Move the component import into moment router, then make this just a config
const MomentConfigMap: Record<MomentType, MomentConfig> = {
  base: {
    component: BaseMoment,
  },
  image: {
    component: ImageMoment,
    icon: { name: 'image', type: 'mui' },
  },
};

export default MomentConfigMap;
