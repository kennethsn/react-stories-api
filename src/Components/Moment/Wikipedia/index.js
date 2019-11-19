import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImageIcon from '../../Icon/Image';
import Pipe from '../../Pipe';
import IFrameMoment from '../IFrame';
import './style.scss';

/**
 * Wikipedia layout Moment.
 */
export default class WikipediaMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** `Icon` to place in the `Moment`'s header */
    icon: PropTypes.element.isRequired,
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Wikidata Entity Identifier */
    entity_id: PropTypes.string,
    /** The type of `Moment` */
    url: PropTypes.string,
  }
  static defaultProps = {
    icon: <ImageIcon name="Wikipedia Logo"  url="https://upload.wikimedia.org/wikipedia/commons/b/b3/Wikipedia-logo-v2-en.svg" />
  };

  render() {
    const props = {...this.props};
    props.title = (
      <div>
        {props.icon} <Pipe type="thin"/> {props.title}
      </div>
    )
    return (
      <IFrameMoment {...props} type="wikipedia" />
    )
  }
}
