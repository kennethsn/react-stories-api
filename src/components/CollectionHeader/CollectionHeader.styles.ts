import type { NullableString } from '../../types';

const styles = {
  container: (image?: NullableString) => ({
    alignItems: 'center',
    background: image && (
      `linear-gradient(160deg, #b6b6b6e6, #f5f5f5 75%), url(${image}) no-repeat center center`
    ),
    backgroundSize: 'cover',
    pb: image ? 10 : 2,
    pt: image ? 10 : 6,
    px: image ? 5 : 1,
  }),
  content: (show: boolean) => ({
    display: show ? undefined : 'none',
    alignContent: 'center',
    my: 4,
  }),
  titleColContainer: {
    alignContent: 'center',
  },
};

export default styles;
