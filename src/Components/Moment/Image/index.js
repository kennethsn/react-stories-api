import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classList } from '../../../utils';
import CardDetail from '../../Card/Detail';
import CardImage from '../../Card/Image';
import MomentBase from '../Base';

import './style.scss';


/**
 * General Image layout Moment.
 */
export default class ImageMoment extends Component {
  static propTypes = {
    /** Information to accompany the `Image`. */
    caption: PropTypes.any,
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    direction: PropTypes.oneOf(['row', 'column']),
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
    /** The source of the Image to render in the `Moment`'s body. */
    url: PropTypes.string.isRequired,
  }

  static defaultProps = {
    direction: "row",
    type: "image",
  }

  render() {
    const { caption, direction, url } = this.props;

    const layout = "image";
    const containerClasses = classList(
      "moment-image-container",
      `moment-image-container-${direction}`
    )

    return (
      <MomentBase {...this.props} layout={layout}>
        <div className={containerClasses}>
          <div className="moment-image-container__image">
            <CardImage src={url} />
          </div>
          {caption && (
            <div className="moment-image-container__caption">
              <CardDetail>{caption}</CardDetail>
            </div>
          )}
        </div>
      </MomentBase>
    )
  }
}
