import React, { Component } from 'react';
import { Button, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { getOffsetOfElementInViewport } from '../../../../utils';
import ImageIcon from '../../../Icon/Image';
import FontAwesomeIcon from '../../../Icon/FontAwesome';

import BadgeGraphic from './employer_card_top.png';
import './style.scss';


/**
 * Interactive ID Badge Component
 */
export default class EmployerBadge extends Component {
  static propTypes = {
    /** Determines the foreground color of the info panel. */
    accentColor: PropTypes.string,
    /** Description of the Employer. */
    description: PropTypes.string,
    /** The destination URL of the Employer's image */
    image: PropTypes.string,
    /** The name of the Employer. */
    label: PropTypes.string.isRequired,
    /** Location data of the Employer. */
    location: PropTypes.object,
    /** The destination URL of the Employer's logo */
    logo: PropTypes.string,
    /** Additional information to render on the `Badge`'s body. */
    qualifiers: PropTypes.object,
    /** Determines the background color of the info panel. */
    textColor: PropTypes.string,
  }

  static defaultProps = {
    accentColor: '#3d3547',
    textColor: '#edeaea',
  }

  constructor(props) {
    super(props);
    this.state = {
      height: 320,
      width: 240,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null,
      el: null,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  };

  mousePX() {
    return this.state.mouseX / this.state.width;
  };

  mousePY() {
    return this.state.mouseY / this.state.height;
  };

  cardStyle() {
    // TODO: Fix the math
    // const rX = this.mousePX() * 3;
    // const rY = this.mousePY() * -.05;
    return {
      // transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
    };
  };

  cardBgStyle() {
    const { image, location } = this.props;

    const bgImage = image || (location && location.image);
    if (!bgImage) return {};
    // TODO: Fix the math
    // const tX = this.mousePX() * -6;
    // const tY = this.mousePY() * -.05;
    return {
      backgroundImage: `url(${bgImage})`,
      // transform: `translateX(${tX}px) translateY(${tY}px)`
    };
  };

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    const card = node.querySelector('.story-employer-badge');
    this.setState({
      el: card,
      height: card.offsetHeight,
      width: card.offsetWidth
    });
  };

  handleMouseMove(e) {
    const { top, left } = getOffsetOfElementInViewport(this.state.el);
    this.setState({
      mouseX: e.pageX - left - this.state.width / 2,
      mouseY: e.pageY - top - this.state.height / 2,
    })
  };

  handleMouseEnter() {
    clearTimeout(this.state.mouseLeaveDelay);
  };

  handleMouseLeave() {
    this.setState({
      mouseLeaveDelay: setTimeout(() => {
        this.setState({
          mouseX: 0,
          mouseY: 0
        })
      }, 1000)
    })
  };

  renderLogo() {
    const { logo } = this.props;

    return (logo && (
      <div className="badge-logo">
        <ImageIcon url={logo} />
      </div>
    ));
  };

  renderContent(){
    const { qualifiers } = this.props;

    return qualifiers && (
      <div className="badge-content">
        {Object.values(qualifiers).map(({ label, values }) => (
          <div className="badge-content__item">
            <div className="badge-content__item__prop">
              {label} :
            </div>
            {Object.keys(values).map(label => (
              <div className="badge-content__item__value">
                {label}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };


  renderInfoPanel(){
    const {
      accentColor, description, label, location, textColor, website
    } = this.props;

    const colorStyle = {color: accentColor, background: textColor};

    return (
      <div className="badge-info-panel-container">
        <div className="badge-info-panel" style={colorStyle}>
          <div className="badge-info-panel__icon">
            <FontAwesomeIcon name="FaInfoCircle" />
          </div>
          <div className="badge-info-panel__body" style={colorStyle}>
            <div className="employer-info">
              <div className="badge-info-panel__body__row row-header">
                {label}
              </div>
              <Divider style={{backgroundColor: accentColor}}/>
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
                    target="_blank"
                    style={{color: accentColor}}
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
  };

  render() {

    return (
      <div className="story-employer-badge-container">
        <div
          className="story-employer-badge"
          style={this.cardStyle()}
          onMouseMove={this.handleMouseMove}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="badge-graphic-top">
            <img src={BadgeGraphic}/>
          </div>
          <div className="badge-inner">
            {this.renderInfoPanel()}
            <div className="badge-inner__bg" style={this.cardBgStyle()} />
            <div className="badge-body">
              {this.renderLogo()}
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
}
