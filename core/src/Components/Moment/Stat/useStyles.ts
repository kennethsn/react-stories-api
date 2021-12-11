import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  body: {
    background: theme.palette.background.default,
    padding: theme.spacing(10),
  },
  item: {
    margin: '0 auto',
    position: 'relative',
  },
}));

export default useStyles;
