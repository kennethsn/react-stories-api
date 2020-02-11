import React, { useState } from 'react';
import {
  Button, CssBaseline, Dialog, Divider, Drawer, Grid, makeStyles, Slide,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import Mirador from '../../Mirador';
import SideBarMoment from '../SideBar';

import LibraryShelf from './Shelf';


const useStyles = makeStyles(theme => ({
  sideBar: {
    textAlign: "center",
    marginTop: theme.spacing(5),
  },
  dialog: {
      minWidth: "80vw",
      maxWidth: "95vw",
  },
  library: {
    background: theme.palette.background.paper,
    maxHeight: "100vh",
    overflowY: "scroll",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
  },
  mirador: {
    height: "80vh !important",
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
* Library Moment to interactively visualize works and publications.
*/
function LibraryMoment(props) {
  const { color, data } = props;
  const classes = useStyles();
  const [currentBook, setBook] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [dialog, setDialog] = useState(false);

  const handleCloseSidebar = () => {
    setSidebar(false);
  }

  const handleSelectBook = (book) => {
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

  const renderShelves = () => {
    const shelves = [];
    Object.entries(data).forEach(([key, value]) => {
      shelves.push(
        <LibraryShelf onSelect={handleSelectBook} {...value} />
      )
    });
    return shelves;
  };

  const renderMirador = () => {
    if (!(currentBook && currentBook.manifest_url)) return null;

    const { manifest_url, provider="IIIF Resource" } = currentBook;
    const config = {
      manifests: {},
      windows: [{manifestId: manifest_url, "view": "gallery"}],
    };
    config.manifests[manifest_url] = { provider };
    return <Mirador className={classes.mirador} config={config} />;
  };

  const renderDialog = () => {
    return (
      <Dialog
        className="story-library-dialog"
        open={dialog}
        TransitionComponent={Transition}
        onClose={handleCloseDialog}
        classes={{paper:classes.dialog}}
      >
        {renderMirador()}
      </Dialog>
    );
  };

  const renderSideBarContent = () => {
    if (!currentBook) return null;

    const {
      date, description, image, instance, label, manifest_url, url
    } = currentBook;

    return (
      <Grid container spacing={5} justify="center" className={classes.sideBar}>
        <Grid item xs={10}>
          <Typography variant="h5">
            {label}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Divider variant="middle" />
        </Grid>
        {instance && (
          <Grid item xs={10}>
            <Typography variant="h6">
              {instance}
            </Typography>
          </Grid>
        )}
        {date && (
          <Grid item xs={10}>
            <CardPill text={date.label}/>
          </Grid>
        )}
        {image && (
          <Grid item xs={10}>
            <CardImage src={image} alt={`Image of ${label}`} />
          </Grid>
        )}
        {description && (
          <Grid item xs={12}>
            <CardSection>{description}</CardSection>
          </Grid>
        )}

        {manifest_url && (
          <Grid item xs={4}>
            <Button
              className="library-sidebar-link"
              variant="contained"
              onClick={handleOpenDialog}
              style={{background: color.background, color: color.text}}
            >
              Look Inside
            </Button>
          </Grid>
        )}

        {url && (
          <Grid item xs={4}>
            <Button
              className="library-sidebar-link"
              variant="contained"
              href={url}
              target="_blank"
            >
              Learn More
            </Button>
          </Grid>
        )}
      </Grid>
    )
  };

  const layout="library"; // TODO: Add constant

  return (
    <SideBarMoment
      {...props}
      bodyClassName={classes.library}
      layout={layout}
      onClose={handleCloseSidebar}
      sidebar={sidebar}
      sideBarContent={renderSideBarContent()}
    >
      {renderShelves()}
      {renderDialog()}
    </SideBarMoment>
  )

};

LibraryMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Stories-API data context to configure the `LibraryShelf` components. */
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
  type: "library",
  data: {},
};


export default LibraryMoment;
