import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { classList } from '../../../utils';
import MomentBase from '../Base';
import useStyles from './useStyles';
import { MomentProps } from '../../../types';
import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';

export interface SideBarMomentProps extends MomentProps {
  onClose: () => void;
  sidebar: boolean;
  sideBarClassName?: string;
  sideBarContent: Element | ReactNode;
}
/**
* General Moment for integrating a sidebar `Drawer` component with a Moment.
*/
const SideBarMoment = (props: SideBarMomentProps) => {
  const {
    children, onClose, sidebar, sideBarClassName, sideBarContent,
  } = props;
  const classes = useStyles();
  const drawerPaperClasses = classList(classes.sideBar, sideBarClassName || '');
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MomentBase {...props}>
      <CssBaseline />
      <main>
        {children}
      </main>
      <Drawer
        anchor="right"
        open={sidebar}
        onClose={onClose}
        classes={{ paper: drawerPaperClasses }}
      >
        {sideBarContent}
      </Drawer>
    </MomentBase>
  );
};

SideBarMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Determines if the `Drawer` is visible. */
  sidebar: PropTypes.bool.isRequired,
  /** Class name for the `SideBar` `Drawer` root. */
  sideBarClassName: PropTypes.string,
  /** Determines the content in the `Drawer` body of the `Moment`. */
  sideBarContent: PropTypes.node,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

SideBarMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.SideBar,
  sidebar: false,
  type: MomentType.SideBar,
};

export default SideBarMoment;
