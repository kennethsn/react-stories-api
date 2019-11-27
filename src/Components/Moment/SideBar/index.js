import React, { Component } from 'react';
import { CssBaseline, Drawer } from '@material-ui/core';
import PropTypes from 'prop-types';

import { classList } from '../../../utils';
import MomentBase from '../Base';

import './style.scss';


/**
* General Moment for integrating a sidebar `Drawer` component with a Moment.
*/
export default class SideBarMoment extends Component {
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
    /** The layout name of the `Moment` */
    type: PropTypes.string,
    /** Determines the content in the `Drawer` body of the `Moment`. */
    sideBarContent: PropTypes.any,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,

  }

  static defaultProps = {
    layout: "sidebar",
    type: "sidebar",
  }

  render() {
    const {
      children, layout, onClose, sidebar, sideBarContent, type
    } = this.props;

    const drawerClasses = classList(
      'story-sidebar-drawer',
      `story-sidebar-drawer-layout-${layout}`,
      `story-sidebar-drawer-${type}`
    )

    return (
      <MomentBase {...this.props} >
        <CssBaseline />
        <main>
          {children}
        </main>`
        <Drawer
          className={drawerClasses}
          anchor="right"
          open={sidebar}
          onClose={onClose}
        >
          {sideBarContent}
        </Drawer>
      </MomentBase>
    )
  }
}
