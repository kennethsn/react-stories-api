import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '75%',
    marginTop: 10,
    zIndex: 1,
  },
  galleryImage: {
    maxWidth: 300,
  },
  momentBody: {
    background: theme.palette.grey[200],
  },
  sideBar: {
    maxWidth: 500,
    width: '40%',
  },
}));

export default useStyles;
