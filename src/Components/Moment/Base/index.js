import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classList } from '../../../utils';
import CardBase from '../../Card';

import './style.scss';

/**
 * The Base `Moment` that all other `Moment`s derive from.
 */
export default class MomentBase extends Component {
  static propTypes = {
    /** Determines the body className. */
    bodyClassName: PropTypes.string,
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
    /** Determines the structural styling of the `Moment`. */
    layout: PropTypes.string,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,
  }
  static defaultProps = {
    bodyClassName: "",
    color: {
      background: "gray",
      text: "white"
    },
    layout: "base",
    type: "base",
  }

  render() {
    const {
      bodyClassName, children, color, index, layout, subtitle, title, type
    } = this.props;
    const classes = classList(
      'story-moment',
      `story-moment-layout-${layout}`,
      `story-moment-${type}`
    );
    return (
      <div className={classes} id="story-moment{index}">
        <CardBase>
          <div className="story-moment__content">
            <div className="story-moment__content__header"
                 style={{background: color.background, color:color.text}}>
              <div className="story-moment__content__header__title">
                {title}
              </div>
              <div className="story-moment__content__header__subtitle">
                {subtitle}
              </div>
            </div>
            <div className={"story-moment__content__body "+ bodyClassName}>
              {children}
            </div>
          </div>
        </CardBase>
      </div>
    )
  }
}
