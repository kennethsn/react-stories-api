import { makeStyles } from '@material-ui/core/styles';

import { MomentProps } from '../../../types';

const useStyles = makeStyles((theme) => ({
  appBar: ({ color }: MomentProps) => ({
    background: color.background,
    color: color.text,
    zIndex: 3000, // Watch out for Map Moment's SideBar
  }),
  body: {
    height: '100%',
    overflowY: 'scroll',
    padding: 0,
    maxWidth: '100%',
  },
  bufferToolbar: {
    opacity: 0,
    width: '100%',
  },
  container: {
    backfaceVisibility: 'hidden',
    backgroundSize: 'auto 80%',
    backgroundPosition: '50% 0%',
    height: '100%',
    maxWidth: '100%',
    padding: 0,
    textAlign: 'center',
    transform: 'translate3d(0, 0, 0)',
    width: '100%',
  },
  content: {
    width: '100%',
  },
  gutter: {
    padding: theme.spacing(4),
  },
  headerText: {
    width: '100%',
  },
}));

export default useStyles;
