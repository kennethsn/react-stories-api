import PropTypes from 'prop-types';
import React, { ReactNode, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';

import { classList } from '../../utils';
import SideBar from '../SideBar';
import './style.scss';

export interface StoryProps {
  active?: number;
  children: ReactNode;
  description: string;
  image?: string;
  label: string;
  logo?: ReactNode;
  onChange?: (index: number) => void;
  type?: string;
}

/**
* Story component.
*/
const Story = ({
  active = 0,
  children,
  description,
  image,
  label,
  logo,
  onChange,
  type,
}: StoryProps) => {
  const [activeIndex, setActiveIndex] = useState(active);
  const classes = classList('story-story', `story-story-${type}`);
  const key = (index: number) => `moment-${index}`;
  const moments = React.Children.map(children, (moment, index) => (
    <div
      className="story-story__moments__moment-container"
      key={key(index)}
    >
      {moment}
    </div>
  ));
  const handleMomentChange = (index: number) => {
    if (onChange) {
      onChange(index);
    }
    setActiveIndex(index);
  };
  return (
    <div className={classes}>
      <SideBar
        activeIndex={activeIndex}
        description={description}
        image={image}
        logo={logo}
        onSelect={handleMomentChange}
        title={label}
      >
        {children}
      </SideBar>
      <div className="story-story__moments">
        <AwesomeSlider
          animation="scaleOutAnimation"
          bullets={false}
          buttons={false}
          organicArrows={false}
          selected={activeIndex}
        >
          {moments}
        </AwesomeSlider>
      </div>
    </div>
  );
};

Story.propTypes = {
  /** Selected `Moment` Index of the `Story` */
  active: PropTypes.number,
  /** List of `Moment`s to render of the `Story` */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /** The main description of the `Story` */
  description: PropTypes.string,
  /** Image URL source */
  image: PropTypes.string,
  /** Main name of the `Story` */
  label: PropTypes.string.isRequired,
  /** Specify the type of `Story` */
  type: PropTypes.string,
};

Story.defaultProps = {
  active: 0,
  description: undefined,
  image: undefined,
  type: 'base',
};

export default Story;
