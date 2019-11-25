import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MomentBase from '../Base';
import './style.scss';

/**
 * Embeddable PDF layout Moment.
 */
export default class PDFMoment extends Component {
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
    /** The source of the PDF to render in the `Moment`'s body. */
    url: PropTypes.string.isRequired,

  }

  static defaultProps = {
    color: {
      background: "gray",
      text: "white"
    },
    type: "pdf",
  }

  render() {
    const layout="pdf"; // TODO: Add constant
    const { url } = this.props;
    return (
      <MomentBase {...this.props} layout={layout}>
        <embed
          className="story-embed-pdf"
          src={url}
          type="application/pdf"
        />
      </MomentBase>
    )
  }
}
