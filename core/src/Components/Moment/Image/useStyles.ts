import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  momentBody: {
    background: theme.palette.background.default,
  },
  simple: {
    boxShadow: theme.shadows[8],
    maxHeight: '70vh',
    maxWidth: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  simpleGrid: {
    padding: theme.spacing(8),
  },
  simpleGridContainer: {
    maxHeight: '100vh',
    overflowY: 'scroll',
    paddingBottom: '30vh',
  },
}));

export default useStyles;
