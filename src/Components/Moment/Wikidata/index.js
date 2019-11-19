import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImageIcon from '../../Icon/Image';
import Pipe from '../../Pipe';
import IFrameMoment from '../IFrame';
import './style.scss';

/**
 * Wikidata layout Moment.

 * *note: You must either use an ``entity_id`` or ``url`` prop.*
 */
export default class WikidataMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Wikidata Entity Identifier */
    entity_id: PropTypes.string,
    /** `Icon` to place in the `Moment`'s header */
    icon: PropTypes.element.isRequired,
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The full URL of the Wikidata entity. */
    url: PropTypes.string,

  }
  static defaultProps = {
    icon: <ImageIcon name="Wikidata Logo"  url="https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg" />,
    title: "Wikidata Item"
  }

  render() {
    const type = "wikidata";
    const props = {...this.props};
    props.url = props.url || `https://m.wikidata.org/wiki/${props.entity_id}`;
    props.title = (
      <div>
        {props.icon} <Pipe type="thin"/> {props.title}
      </div>
    )
    return (
      <IFrameMoment {...props} type={type} />
    )
  }
}
