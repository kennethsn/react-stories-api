import React, { Component } from 'react';
import {
  Button, CssBaseline, Dialog, Divider, Drawer, Slide
} from '@material-ui/core';
import PropTypes from 'prop-types';

import CardBase from '../../Card';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import Mirador from '../../Mirador';
import SideBarMoment from '../SideBar';

import LibraryShelf from './Shelf';
import './style.scss';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
* Library Moment to interactively visualize works and publications.
*/
export default class LibraryMoment extends Component {
  static propTypes = {
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

  }

  static defaultProps = {
    type: "library",
    data: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      currentBook: null,
      sidebar: false,
      dialog: false,
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
    this.handleSelectBook = this.handleSelectBook.bind(this);
  };

  handleCloseSidebar() {
    this.setState({sidebar: false});
  }

  handleSelectBook(book) {
    this.setState({currentBook: book, sidebar: true});
  };

  handleOpenDialog(){
    this.setState({dialog: true, sidebar: false});
  };

  handleCloseDialog(){
    this.setState({dialog: false, sidebar: true});
  };

  renderShelves() {
    const { data } = this.props;
    const shelves = [];
    Object.entries(data).forEach(([key, value]) => {
      shelves.push(
        <LibraryShelf onSelect={this.handleSelectBook} {...value} />
      )
    });
    return shelves;
  };

  renderMirador() {
    const { currentBook } = this.state;

    if (!currentBook) return null;

    const { manifest_url, provider } = currentBook;
    const config = {
      manifests: {},
      windows: [{manifestId: manifest_url, "view": "gallery"}],
    };
    config.manifests[manifest_url] = { provider };

    return <Mirador config={config} />;
  };

  renderDialog() {
    const { dialog } = this.state;

    return (
      <Dialog
        className="story-library-dialog"
        open={dialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleCloseDialog}
      >
        {this.renderMirador()}
      </Dialog>
    );
  };

  renderSideBarContent(){
    const { color } = this.props;
    const { currentBook } = this.state;

    if (!currentBook) return null;

    const {
      date, description, image, instance, label, manifest_url, url
    } = this.state.currentBook;

    return (
      <CardBase>
        <CardHeader text={label} />
        <Divider />
        {instance && <div className="instance">{instance}</div>}
        {date && <CardPill text={date.label}/>}
        {image && <CardImage src={image} alt={`Image of ${label}`} />}
        {description && <CardSection>{description}</CardSection>}

        {manifest_url && (
          <Button
            className="library-sidebar-link"
            variant="contained"
            onClick={this.handleOpenDialog}
            style={{background: color.background, color: color.text}}
          >
            Look Inside
          </Button>
        )}

        {url && (
          <Button
            className="library-sidebar-link"
            variant="contained"
            href={url}
            target="_blank"
          >
            Learn More
          </Button>
        )}

      </CardBase>
    )
  }

  render() {
    const { handleSelectBook } = this;
    const { currentBook, sidebar } = this.state;
    const layout="library"; // TODO: Add constant

    return (
      <SideBarMoment
        {...this.props}
        layout={layout}
        onClose={this.handleCloseSidebar}
        sidebar={sidebar}
        sideBarContent={this.renderSideBarContent()}
      >
        <div className="library-wrapper">
          {this.renderShelves()}
          {this.renderDialog()}
        </div>
      </SideBarMoment>
    )
  }
}
