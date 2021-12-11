import { makeStyles } from '@material-ui/core/styles';

export interface StyleProps {
  accentColor: string;
}

const useStyles = makeStyles((theme) => ({
  actions: {
    padding: theme.spacing(2),
  },
  button: ({ accentColor }: StyleProps) => ({
    color: accentColor,
    margin: 'auto',
    textTransform: 'capitalize',
  }),
  content: {
    textAlign: 'left',
    wordBreak: 'break-word',
  },
  icon: ({ accentColor }: StyleProps) => ({
    background: accentColor,
    borderRadius: 10,
    boxShadow: theme.shadows[3],
    color: '#fff',
    fontSize: theme.typography.h5.fontSize,
    marginLeft: theme.spacing(2),
    marginTop: -theme.spacing(4),
    padding: theme.spacing(2),
    position: 'absolute',
  }),
  label: ({ accentColor }: StyleProps) => ({
    background: accentColor,
    color: 'white',
    display: 'inline-block',
    lineHeight: 1.2,
    marginLeft: 92,
    padding: theme.spacing(1),
    textDecoration: 'none',
  }),
  labelContainer: {
    marginBottom: theme.spacing(1),
    textAlign: 'right',
    width: '100%',
  },
  list: {
    maxHeight: '50vh',
    overflowY: 'scroll',
    paddingBottom: theme.spacing(2),
  },
  listAvatar: ({ accentColor }: StyleProps) => ({
    backgroundColor: accentColor,
    fontSize: theme.spacing(2),
    height: theme.spacing(3),
    width: theme.spacing(3),
  }),
  listAvatarContainer: {
    minWidth: theme.spacing(5),
    '&::after': {
      borderRight: '0.125rem solid #edeff0',
      content: '""',
      height: '100%',
      left: 11,
      opacity: 1,
      position: 'absolute',
      top: '2rem',
    },
    '&.last-item::after': {
      content: null,
      height: 0,
    },
  },
  listItem: {
    padding: 0,
    paddingBottom: theme.spacing(1),
  },
  number: ({ accentColor }: StyleProps) => ({
    color: accentColor,
    display: 'inline',
  }),
  numberContainer: {
    textAlign: 'center',
  },
  string: {
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  root: {
    marginTop: theme.spacing(4),
    padding: 0,
  },
  unit: {
    display: 'inline',
  },
}));

export default useStyles;
