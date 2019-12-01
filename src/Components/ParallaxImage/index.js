import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Parallax } from 'react-parallax';

import './style.scss';

const insideStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};


/**
 * General Parallax image.
 */
export default class ParallaxImage extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.string,
    /** Destination URL of the image file. */
    src: PropTypes.string,
  }
  static defaultProps = {
    color: null,
  }

  render() {
    const { children, color, src } = this.props;

    return (
      <Parallax
        bgImage={src}
        strength={200}
        renderLayer={percentage => (
          <div
            style={{
              position: "absolute",
              background: color,
              opacity: `${1 - percentage}`,
              filter: `grayscale(${1 - percentage})`,
              width:"100%",
              height: "100%"
            }}
          />
        )}
      >
      <div style={{ height: 500 }}>
        <div style={insideStyles}>
          {children}
        </div>
      </div>

      </Parallax>
    )
  }
}
