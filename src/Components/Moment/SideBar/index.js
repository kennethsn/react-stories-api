import React from 'react';
import { CssBaseline, Drawer, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { classList } from '../../../utils';
import MomentBase from '../Base';



const useStyles = makeStyles(theme => ({
  sideBar: {
    width: "40%",
    maxWidth: 500,
  }
}));


/**
* General Moment for integrating a sidebar `Drawer` component with a Moment.
*/
function SideBarMoment(props) {
  const {
    children, layout, onClose, sidebar, sideBarClassName, sideBarContent, type
  } = props;
  const classes = useStyles();

  const drawerPaperClasses = classList(
    classes.sideBar,
    sideBarClassName
  )

  return (
    <MomentBase {...props} >
      <CssBaseline />
      <main>
        {children}
      </main>
      <Drawer
        anchor="right"
        open={sidebar}
        onClose={onClose}
        classes={{paper: drawerPaperClasses}}
      >
        {sideBarContent}
      </Drawer>
    </MomentBase>
  )
};

SideBarMoment.propTypes = {
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
  /** Determines if the `Drawer` is visible. */
  sidebar: PropTypes.bool.isRequired,
  /** Class name for the `SideBar` `Drawer` root. */
  sideBarClassName: PropTypes.string,
  /** Determines the content in the `Drawer` body of the `Moment`. */
  sideBarContent: PropTypes.any,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

SideBarMoment.defaultProps = {
  layout: "sidebar",
  sidebar: false,
  type: "sidebar",
};

export default SideBarMoment;
