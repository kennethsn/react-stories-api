import React, { Component } from 'react';
import {
  Button, Card, CardActions, CardContent, Divider, Grid, makeStyles, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: theme.spacing(5),
  },
  paginator: {
    color: theme.palette.text.secondary,
    display: "flex",
    "& li": {
      display: "inline-block",
      flex: 1,
      margin: theme.spacing(2),

      " & a": {
        cursor: "pointer"
      }
    },
    width: "100%"
  },
  page: {

  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
}));

 /**
  * Collection component.
  */
export default function Collection(props) {
  const {
    count, name, stories, onPageChange, page, urlFormatter="$id"
  } = props;

  const classes = useStyles();
  const renderCard = (storyData) => {
    const { description, id, label } = storyData;
    const url = urlFormatter.replace('$id', id);

    return (
      <Card style={{padding: 5}}>
        <CardContent>
          <Typography variant="h5">
            {label}
          </Typography>
          <Typography color="secondary" variant="overline">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
        <Grid container justify="space-between">
          <Grid item>
            <Button color="primary" size="small" href={url}>Learn More</Button>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="overline">
              {id}
            </Typography>
          </Grid>
          </Grid>
        </CardActions>
      </Card>
    )
  };

  const renderPagination = () => (
    <ReactPaginate
      previousLabel='previous'
      nextLabel='next'
      breakLabel='...'
      breakClassName='break-me'
      pageCount={Math.ceil(count/100)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      initialPage={page-1}
      onPageChange={onPageChange}
      containerClassName={classes.paginator}
      pageClassName={classes.page}
      activeClassName={classes.active}
    />
  );

  return (
    <Grid container justify="center">
      <Grid item xs={10} className={classes.section}>
        <Typography variant="h2" color="primary">
          {name}
        </Typography>
        {count && (
          <Typography variant="overline" color="textSecondary">
            {count} Stor{count === 1 ? "y" : "ies"} in this Collection
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={10} className={classes.section}>
        <Grid container justify="center" spacing={3}>
          {stories.map(story => (
            <Grid item xs={12} sm={10} md={4} xl={3}>
              {renderCard(story)}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={8} className={classes.section}>
        {count && renderPagination()}
      </Grid>
    </Grid>
  );
}
