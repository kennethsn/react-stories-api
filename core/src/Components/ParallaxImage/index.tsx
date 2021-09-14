import PropTypes from 'prop-types';
import React, { CSSProperties, ReactNode } from 'react';
import { Parallax } from 'react-parallax';

import './style.scss';

interface Props {
  children?: ReactNode;
  color?: string;
  src?: string;
}

const insideStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
} as CSSProperties;

/**
 * General Parallax image.
 */
const ParallaxImage = ({ children, color, src }: Props) => (
  <Parallax
    bgImage={src}
    strength={200}
    renderLayer={(percentage: number) => (
      <div
        style={{
          background: color,
          filter: `grayscale(${1 - percentage})`,
          height: '100%',
          opacity: `${1 - percentage}`,
          position: 'absolute',
          width: '100%',
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
);

ParallaxImage.propTypes = {
  /** Determines the overlay `Image` */
  children: PropTypes.element,
  /** Determines the background overlay color of the `Image` */
  color: PropTypes.string,
  /** Destination URL of the image file. */
  src: PropTypes.string,
};

ParallaxImage.defaultProps = {
  children: undefined,
  color: undefined,
  src: undefined,
};

export default ParallaxImage;
