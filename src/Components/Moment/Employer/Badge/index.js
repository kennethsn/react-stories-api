import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { getOffsetOfElementInViewport } from '../../../../utils';
import CardHeader from '../../../Card/Header';
import ImageIcon from '../../../Icon/Image';
import FontAwesomeIcon from '../../../Icon/FontAwesome';

import BadgeGraphic from './employer_card_top.png';
import './style.scss';


/**
 * Interactive ID Badge Component
 */
export default class EmployerBadge extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Image` label. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Content to go underneath the title in a detail page */
    content: PropTypes.any,
    /** Determines the main text of the `Image`. */
    label: PropTypes.string,
    /** Determines if the layout should emphasize the text or the image. */
    noImage: PropTypes.bool,
    /** The destination URL of the `Image` */
    src: PropTypes.string.isRequired,
  }

  static defaultProps = {
    color: {
      background: "#ffc7ed9e",
      text: '#000',
    },
    // height: 320,
    // width: 240,
    image: "http://commons.wikimedia.org/wiki/Special:FilePath/Philadelphia%20cityscape%20BW%2020150328.jpg",
    style: {},
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
    const rX = this.mousePX() * 3;
    const rY = this.mousePY() * -.05;
    return {
      // transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
    };
  };

  cardBgStyle() {
    const tX = this.mousePX() * -6;
    const tY = this.mousePY() * -.05;
    return {
      backgroundImage: `url(${this.props.image})`,
      // transform: `translateX(${tX}px) translateY(${tY}px)`
    };
  };

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    const card = node.querySelector('.card');
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

  renderHeader() {
    const { label, logo } = this.props;
    return (
      <div className="badge-header">
        {logo ? <ImageIcon url={logo} /> : label}
      </div>
    )
  };

  renderContent(){
    const { qualifiers } = this.props;

    return qualifiers && (
      <div className="content">
        <ul className="content-ul">
          {Object.values(qualifiers).map(({label, values }) => (
            <li>
              <span className="card-field-prop">
                {label} :
              </span>
              <br/>
              {Object.keys(values).map(label => <span>{label}</span>)}
            </li>
          ))}
        </ul>
      </div>
    );
  }


  renderInfoPanel(){
    const { description, label, location } = this.props;
    return (
      <div className="employer-info">
        <span className="card-field-prop">Company Name:</span><br/>
        <h6>{label}</h6>
        {description && (
          <div>
            <span className="card-field-prop">Description:</span><br/>
            {description} <br/>
          </div>
        )}
        {location && location.label && (
          <div>
            <span className="card-field-prop">Location:</span><br/>
            {location.label} <br/>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { accentColor, textColor } = this.props;

    return (
      <div className="story-employer-badge">
        <div className="card" style={this.cardStyle()} onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
          <span className="header-top"><img src={BadgeGraphic}/></span>
          <div className="card-inner">
            <div className="wrapper">
              <div className="inside" style={{color: accentColor, background: textColor}}>
                <div className="icon">
                  <FontAwesomeIcon name="FaInfoCircle" />
                </div>
                <div className="contents" style={{color: accentColor, background: textColor}}>
                  {this.renderInfoPanel()}
                </div>
              </div>
            </div>
            <div className="card-bg" style={this.cardBgStyle()} />
            <div className="badge-body">
              <div className="card-hdr">
                {this.renderHeader()}
              </div>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
