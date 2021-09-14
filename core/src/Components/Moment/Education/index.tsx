import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentType } from '../../../constants';
import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import ImageIcon from '../../Icon/Image';
import ParallaxImage from '../../ParallaxImage';
import Pipe from '../../Pipe';
import ParallaxMoment, { ParallaxMomentProps } from '../Parallax';
import './style.scss';

export interface EducationMomentProps extends ParallaxMomentProps {
  data: {
    degrees?: string;
    description?: string;
    image?: string;
    label: string;
    logo?: string;
    website?: string;
    years?: string;
  }[]
}

/**
* Visualizing Education Institutions.
*/
const EducationMoment = (props: EducationMomentProps) => {
  const { color, data } = props;
  const imageColor = color.text;
  const key = (label: string, index: number) => `p-image-${label}-${index}`;
  const renderImages = () => data.map(({
    degrees,
    description,
    image,
    label,
    logo,
    website,
    years,
  }, index) => (
    <ParallaxImage
      color={imageColor}
      key={key(label, index)}
      src={image}
    >
      <div className="story-education-card">
        <CardBase>
          <CardHeader
            text={logo ? (
              <div>
                <ImageIcon
                  name={`Logo of ${label}`}
                  url={logo}
                />
                <Pipe type="thin" />
                {label}
              </div>
            ) : label}
          />
          {years && <CardPill text={years} />}
          {degrees && (
            <CardSection>
              {degrees}
            </CardSection>
          )}
          {description && (
            <CardDetail>
              {description}
            </CardDetail>
          )}
          {website && (
            <CardDetail>
              <Button
                className="library-sidebar-link"
                href={website}
                target="_blank"
                style={{ background: color.background, color: imageColor }}
                variant="contained"
              >
                Learn More
              </Button>
            </CardDetail>
          )}
        </CardBase>
      </div>
    </ParallaxImage>
  ));
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ParallaxMoment {...props}>
      {renderImages()}
    </ParallaxMoment>
  );
};

EducationMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Information to build the `ParallaxImage`s */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
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

EducationMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  data: [],
  type: MomentType.Education,
};

export default EducationMoment;
