import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sideBar: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  dialog: {
    minWidth: '80vw',
    maxWidth: '95vw',
  },
  library: {
    background: theme.palette.background.paper,
    paddingBottom: theme.spacing(5),
    minHeight: '100%',
  },
  mirador: {
    height: '80vh !important',
  },
}));

export default useStyles;
