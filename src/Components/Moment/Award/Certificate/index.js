import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '../../../Icon/FontAwesome';

import './style.scss';


/**
* Component to visualize an achievement.
*/
export default class AwardCertificate extends Component {
  static propTypes = {
    /** Colors to accent the `Certificate` */
    color: PropTypes.object,
    /** Who the `Certificate` is presented by. */
    conferred_by: PropTypes.object,
    /** When the `Certificate` was awarded. */
    date: PropTypes.object,
    /** Smallest text at the bottom of the `Certificate` */
    description: PropTypes.string,
    /** Icon to display at the top of the `Certificate` */
    icon: PropTypes.object,
    /** The title of the Award */
    label: PropTypes.string,
    /** The awardee of the `Certificate` */
    name: PropTypes.string,
    /** Styling object of the `Certificate` */
    style: PropTypes.object,
    /** Text underneath the title of the `Book` */
    subtitle: PropTypes.string,
    /** Largest text at the top of the `Book` */
    title: PropTypes.string,
  };

  static defaultProps = {
    icon: {name: "FaAward"},
    style: {},
  };

  render() {
    const {
      color, conferred_by, date, description, icon, label, name, style, subtitle
    } = this.props;

    const lightCornerStyle = {background: color.light};
    const darkCornerStyle = {background: color.dark};
    const leftCornerClass = "award-corner award-corner-left";
    const rightCornerClass = "award-corner award-corner-right";
    const leftBottomCornerClass = "award-corner award-corner-left-bottom";
    const rightBottomCornerClass = "award-corner award-corner-right-bottom";
    
    return (
      <div className="story-award-certificate" style={style}>
        <div className={rightCornerClass} style={lightCornerStyle}></div>
        <div className={leftCornerClass}  style={darkCornerStyle}></div>
        <div className={leftBottomCornerClass}  style={lightCornerStyle}></div>
        <div className={rightBottomCornerClass} style={darkCornerStyle}></div>
        <div className="award-content" >
          <div className="award-graphic" style={{borderColor: color.dark}}>
            <span className="award-icon" >
              <FontAwesomeIcon name="FaAward" />
            </span>
          </div>
          <div className="award-pretitle" style={{color: color.dark}}>
            {date.year}
          </div>
          <div className="award-title" style={{color: color.light}}>
            {label}
          </div>
          <div className="award-subtitle">{subtitle}</div>
          <div className="award-name" style={{color: color.dark}}>
            {name}
          </div>
          <div className="award-description">{description}</div>
          {conferred_by && (
            <div>
              <div
                className="award-organizer"
                style={{borderColor: color.dark}}
              >
                {conferred_by.title}
              </div>
              <div className="award-organizer-subtext">Conferred By</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
