import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';
import './style.scss';

export interface IFrameMomentProps extends MomentProps {
  iframe?: object;
  url: string;
}

/**
 * General iFrame layout Moment.
 */
const IFrameMoment = (props: IFrameMomentProps) => {
  const { iframe, title, url } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase {...props}>
      <iframe
        allowFullScreen
        frameBorder="0"
        height="100vh"
        src={url}
        title={typeof title === 'string' ? title : url}
        width="100%"
        {...iframe}
      />
    </MomentBase>
  );
};

IFrameMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Props to pass through to the iFrame Attributes. */
  // eslint-disable-next-line react/forbid-prop-types
  iframe: PropTypes.object,
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
  /** The source of the iFrame to render in the `Moment`'s body. */
  url: PropTypes.string.isRequired,
};

IFrameMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  color: {
    background: 'gray',
    text: 'white',
  },
  iframe: {},
  layout: MomentLayout.IFrame,
  type: MomentType.IFrame,
};

export default IFrameMoment;
