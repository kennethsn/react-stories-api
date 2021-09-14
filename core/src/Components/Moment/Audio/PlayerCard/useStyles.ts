import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    minHeight: '60vh',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  cover: {
    flexGrow: 1,
    minWidth: '35%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    padding: 35,
  },
}));

export default useStyles;
