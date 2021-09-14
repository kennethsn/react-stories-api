import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import Mirador from '../../Mirador';
import Transition from '../../Transition';
import SideBarMoment from '../SideBar';
import LibraryShelf, { LibraryBookItem, LibraryShelfProps } from './Shelf';
import useStyles from './useStyles';

export interface LibraryMomentProps extends MomentProps {
  data: Record<string, LibraryShelfProps>;
}

/**
* Library Moment to interactively visualize works and publications.
*/
const LibraryMoment = (props: LibraryMomentProps) => {
  const { color, data } = props;
  const classes = useStyles();
  const [currentBook, setBook] = useState(undefined as unknown as LibraryBookItem);
  const [sidebar, setSidebar] = useState(false);
  const [dialog, setDialog] = useState(false);
  const handleCloseSidebar = () => setSidebar(false);
  const handleSelectBook = (book: LibraryBookItem) => {
    setBook(book);
    setSidebar(true);
  };
  const handleOpenDialog = () => {
    handleCloseSidebar();
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
    setSidebar(true);
  };
  const renderMirador = () => {
    if (!(currentBook && currentBook.manifest_url)) return undefined;
    const { manifest_url: manifestId, provider = 'IIIF Resource' } = currentBook;
    const config = {
      manifests: {},
      windows: [{ manifestId, view: 'gallery' }],
    };
    config.manifests[manifestId] = { provider };
    return (
      <Mirador
        className={classes.mirador}
        config={config}
      />
    );
  };

  const renderDialog = () => (
    <Dialog
      className="story-library-dialog"
      classes={{ paper: classes.dialog }}
      onClose={handleCloseDialog}
      open={dialog}
      TransitionComponent={Transition}
    >
      {renderMirador()}
    </Dialog>
  );

  const renderSideBarContent = () => {
    if (!currentBook) return undefined;
    const {
      date,
      description,
      image,
      instance,
      label,
      manifest_url: manifestURL,
      url,
    } = currentBook;
    return (
      <Grid
        className={classes.sideBar}
        container
        justifyContent="center"
        spacing={5}
      >
        <Grid
          item
          xs={10}
        >
          <Typography variant="h5">
            {label}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Divider variant="middle" />
        </Grid>
        {instance && (
          <Grid
            item
            xs={10}
          >
            <Typography variant="h6">
              {instance}
            </Typography>
          </Grid>
        )}
        {date && (
          <Grid
            item
            xs={10}
          >
            <CardPill text={date.label} />
          </Grid>
        )}
        {image && (
          <Grid
            item
            xs={10}
          >
            <CardImage
              alt={label}
              src={image}
            />
          </Grid>
        )}
        {description && (
          <Grid
            item
            xs={12}
          >
            <CardSection>
              {description}
            </CardSection>
          </Grid>
        )}
        {manifestURL && (
          <Grid item xs={4}>
            <Button
              className="library-sidebar-link"
              onClick={handleOpenDialog}
              style={{ background: color.background, color: color.text }}
              variant="contained"
            >
              Look Inside
            </Button>
          </Grid>
        )}
        {url && (
          <Grid
            item
            xs={4}
          >
            <Button
              className="library-sidebar-link"
              href={url}
              target="_blank"
              variant="contained"
            >
              Learn More
            </Button>
          </Grid>
        )}
      </Grid>
    );
  };
  const shelfKey = (name: string, index: number) => `lib-shelf-${name}-${index}`;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <SideBarMoment
      {...props}
      bodyClassName={classes.library}
      onClose={handleCloseSidebar}
      sidebar={sidebar}
      sideBarContent={renderSideBarContent()}
    >
      {Object.entries(data).map(([shelfName, shelf], index) => (
        <LibraryShelf
          key={shelfKey(shelfName, index)}
          onSelect={handleSelectBook}
          {...shelf}
        />
      ))}
      {renderDialog()}
    </SideBarMoment>
  );
};

LibraryMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Stories-API data context to configure the `LibraryShelf` components. */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  /** Determines the `SideBarSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,

};

LibraryMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  data: {},
  layout: MomentLayout.Library,
  type: MomentType.Library,
};

export default LibraryMoment;
