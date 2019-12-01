import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MiradorMoment from '../Mirador';

import './style.scss';


/**
 * IIIFManifestMoment layout Moment.
 */
export default class IIIFManifestMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Configurations to pass through to the `Mirador` component. */
    config: PropTypes.object,
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
    color: {
      background: "gray",
      text: "white"
    },
    type: "mirador",
  }

  render() {
    const { provider, url } = this.props;

    const config = {
      manifests: {},
      windows: [{manifestId: url}],
    };
    config.manifests[url] = { provider };

    return (
      <MiradorMoment {...this.props} config={config} />
    )
  }
}
