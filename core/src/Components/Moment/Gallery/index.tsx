import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import TileMoment from '../Tile';
import './style.scss';

export interface GalleryMomentProps extends MomentProps {
  children: ReactNode;
}

/**
 * Gallery card layout Moment.
 */
const GalleryMoment = (props: GalleryMomentProps) => {
  const { children } = props; // Should be instances of GalleryImage
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TileMoment {...props}>
      {children}
    </TileMoment>
  );
};

GalleryMoment.propTypes = {
  /** Children nodes used to fill the cards */
  children: PropTypes.node.isRequired,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
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

GalleryMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Tile,
  type: MomentType.Gallery,
};

export default GalleryMoment;
