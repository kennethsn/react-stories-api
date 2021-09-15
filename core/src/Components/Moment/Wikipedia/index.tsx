import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import IFrameMoment from '../IFrame';

export interface WikipediaMomentProps extends MomentProps {
  icon?: ReactNode;
  logo?: string;
  url: string;
}

/**
 * Wikipedia layout Moment.
 */
/* eslint-disable react/jsx-props-no-spreading */
const WikipediaMoment = (props: WikipediaMomentProps) => (
  <IFrameMoment {...props} />
);

WikipediaMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** `Icon` to place in the `SideBarSection` and `Moment`'s header */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** URL for image in the title of the `Moment` header */
  logo: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
  /** The Wikipedia Article URL */
  url: PropTypes.string.isRequired,
};

WikipediaMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.IFrame,
  logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Wikipedia-logo-v2-en.svg',
  title: 'Wikipedia Article',
  type: MomentType.Wikipedia,
};

export default WikipediaMoment;
