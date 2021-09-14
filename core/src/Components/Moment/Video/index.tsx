import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';
import './style.scss';

export interface VideoMomentProps extends MomentProps {
  captions?: string;
  url: string;
  video?: object;
}

/**
 * General Video layout Moment.
 */
const VideoMoment = (props: VideoMomentProps) => {
  const { captions, url, video } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase {...props}>
      <video
        controls
        width="100%"
      >
        <source
          src={url}
          {...video}
        />
        <track
          kind="captions"
          src={captions}
        />
        Your browser does not support the video tag.
      </video>
    </MomentBase>
  );
};

VideoMoment.propTypes = {
  /** URL to retrieve captions for the Video. */
  captions: PropTypes.string,
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
  /** The source of the Video to render in the `Moment`'s body. */
  url: PropTypes.string.isRequired,
  /** Props to pass through to the Video component */
  // eslint-disable-next-line react/forbid-prop-types
  video: PropTypes.object,
};

VideoMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Video,
  type: MomentType.Video,
  video: {},
};

export default VideoMoment;
