import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import Mirador, { MiradorConfig } from '../../Mirador';
import MomentBase from '../Base';
import './style.scss';

export interface MiradorMomentProps extends MomentProps {
  config?: MiradorConfig;
}

/**
 * Mirador layout Moment.
 */
const MiradorMoment = (props: MiradorMomentProps) => {
  const { config } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MomentBase {...props}>
      <Mirador config={config} />
    </MomentBase>
  );
};

MiradorMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Configurations to pass through to the `Mirador` component. */
  // eslint-disable-next-line react/forbid-prop-types
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
};

MiradorMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  color: {
    background: 'gray',
    text: 'white',
  },
  config: undefined,
  layout: MomentLayout.Mirador,
  type: MomentType.Mirador,
};

export default MiradorMoment;
