import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.common.white,
    opacity: 0.45,
  },
  margin: {
    height: theme.spacing(3),
  },
  sideBarAward: {
    padding: theme.spacing(8),
  },
  sideBarBody: {
    background: theme.palette.background.paper,
  },
  sideBarFooter: {
    color: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  sideBarHeader: {
    fontWeight: 300,
    padding: theme.spacing(3),
  },
  sideBarImage: {
    maxHeight: '50vh',
    maxWidth: '100%',
  },
  sideBarRoot: {
    backgroundColor: theme.palette.grey[700],
    textAlign: 'center',
    minWidth: '40%',
  },
  root: {
    width: 300,
  },
}));

export default useStyles;
