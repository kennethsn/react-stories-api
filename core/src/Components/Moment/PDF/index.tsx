import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';
import './style.scss';

export interface PDFMomentProps extends MomentProps {
  url: string;
}

/**
 * Embeddable PDF layout Moment.
 */
const PDFMoment = (props: PDFMomentProps) => {
  const { url } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MomentBase {...props}>
      <embed
        className="story-embed-pdf"
        src={url}
        type="application/pdf"
      />
    </MomentBase>
  );
};

PDFMoment.propTypes = {
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
  /** The source of the PDF to render in the `Moment`'s body. */
  url: PropTypes.string.isRequired,
};

PDFMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  color: {
    background: 'gray',
    text: 'white',
  },
  layout: MomentLayout.PDF,
  type: MomentType.PDF,
};

export default PDFMoment;
