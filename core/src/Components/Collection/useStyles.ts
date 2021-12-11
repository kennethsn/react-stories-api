import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  link: {
    ...theme.typography.caption,
    margin: '0 auto',
    textAlign: 'center',
  },
  paginator: {
    color: theme.palette.text.secondary,
    display: 'flex',
    '& li': {
      display: 'inline-block',
      flex: 1,
      margin: theme.spacing(2),
      ' & a': {
        cursor: 'pointer',
      },
    },
    overflowX: 'scroll',
    padding: 0,
    width: '100%',
  },
  searchField: {
    width: '85%',
  },
  section: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
}));

export default useStyles;
