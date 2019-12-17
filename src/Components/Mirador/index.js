import React, { Component } from 'react';
import mirador from "mirador";
import PropTypes from 'prop-types';
import nextId from "react-id-generator";

import './style.scss';


// TODO: Add dynamic coloring
// TODO: Figure out Mirador theme clashing
const theme = {
  // palette: {
  //     type: 'light',
  //     primary: {
  //       main: '#556542', // Controls the color of the Add button and current window indicator
  //     },
  //     secondary: {
  //       main: '#556542', // Controls the color of Selects and FormControls
  //     },
  //     section_divider: 'rgba(0, 0, 0, 0.25)',
  //   },
};

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
    config.theme = theme;
    mirador.viewer(config, plugins);
  };

  render() {
    return (
      <div id={this.htmlId} className="story-mirador" />
    );
  };
}
