import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import GridListMoment from '../GridList';
import useStyles from './useStyles';

export interface Reference {
  label: string;
  property?: string;
  url?: string;
  description?: string;
  image?: string;
}

export interface ReferenceMomentProps extends MomentProps {
  data: Reference[];
}

/**
*  Moment for listing External Resources.
*/
const ReferenceMoment = (props: ReferenceMomentProps) => {
  const { data } = props;
  const classes = useStyles(props);
  const key = (label: string, property?: string, index?: number) => `${label}-${property}-${index}`;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <GridListMoment
      {...props}
      bodyClassName={classes.body}
      containerProps={{ spacing: 5 }}
    >
      {data.map(({
        description,
        image,
        label,
        property,
        url,
      }, index) => (
        <Grid
          className={classes.item}
          item
          key={key(label, property, index)}
          lg={4}
          md={5}
        >
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
              <a
                className={classes.label}
                href={url}
                rel="noreferrer"
                target="_blank"
              >
                <Typography variant="subtitle1">
                  {label}
                </Typography>
              </a>
              <Typography
                color="textSecondary"
                variant="caption"
              >
                {description}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              {url && (
                <Button
                  className={classes.button}
                  color="primary"
                  href={url}
                  size="small"
                  target="_blank"
                  variant="outlined"
                >
                  Learn More
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </GridListMoment>
  );
};

ReferenceMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Stories-API data context. */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Reference,
  type: MomentType.Reference,
};

export default ReferenceMoment;
