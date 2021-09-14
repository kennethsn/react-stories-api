import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  actions: {
    background: theme.palette.text.secondary,
    padding: theme.spacing(2),
  },
  body: {
    background: theme.palette.background.default,
    padding: theme.spacing(10),
  },
  item: {
    margin: '0 auto',
  },
  label: (props: { color: { background: string; }; }) => ({
    color: props.color.background,
    textDecoration: 'none',
  }),
  content: {
    textAlign: 'left',
    wordBreak: 'break-word',
  },
  button: (props: { color: { background: string; }; }) => ({
    color: props.color.background,
    borderColor: props.color.background,
    margin: 'auto',
  }),
}));

export default useStyles;
