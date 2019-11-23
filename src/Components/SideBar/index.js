import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classList } from '../../utils';
import CardBase from '../Card';

import SideBarSection from './Section';
import './style.scss';

 /**
  * Story SideBar component.
  */
export default class SideBar extends Component {
  static propTypes = {

    activeIndex: PropTypes.any,
    /** List of `Moment`s to render information from */
    children: PropTypes.arrayOf(PropTypes.element).isRequired,

    onSelect: PropTypes.func,
  };

  static defaultProps = {
    onSelect: () => {},
  };

  renderSections() {
    const { activeIndex, children, onSelect } = this.props;

    return React.Children.map(children, (moment) => {
      const { color, icon, index, label } = moment.props;

      const sectionProps = {
        icon,
        index,
        isActive: activeIndex == index,
        onClick: onSelect,
        text:label,
      };

      if (color) {
        sectionProps.accentColor = color.background;
        sectionProps.textColor = color.text;
      }

      return <SideBarSection {...sectionProps}/>
    });
  };

  render() {
    const { type } = this.props;

    const classes = classList(
      'story-sidebar',
      `story-sidebar-${type}`
    );

    return (
      <div className={classes}>
        <CardBase>
          {this.renderSections()}
        </CardBase>
      </div>
    )
  }
}
