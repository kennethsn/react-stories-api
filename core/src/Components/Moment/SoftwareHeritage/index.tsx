import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import IFrameMoment from '../IFrame';

export interface SoftwareHeritageMomentProps extends MomentProps {
  swhid?: string;
  url?: string;
}

/**
 * SoftwareHeritage layout Moment.
 * This Moment Component integrates with the Software Heritage Embed URL:
 * https://docs.softwareheritage.org/devel/swh-web/uri-scheme-misc.html#iframe-view-for-contents-and-directories
 */
const SoftwareHeritageMoment = (props: SoftwareHeritageMomentProps) => {
  const { swhid, url } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <IFrameMoment
      {...props}
      url={url || `https://archive.softwareheritage.org/embed/${swhid}`}
    />
  );
};

SoftwareHeritageMoment.propTypes = {
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
  /** SoftWare Heritage persistent IDentifier object, or
   * SWHID (see [SoftWare Heritage persistent IDentifiers](https://docs.softwareheritage.org/devel/swh-model/persistent-identifiers.html#persistent-identifiers) (SWHIDs) to learn more about its syntax) */
  swhid: PropTypes.string,
  /** The full embeddable URL of the Software Heritage Content */
  url: PropTypes.string,
};

SoftwareHeritageMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  color: { background: 'linear-gradient(90deg, rgb(255 201 58) 00%, rgba(226,0,38,1) 100%)', text: 'white' },
  layout: MomentLayout.IFrame,
  logo: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Software-heritage-logo.1024px.png',
  title: 'Software Heritage Repository',
  type: MomentType.SoftwareHeritage,
};

export default SoftwareHeritageMoment;
