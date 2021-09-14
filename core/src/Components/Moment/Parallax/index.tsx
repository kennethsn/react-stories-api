import PropTypes from 'prop-types';
import React from 'react';

import { MomentProps } from '../../../types';
import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import MomentBase from '../Base';
import './style.scss';

export interface ParallaxMomentProps extends MomentProps {
}

/**
 * General Parallax image layout Moment.
 */
const ParallaxMoment = (props: ParallaxMomentProps) => {
  const { children } = props; // Should be instances of ParallaxImage
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase
      {...props}
      layout={MomentLayout.Parallax}
    >
      {children}
    </MomentBase>
  );
};

ParallaxMoment.propTypes = {
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
};

ParallaxMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  type: MomentType.Parallax,
};

export default ParallaxMoment;
