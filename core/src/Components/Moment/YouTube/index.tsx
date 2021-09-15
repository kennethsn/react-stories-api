import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import FontAwesomeIcon from '../../Icon/FontAwesome';
import IFrameMoment from '../IFrame';

export interface YouTubeMomentProps extends MomentProps {
  url?: string;
  video_id?: string;
}

/**
 * YouTube layout Moment.
 */
const YouTubeMoment = (props: YouTubeMomentProps) => {
  const { url, video_id: videoId } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <IFrameMoment
      {...props}
      url={url || `https://www.youtube.com/embed/${videoId}`}
    />
  );
};

YouTubeMoment.propTypes = {
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
  /** YouTube Video Identifier */
  video_id: PropTypes.string,
  /** The full embeddable URL of the YouTube video */
  url: PropTypes.string,
};

YouTubeMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  color: undefined,
  icon: (
    <FontAwesomeIcon name="FaYoutube" />
  ),
  layout: MomentLayout.IFrame,
  title: 'YouTube Video',
  type: MomentType.YouTube,
};

export default YouTubeMoment;
