import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingBottom: '40vh',
    paddingTop: theme.spacing(4),
    '& .story-timeline__element .vertical-timeline-element-content': {
      padding: 0,
      '&:after': {
        content: 'unset',
      },
    },
  },
}));

export default useStyles;
