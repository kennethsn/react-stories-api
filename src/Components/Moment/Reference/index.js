import React from 'react';
import { Button, Card, CardActions, CardMedia, CardContent, makeStyles, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import GridListMoment from '../GridList';


const useStyles = makeStyles(theme => ({
  body: {
    background: theme.palette.background.default,
    padding: theme.spacing(10),
  },
  container: {
  },
  actions: {
    padding: theme.spacing(2),
    background: theme.palette.text.secondary,
  },
  label: props => ({
    color: props.color.background,
    textDecoration: "none",
  }),
  content: {
    textAlign: "left",
    wordBreak: "break-word",
  },
  button: props => ({
    color: props.color.background,
    borderColor: props.color.background,
    margin: "auto",
  }),
}));


/**
*  Moment for listing External Resources.
*/
function ReferenceMoment(props) {
  const { data } = props;
  const classes = useStyles(props);
  return (
    <GridListMoment
      bodyClassName={classes.body}
      containerProps={{spacing: 5, className: classes.container}}
      {...props}
    >
      {data.map(({label, property, url, description, image }) => (
        <Grid item md={4}>
          <Card raised>
            {image && (
              <CardMedia
                component="img"
                image={image}
                title={`${property} logo`}
              />
            )}
            <CardContent className={classes.content}>
              <Typography variant="h5">
                {property}
              </Typography>
              <a href={url}  className={classes.label}
              target="_blank">
                <Typography variant="subtitle1">
                  {label}
                </Typography>
              </a>
              <Typography color="textSecondary" variant="caption">
                {description}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              {url && (
                <Button
                  className={classes.button}
                  color="primary"
                  variant="outlined"
                  size="small"
                  href={url}
                  target="_blank"
                >
                  Learn More
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </GridListMoment>
  )
};

ReferenceMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Stories-API data context. */
  data: PropTypes.object.isRequired,
  /** Determines the `GridListSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `GridListSection` text of the `Moment`. */
  label: PropTypes.string,
  /** The layout name of the `Moment` */
  layout: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

ReferenceMoment.defaultProps = {
  layout: "reference",
  type: "reference",
};

export default ReferenceMoment;
