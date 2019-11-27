import React, { Component } from 'react';
import { Button, CssBaseline, Divider, Drawer } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardBase from '../../Card';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import SideBarMoment from '../SideBar';

import LibraryShelf from './Shelf';
import './style.scss';


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
      currentBook: {},
      sidebar: false,
    };

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
    this.handleSelectBook = this.handleSelectBook.bind(this);
  };
  handleCloseSidebar() {
    this.setState({sidebar: false});
  }

  handleSelectBook(book) {
    this.setState({currentBook: book, sidebar: true});
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

  renderSideBarContent(){
    const {
      date, description, image, instance, label, url
    } = this.state.currentBook;

    return (
      <CardBase>
        <CardHeader text={label} />
        <Divider />
        {instance && <div className="instance">{instance}</div>}
        {date && <CardPill text={date.label}/>}
        {image && <CardImage src={image} alt={`Image of ${label}`} />}
        {description && <CardSection>{description}</CardSection>}
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
        </div>
      </SideBarMoment>
    )
  }
}
