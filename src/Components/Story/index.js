import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/scale-out-animation';
import { classList } from '../../utils';
import SideBar from '../SideBar';

import './style.scss';

 /**
  * Story component.
  */
const Story = (props) => {
  const { active=0, children, image, description, label, logo, type,
    onChange } = props;
  const [activeIndex, setActiveIndex] = useState(active);

  const classes = classList(
    'story-story',
    `story-story-${type}`
  );
  const momentClass = "story-story__moments__moment-container";

  const moments = React.Children.map(children, (moment, index) => {
    return (
      <div index={index} className={momentClass} key={`moment-${index}`}>
        {moment}
      </div>
    );
  })

  const handleMomentChange = (index) => {
    onChange && onChange(index);
    setActiveIndex(index);
  };

  return (
    <div className={classes}>
      <SideBar
        activeIndex={activeIndex}
        onSelect={handleMomentChange}
        title={label}
        logo={logo}
        image={image}
        description={description}
      >
        {children}
      </SideBar>
      <div className="story-story__moments">
        <AwesomeSlider
          bullets={false}
          organicArrows={false}
          buttons={false}
          selected={activeIndex}
        >
          {moments}
        </AwesomeSlider>
      </div>
    </div>
  );
};


Story.propTypes = {
  /** Alternative labels of the `Story`*/
  alt_labels: PropTypes.arrayOf(PropTypes.string),
  /** The main description of the `Story` */
  description: PropTypes.string,
  /** Identifier of the `Story` */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Image URL source */
  image: PropTypes.string,
  /** Main name of the `Story` */
  label: PropTypes.string.isRequired,
  /** List of `Moment`s to render of the `Story` */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /** Specify the type of `Story` */
  type: PropTypes.string,
};

Story.defaultProps = {
  type: 'base',
  active: 0,
};

export default Story;
