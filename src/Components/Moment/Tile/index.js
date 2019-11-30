import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import MomentBase from '../Base';
import './style.scss';

/**
 * General Tile card layout Moment.
 */
export default class TileMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
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
    type: "tile",
  }

  render() {
    const layout="tile"; // TODO: Add constant
    const { children } = this.props;
    const masonryOptions = {
      fitWidth: true,
      columnWidth: 1,
      gutter: 0,
      itemSelector: ".tile-card"
    };

    return (
      <MomentBase {...this.props} layout={layout}>
      <div className="tile-wrapper">
        <Masonry
          updateOnEachImageLoad={true}
          className={'tile-container'}
          options={masonryOptions}
        >
          {React.Children.map(children, card => (
             <div className="tile-card">{card}</div>
          ))}
        </Masonry>
        </div>
      </MomentBase>
    )
  }
}
