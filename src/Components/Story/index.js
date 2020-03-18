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
  const [activeIndex, setActiveIndex] = useState(0);
  const { children, image, description, label, logo, type } = props;

    const classes = classList(
      'story-story',
      `story-story-${type}`
    );
    const momentClass = "story-story__moments__moment-container";
    const moments = React.Children.map(children, (moment, index) => {
      return (
        <div index={index} className={momentClass} key={index}>
          {moment}
        </div>
      );
    })

  return (
    <div className={classes}>
      <SideBar
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
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
};

export default Story;
