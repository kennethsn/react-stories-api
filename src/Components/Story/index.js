import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/scale-out-animation';

import { classList } from '../../utils';
import SideBar from '../SideBar';

import './style.scss';

 /**
  * Story component.
  */
export default class Story extends Component {
  static propTypes = {
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

  static defaultProps = {
    type: 'base',
  };

  constructor(props) {
    super(props);
    this.state = {
      activeMomentIndex: 0,
    };

    this.handleSelectMoment = this.handleSelectMoment.bind(this);
  };

  handleSelectMoment(index) {
    this.setState({
      activeMomentIndex: index
    });
  };

  render() {
    const { handleSelectMoment } = this;
    const { children, type } = this.props;
    const { activeMomentIndex } = this.state;

    const classes = classList(
      'story-story',
      `story-story-${type}`
    );
    const momentClass = "story-story__moments__moment-container";
    const moments = React.Children.map(children, (moment) => {
      const { index } = moment.props;
      return (
        <div index={index} className={momentClass}>
          {moment}
        </div>
      );
    })

    return (
      <div className={classes}>
        <SideBar activeIndex={activeMomentIndex} onSelect={handleSelectMoment}>
          {children}
        </SideBar>
        <div className="story-story__moments">
          <AwesomeSlider
            cssModule={AwesomeSliderStyles}
            bullets={false}
            organicArrows={false}
            selected={activeMomentIndex}
          >
            {moments}
          </AwesomeSlider>
        </div>
      </div>
    );
  }
}
