import React, { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import MomentBase from '../Base';
import './style.scss';

/**
 * General SlideScroll card layout Moment.
 */
export default class SlideScrollMoment extends Component {
  static propTypes = {
    /** Children nodes used to fill the cards */
    // children: PropTypes.node.isRequired,
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,
    /** The source of the iFrame to render in the `Moment`'s body. */
    url: PropTypes.string.isRequired,

  }
  static defaultProps = {
    type: "slide_scroll",
  }

  render() {
    const layout="slide_scroll"; // TODO: Add constant
    const { children } = this.props;
    return (
      <MomentBase {...this.props} layout={layout}>
      <div className="slide-scroll-wrapper">
        <Draggable axis="x">
          <div className="slide-scroller-container">
            {
              React.Children.map(children, card => (
                <div className="slide-scroller-card --effect-grow">
                  {card}
                </div>
              ))
            }
          </div>
        </Draggable>
        </div>
      </MomentBase>
    )
  }
}
