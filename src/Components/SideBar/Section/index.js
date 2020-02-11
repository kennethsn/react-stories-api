import React, { Component } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { classList } from '../../../utils';
import CardSection from '../../Card/Section';
import FontAwesomeIcon from '../../Icon/FontAwesome';

import './style.scss';

 /**
  * Section for a `SideBar` Component.
  */
export default class SideBarSection extends Component {
  static propTypes = {
    /** The color to style the `SideBarSection` during events  */
    accentColor: PropTypes.string,
    /** The `SideBar` `Icon` that relates to the `Moment` */
    icon: PropTypes.element.isRequired,
    /** Way to disambiguate this `SideBarSection` during a callback  */
    index: PropTypes.any.isRequired,
    /** Determines if the `Moment` is currently rendered on the `Story`  */
    isActive: PropTypes.bool,
    /** Click handler callback used by the `SideBar` */
    onClick: PropTypes.func,
    /** Styling object of the `SideBar` */
    style: PropTypes.object,
    /** The `SideBar` label of the `Moment` */
    text: PropTypes.string.isRequired,
    /** The color to style the `SideBarSection` text when active  */
    textColor: PropTypes.string,
  };

  static defaultProps = {
    icon: <FontAwesomeIcon name="FaInfoCircle" />,
    onClick: () => {},
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  };

  handleClick() {
    const { index, onClick } = this.props;
    return onClick(index);
  };

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };


  render() {
    const { accentColor, icon, isActive, style, text, textColor } = this.props;
    const { isHovered } = this.state;
    const { handleClick, handleHover } = this;

    const cardSectionStyle = {textAlign: "center"};
    let eventClass = '';
    if (isActive) {
      eventClass = '--active';
      cardSectionStyle.borderColor = accentColor;
      cardSectionStyle.color = accentColor;
      cardSectionStyle.backgroundColor = textColor;
    }
    else if (isHovered) {
      eventClass = '--hovered';
      cardSectionStyle.background = accentColor;
      cardSectionStyle.borderColor = textColor;
      cardSectionStyle.color = textColor;
    }


    const classes = classList(
      'story-sidebar__section',
      eventClass
    );
    return (
      <div className={classes} style={style}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}>
        <CardSection style={cardSectionStyle}>
          <Grid container>
            <Grid item xs={3}>
              {icon}
            </Grid>
            <Grid item xs={1}>
              <Divider orientation="vertical"/>
            </Grid>
            <Grid item xs={8} className="story-sidebar-text">
              <Typography variant="subtitle2">
                {text}
              </Typography>
            </Grid>
          </Grid>
        </CardSection>
      </div>
    )
  }
}
