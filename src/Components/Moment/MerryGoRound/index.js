import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, CssBaseline, Divider, Drawer } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import CardBase from '../../Card';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import SideBarMoment from '../SideBar';

import './style.scss';


/**
* MerryGoRound Moment to interactively visualize works and publications.
*/
export default class MerryGoRoundMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Determines the `SideBarSection` `Icon` of the `Moment`. */
    icon: PropTypes.element,
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Determines the `SideBarSection` text of the `Moment`. */
    label: PropTypes.string,
    /** Render function to fill the `SideBar` `Drawer`. */
    sideBarContent: PropTypes.func.isRequired,
    /** Styling object of the moment body container */
    style: PropTypes.object,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,
  }

  static defaultProps = {
    type: "merry_go_round",
    data: {},
    sideBarContent: (currentHorse) => currentHorse,
    style: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      currentHorse: null,
      sidebar: false,
    };

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
    this.handleSelectHorse = this.handleSelectHorse.bind(this);
  };

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    this.loadMerryGoRound(node);
  };

  loadMerryGoRound(node) {
    // TODO: Integrate this better with react.
    // Kinda ugly mixing vanillar js here
    const root = node.querySelector('.merry_go_round-wrapper')
    let figure = root.querySelector('.merry-go-round_figure'),
    nextNavigator = root.querySelector('.merry-go-round-navigate-next'),
    prevNavigator = root.querySelector('.merry-go-round-navigate-prev'),
    images = figure.children,
    n = images.length,
    gap = 80,
    bfc = 'bfc' in root.dataset,
    theta = 2 * Math.PI / n,
    currImage = 0;
    setupCarousel(currImage, n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener('resize', function () {
      let s = parseFloat(getComputedStyle(images[0]).width);
      setupCarousel(currImage, n, s);
    });
    setupNavigation();
    function setupCarousel(horseIndex, n, s) {
      var apothem = s / (2 * Math.tan(Math.PI / n));
      const transformOrigin = `50% 50% ${-apothem}px`;
      figure.style.transformOrigin = transformOrigin;
      for (var i = 0; i < n; i++) {
        images[i].style.padding = gap + 'px';
      }
      for (i = 1; i < n; i++) {
        images[i].style.transformOrigin = transformOrigin;
        images[i].style.transform = `rotateY(${i * theta}rad)`;
      }
      if (bfc){
        for (i = 0; i < n; i++) {
          images[i].style.backfaceVisibility = 'hidden';
        }
      }
      rotateCarousel(horseIndex);
    }

    function setupNavigation() {
      nextNavigator.addEventListener('click', (e) => {
        e.stopPropagation();
        currImage++;
        rotateCarousel(currImage)
      }, true);
      prevNavigator.addEventListener('click', (e) => {
        e.stopPropagation();
        currImage--;
        rotateCarousel(currImage)
      }, true);
    }
    function rotateCarousel(imageIndex) {
      figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
  }


  handleCloseSidebar() {
    this.setState({sidebar: false});
  }

  handleSelectHorse(horse) {
    this.setState({currentHorse: horse, sidebar: true});
  };

  renderHorses(){
    return React.Children.map(this.props.children, (child, index) => (
      <div
        className="merry-go-round__horse"
        index={index}
        onClick={() => this.handleSelectHorse(child)}
      >
        {child}
      </div>
    ));
  }

  render() {
    const { handleSelectHorse } = this;
    const { children, sideBarContent, style } = this.props;
    const { currentHorse, sidebar } = this.state;

    const layout="merry_go_round";

    return (
      <SideBarMoment
        {...this.props}
        layout={layout}
        onClose={this.handleCloseSidebar}
        sidebar={sidebar}
        sideBarContent={sideBarContent(currentHorse)}
      >
        <div className="merry_go_round-wrapper"  style={style}>
          <div className="merry-go-round_figure">
            {this.renderHorses()}
          </div>
          <div className="merry-go-round-navigation">
            <Button
              className="merry-go-round-navigate merry-go-round-navigate-prev"
              variant="contained"
            >
              <MdArrowBack />
            </Button>
            <Button
              className="merry-go-round-navigate merry-go-round-navigate-next"
              variant="contained"
            >
              <MdArrowForward />
            </Button>
          </div>
        </div>
      </SideBarMoment>
    )
  }
}
