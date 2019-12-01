import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types'

import GalleryMoment from '../Gallery';
import GalleryImage from '../Gallery/Image';

import './style.scss';

/**
 * Moment to display entities that are named after the `Story`'s subject'.
 */
export default class NamedAfterMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Information to build the `GalleryImage`s */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    type: "named_after",
  }

  renderImages(){
    const { color, data } = this.props;
    return data.map(({ description, image, fallback, label, website }) => (
      <GalleryImage
        color={color}
        label={label}
        noImage={image ? false : true}
        src={image || fallback}
        style={{maxWidth: 300}}
        content={(
          <div className="named-after-item-content">
            {description && (
              <div className="named-after-item-content__description">
                {description}
              </div>
            )}
            {website && (
              <Button
                className="named-after-item-content__button"
                style={{background: color.background, color: color.text}}
                target="_blank"
                href={website}
                variant="contained"
              >
                Learn More
              </Button>
            )}
          </div>
        )}
      />
    ))
  }

  render() {
    return (
      <GalleryMoment
        {...this.props}
      >
        {this.renderImages()}
      </GalleryMoment>
    )
  }
}
