import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Story } from '../../../types';

interface Props {
  story: Story;
  urlFormatter: string;
}

const CollectionCard = ({ story, urlFormatter }: Props) => {
  const {
    description,
    id,
    image,
    label,
  } = story;
  const url = urlFormatter.replace('$id', id);

  return (
    <Card>
      {image && (
        <CardMedia
          component="img"
          image={image}
          title={label}
        />
      )}
      <CardContent>
        <Typography variant="h5">
          {label}
        </Typography>
        <Typography
          color="secondary"
          variant="overline"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          justifyContent="space-between"
        >
          <Grid item>
            <Button
              color="primary"
              href={url}
              size="small"
            >
              Learn More
            </Button>
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              variant="overline"
            >
              {id}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
