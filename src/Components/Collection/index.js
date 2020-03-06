import React, { Component } from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Divider, Grid,
  LinearProgress, makeStyles, TextField, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { STORIES_API_HOMEPAGE } from '../../constants';

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: theme.spacing(5),
    textAlign: "center"
  },
  paginator: {
    padding: 0,
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
  },
  link: {
    ...theme.typography.caption,
    textAlign: "center",
    margin: "0 auto",
  },
  searchField: {
    width: "85%"
  }
}));

 /**
  * Collection component.
  */
export default function Collection(props) {
  const {
    count, description, loading, name, onSearch, onSearchInput, search, stories,
    onPageChange, page, urlFormatter="$id"
  } = props;

  const classes = useStyles();
  const renderCard = (storyData) => {
    const { description, id, image, label } = storyData;
    const url = urlFormatter.replace('$id', id);

    return (
      <Card>
        {image && (
          <CardMedia
            component="img"
            image={image}
            title={`image of ${label}`}
          />
        )}
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
        {description && (
          <Typography variant="h6" color="textSecondary">
            {description}
          </Typography>
        )}
        {count && (
          <Typography variant="overline" color="textSecondary">
            {count} Stor{count === 1 ? "y" : "ies"} in this Collection
          </Typography>
        )}
      </Grid>
      {onSearch && (
        <Grid item xs={12} className={classes.section}>
          <form onSubmit={onSearch}>
            <TextField
              className={classes.searchField}
              label="Search Collection..."
              value={search}
              onChange={onSearchInput}
            />
          </form>
        </Grid>
      )}
      <Grid item xs={12}>
        <Divider />
        { loading && <LinearProgress variant="query" />}
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
      <Grid item xs={8} className={classes.section}>
          <Button
            target="_blank"
            color="secondary"
            size="small"
            className={classes.link}
            href={STORIES_API_HOMEPAGE}
          >
            POWERED BY THE STORIES SERVICE
          </Button>
      </Grid>

    </Grid>
  );
}
