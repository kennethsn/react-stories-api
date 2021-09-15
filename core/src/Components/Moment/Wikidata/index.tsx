import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import IFrameMoment from '../IFrame';

export interface WikidataMomentProps extends MomentProps {
  entity_id?: string;
  icon?: ReactNode;
  url?: string;
}

/**
 * Wikidata layout Moment.

 * *note: You must either use an ``entity_id`` or ``url`` prop.*
 */
const WikidataMoment = (props: WikidataMomentProps) => {
  const { entity_id: entityId, url } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <IFrameMoment
      {...props}
      url={url || `https://m.wikidata.org/wiki/${entityId}`}
    />
  );
};

WikidataMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Wikidata Entity Identifier */
  entity_id: PropTypes.string,
  /** `Icon` to place in the `SideBarSection` and `Moment`'s header  */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The full URL of the Wikidata entity. */
  url: PropTypes.string,
};

WikidataMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  label: 'Wikidata',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg',
  layout: MomentLayout.IFrame,
  title: 'Wikidata Item',
  type: MomentType.Wikidata,
};

export default WikidataMoment;
