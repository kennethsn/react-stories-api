import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { ChangeEventHandler, FormEventHandler } from 'react';
import ReactPaginate from 'react-paginate';

import { STORIES_API_HOMEPAGE } from '../../constants';
import { Story } from '../../types';
import CollectionCard from './CollectionCard';
import useStyles from './useStyles';

interface Props {
  count: number;
  description: string;
  loading: boolean;
  name: string;
  onPageChange?: (selectedItem: { selected: number }) => void;
  onSearchInput?: ChangeEventHandler;
  onSearch?: FormEventHandler;
  page: number;
  pageCount: number;
  q?: string;
  search?: string;
  stories: Story[];
  urlFormatter: string;
}

/**
* Collection component.
*/
const Collection = ({
  count,
  description,
  loading,
  name,
  onSearch,
  onSearchInput,
  search,
  stories,
  onPageChange,
  page,
  pageCount,
  q,
  urlFormatter = '$id',
}: Props) => {
  const classes = useStyles();
  const storiesCountLabel = `${count} Stor${count === 1 ? 'y' : 'ies'} in this Collection`;
  const renderCard = (story: Story, index: number) => {
    const key = `${index}-${story.id}`;
    return (
      <Grid
        item
        key={key}
        md={4}
        sm={10}
        xl={3}
        xs={12}
      >
        <CollectionCard
          story={story}
          urlFormatter={urlFormatter}
        />
      </Grid>
    );
  };

  const renderPagination = () => (
    <ReactPaginate
      activeClassName={classes.active}
      breakClassName="break-me"
      breakLabel="..."
      containerClassName={classes.paginator}
      initialPage={page - 1}
      marginPagesDisplayed={2}
      nextLabel="next"
      onPageChange={onPageChange}
      pageClassName="stories-collection-page"
      pageCount={pageCount}
      pageRangeDisplayed={5}
      previousLabel="previous"
    />
  );

  return (
    <Grid
      container
      justifyContent="center"
    >
      <Grid
        className={classes.section}
        item
        xs={10}
      >
        <Typography
          color="primary"
          variant="h2"
        >
          {name}
        </Typography>
        {description && (
          <Typography
            color="textSecondary"
            variant="h6"
          >
            {description}
          </Typography>
        )}
        {count ? (
          <Typography
            color="textSecondary"
            variant="overline"
          >
            {storiesCountLabel}
            {q && `found with keyword '${q}'`}
          </Typography>
        ) : null}
      </Grid>
      {onSearch && (
        <Grid
          className={classes.section}
          item
          xs={12}
        >
          <form onSubmit={onSearch}>
            <TextField
              className={classes.searchField}
              label="Search Collection..."
              onChange={onSearchInput}
              value={search}
            />
          </form>
        </Grid>
      )}
      <Grid
        item
        xs={12}
      >
        <Divider />
        {loading && <LinearProgress variant="query" />}
      </Grid>
      <Grid
        className={classes.section}
        item
        xs={10}
      >
        <Grid
          container
          justifyContent="center"
          spacing={3}
        >
          {loading || stories.length ? stories.map(renderCard) : (
            <Typography variant="overline">
              No More Stories Found in this Collection.
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid
        className={classes.section}
        item
        xs={8}
      >
        {pageCount > 1 && renderPagination()}
      </Grid>
      <Grid
        className={classes.section}
        item
        xs={8}
      >
        <Button
          className={classes.link}
          color="secondary"
          href={STORIES_API_HOMEPAGE}
          size="small"
          target="_blank"
        >
          POWERED BY THE STORIES SERVICE
        </Button>
      </Grid>
    </Grid>
  );
};

Collection.defaultProps = {
  onPageChange: undefined,
  onSearch: undefined,
  onSearchInput: undefined,
  q: undefined,
  search: undefined,
};

export default Collection;
