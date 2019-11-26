import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MomentBase from '../Base';

import LibraryShelf from './Shelf';
import LibrarySideBar from './SideBar';
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

  handleSelectBook(book) {
    this.setState({currentBook: book, sidebar: true});
  };

  handleCloseSidebar() {
    this.setState({sidebar: false});
  }

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


  render() {
    const { handleSelectBook } = this;
    const { data } = this.props;
    const { currentBook, sidebar } = this.state;
    const layout="library"; // TODO: Add constant

    return (
      <MomentBase {...this.props} layout={layout}>
        <LibrarySideBar
          currentBook={currentBook}
          open={sidebar}
          onClose={this.handleCloseSidebar}
        >
          <div className="library-wrapper">
            {this.renderShelves()}
          </div>
        </LibrarySideBar>
      </MomentBase>
    )
  }
}
