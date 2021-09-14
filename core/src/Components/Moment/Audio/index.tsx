import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';
import AudioPlayerCard, { AudioPlayerCardProps } from './PlayerCard';
import './style.scss';

export interface AudioMomentProps extends MomentProps {
  data: AudioPlayerCardProps;
}

/**
 * General Audio layout Moment.
 */
const AudioMoment = (props: AudioMomentProps) => {
  const { data } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase {...props}>
      <AudioPlayerCard {...data} />
    </MomentBase>
  );
};

AudioMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Information to build the `AudioPlayerCard` */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
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

AudioMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Audio,
  type: MomentType.Audio,
};

export default AudioMoment;
