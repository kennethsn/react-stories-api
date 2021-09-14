import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React, {
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getOffsetOfElementInViewport } from '../../../../utils';
import FontAwesomeIcon from '../../../Icon/FontAwesome';
import ImageIcon from '../../../Icon/Image';
import EMPLOYER_BADGE_DEFAULT_ICON_IMAGE from './constants';
import './style.scss';

export interface EmployerBadgeProps {
  accentColor?: string;
  description?: string;
  image?: string;
  label: string;
  location?: { label: string; image: string };
  logo?: string;
  qualifiers?: Record<string, { label: string; values: string[] }>;
  textColor?: string;
  topIconImage?: string;
  website?: string;
}

/**
 * Interactive ID Badge Component
 */
const EmployerBadge = ({
  accentColor,
  description,
  image,
  label,
  location,
  logo,
  qualifiers,
  textColor,
  topIconImage,
  website,
}: EmployerBadgeProps) => {
  const [height, setHeight] = useState(320);
  const [width, setWidth] = useState(240);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState(undefined as NodeJS.Timeout | undefined);
  const [el, setEl] = useState(undefined as Element | undefined);
  const containerDiv = useRef(null);
  const mousePX = mouseX / width;
  const mousePY = mouseY / height;
  const tX = mousePX * -6;
  const tY = mousePY * -0.05;
  const rX = mousePX * 3;
  const rY = mousePY * -0.05;
  const cardStyle = {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
  };
  const bgImage = image || (location && location.image);
  const cardBgStyle = bgImage ? {
    backgroundImage: `url(${bgImage})`,
    transform: `translateX(${tX}px) translateY(${tY}px)`,
  } : {};
  // TODO: Smooth the animation
  useEffect(() => {
    if (!containerDiv) return;
    const card = containerDiv.current as unknown as HTMLElement;
    if (!card) return;
    setEl(card);
    setHeight(card.offsetHeight);
    setWidth(card.offsetWidth);
  });
  const handleMouseMove: MouseEventHandler = (e) => {
    if (!el) return;
    const { left, top } = getOffsetOfElementInViewport(el);
    setMouseX(e.pageX - left - width / 2);
    setMouseY(e.pageY - top - height / 2);
  };
  const handleMouseEnter = () => clearTimeout(mouseLeaveDelay!);
  // @ts-ignore
  const handleMouseLeave = () => setMouseLeaveDelay(setTimeout(() => {
    setMouseX(0);
    setMouseY(0);
  }, 300));
  const content = qualifiers && (
    <div className="badge-content">
      {Object.values(qualifiers).map(({ label: qualifierLabel, values }) => (
        <div
          className="badge-content__item"
          key={`badge-qlabel-${qualifierLabel}`}
        >
          <div className="badge-content__item__prop">
            {`${qualifierLabel} : `}
          </div>
          {Object.keys(values).map((value) => (
            <div
              className="badge-content__item__value"
              key={`badge-val-${value}`}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const colorStyle = { background: textColor, color: accentColor };
  const infoPanel = (
    <div className="badge-info-panel-container">
      <div
        className="badge-info-panel"
        style={colorStyle}
      >
        <div className="badge-info-panel__icon">
          <FontAwesomeIcon name="FaInfoCircle" />
        </div>
        <div
          className="badge-info-panel__body"
          style={colorStyle}
        >
          <div className="employer-info">
            <div className="badge-info-panel__body__row row-header">
              {label}
            </div>
            <Divider style={{ backgroundColor: accentColor }} />
            {description && (
              <div className="badge-info-panel__body__row">
                {description}
              </div>
            )}
            {location && location.label && (
              <div className="badge-info-panel__body__row">
                <span className="badge-info-panel__body__row__prop">
                  Location:
                </span>
                {location.label}
                {location.image && (
                  <ImageIcon url={location.image} />
                )}
              </div>
            )}
            {website && (
              <div className="badge-info-panel__body__row">
                <Button
                  className="employer-info-box__button"
                  href={website}
                  style={{ color: accentColor }}
                  target="_blank"
                >
                  Learn More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      className="story-employer-badge-container"
      ref={containerDiv}
    >
      <div
        className="story-employer-badge"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="badge-graphic-top">
          <img
            alt="Badge Graphic"
            src={topIconImage}
          />
        </div>
        <div className="badge-inner">
          {infoPanel}
          <div
            className="badge-inner__bg"
            style={cardBgStyle}
          />
          <div className="badge-body">
            {(logo && (
              <div className="badge-logo">
                <ImageIcon url={logo} />
              </div>
            ))}
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

EmployerBadge.propTypes = {
  /** Determines the foreground color of the info panel. */
  accentColor: PropTypes.string,
  /** Description of the Employer. */
  description: PropTypes.string,
  /** The destination URL of the Employer's image */
  image: PropTypes.string,
  /** The name of the Employer. */
  label: PropTypes.string.isRequired,
  /** Location data of the Employer. */
  location: PropTypes.shape({ image: PropTypes.string, label: PropTypes.string }),
  /** The destination URL of the Employer's logo */
  logo: PropTypes.string,
  /** Additional information to render on the `Badge`'s body. */
  // eslint-disable-next-line react/forbid-prop-types
  qualifiers: PropTypes.object,
  /** Determines the background color of the info panel. */
  textColor: PropTypes.string,
  topIconImage: PropTypes.string,
  website: PropTypes.string,
};

EmployerBadge.defaultProps = {
  accentColor: '#3d3547',
  description: '',
  image: undefined,
  location: undefined,
  logo: '',
  qualifiers: undefined,
  textColor: '#edeaea',
  topIconImage: EMPLOYER_BADGE_DEFAULT_ICON_IMAGE,
  website: undefined,
};

export default EmployerBadge;
