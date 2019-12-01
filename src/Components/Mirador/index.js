import React, { Component } from 'react';
import mirador from "mirador";
import PropTypes from 'prop-types';
import nextId from "react-id-generator";

import './style.scss';


/**
* Mirador viewer component.
*/
export default class Mirador extends Component {
  static propTypes = {
    /** Configuration options for the viewer */
    config: PropTypes.object,
    /** Specifiy any additional plugins to render */
    plugins: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    config: {},
    plugins: [],
  };

  htmlId = nextId("story-mirador");

  componentDidMount() {
    const { config, plugins } = this.props;
    config.id = this.htmlId;
    mirador.viewer(config, plugins);
  };

  render() {
    return <div id={this.htmlId} className="story-mirador" />;
  };
}
