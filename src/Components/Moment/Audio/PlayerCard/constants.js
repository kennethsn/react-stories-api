import { createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const muiTheme = createMuiTheme({});

export const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    minHeight: '60vh'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: "0 auto",
    padding: 35
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: "35%",
    flexGrow: 1,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
