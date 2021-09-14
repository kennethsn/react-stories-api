import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  image: {
    filter: 'grayscale(100%)',
    opacity: 0.6,
    textAlign: 'center',
    transition: 'all 2s',
    '&:hover': {
      filter: 'grayscale(10%)',
    },
  },
  link: {
    fontSize: 9,
    textAlign: 'center',
  },
  logoContainer: {
    padding: theme.spacing(3),
  },
  sideBar: {
    background: theme.palette.background.default,
    boxShadow: theme.shadows[3],
    overflowY: 'scroll',
  },
  title: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    textAlign: 'center',
  },
}));

export default useStyles;
