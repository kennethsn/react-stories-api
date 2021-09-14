import PropTypes from 'prop-types';
import React, { CSSProperties } from 'react';

import { IconSource } from '../../../../constants';
import { Icon } from '../../../../types';
import { buildIcon } from '../../../StoriesAPI/Story/utils/icon';
import './style.scss';

export interface AwardCertificateProps {
  color: {
    dark: string;
    light: string;
  };
  conferred_by?: {
    description?: string;
    label: string; // Full name
    title: string; // Truncated to fit certificate
  };
  description?: string;
  icon: Icon;
  label?: string;
  name: string;
  style?: CSSProperties;
  subtitle?: string;
  year?: string | number;
}

const leftCornerClass = 'award-corner award-corner-left';
const rightCornerClass = 'award-corner award-corner-right';
const leftBottomCornerClass = 'award-corner award-corner-left-bottom';
const rightBottomCornerClass = 'award-corner award-corner-right-bottom';

/**
* Component to visualize an achievement.
*/
const AwardCertificate = (props: AwardCertificateProps) => {
  const {
    color,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    conferred_by,
    description,
    icon,
    label,
    name,
    style,
    subtitle,
    year,
  } = props;
  const lightCornerStyle = { background: color.light };
  const darkCornerStyle = { background: color.dark };
  return (
    <div
      className="story-award-certificate"
      style={style}
    >
      <div
        className={rightCornerClass}
        style={lightCornerStyle}
      />
      <div
        className={leftCornerClass}
        style={darkCornerStyle}
      />
      <div
        className={leftBottomCornerClass}
        style={lightCornerStyle}
      />
      <div
        className={rightBottomCornerClass}
        style={darkCornerStyle}
      />
      <div className="award-content">
        <div
          className="award-graphic"
          style={{ borderColor: color.dark }}
        >
          <span className="award-icon">
            {buildIcon(icon)}
          </span>
        </div>
        {year && (
          <div
            className="award-pretitle"
            style={{ color: color.dark }}
          >
            {year}
          </div>
        )}
        <div
          className="award-title"
          style={{ color: color.light }}
        >
          {label}
        </div>
        <div className="award-subtitle">
          {subtitle}
        </div>
        <div
          className="award-name"
          style={{ color: color.dark }}
        >
          {name}
        </div>
        <div className="award-description">{description}</div>
        {conferred_by && (
          <div>
            <div
              className="award-organizer"
              style={{ borderColor: color.dark }}
            >
              {conferred_by.title}
            </div>
            <div className="award-organizer-subtext">
              Conferred By
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AwardCertificate.propTypes = {
  /** Colors to accent the `Certificate` */
  color: PropTypes.shape({
    dark: PropTypes.string.isRequired,
    light: PropTypes.string.isRequired,
  }).isRequired,
  /** Who the `Certificate` is presented by. */
  conferred_by: PropTypes.shape({ title: PropTypes.string.isRequired }),
  /** Smallest text at the bottom of the `Certificate` */
  description: PropTypes.string,
  /** Icon to display at the top of the `Certificate` */
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }),
  /** The title of the Award */
  label: PropTypes.string,
  /** The awardee of the `Certificate` */
  name: PropTypes.string.isRequired,
  /** Styling object of the `Certificate` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** Text underneath the title of the `Certificate` */
  subtitle: PropTypes.string,
  /** Largest text at the top of the `Certificate` */
  title: PropTypes.string,
  /** When the `Certificate` was awarded. */
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

AwardCertificate.defaultProps = {
  conferred_by: undefined,
  description: '',
  label: undefined,
  icon: { name: 'FaAward', source: IconSource.FontAwesome },
  style: {},
  subtitle: undefined,
  title: undefined,
  year: undefined,
};

export default AwardCertificate;
