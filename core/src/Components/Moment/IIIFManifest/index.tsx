import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MiradorMoment from '../Mirador';
import './style.scss';

export interface IIIFManifestMomentProps extends MomentProps {
  provider?: string;
  url: string;
}

/**
 * IIIFManifestMoment layout Moment.
 */
const IIIFManifestMoment = (props: IIIFManifestMomentProps) => {
  const { provider, url: manifestId } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MiradorMoment
      {...props}
      config={{
        manifests: { [manifestId]: { provider } },
        windows: [{ manifestId }],
      }}
    />
  );
};

IIIFManifestMoment.propTypes = {
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

IIIFManifestMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  color: {
    background: 'gray',
    text: 'white',
  },
  layout: MomentLayout.Mirador,
  type: MomentType.Mirador,
};

export default IIIFManifestMoment;
