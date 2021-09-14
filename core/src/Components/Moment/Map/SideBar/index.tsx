import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { MapLocation } from '../constants';
import MapInfoCard from '../InfoCard';
import useStyles from './useStyles';
import './style.scss';

export interface Props {
  children: ReactNode;
  data: MapLocation[];
  onSelect: (locationIndex: number) => void;
  open: boolean;
  selectedIndex?: number;
}

/**
* `SideBar` for the `MapMoment` to provide location information.
  */
const MapSideBar = ({
  children,
  data,
  onSelect,
  open,
  selectedIndex,
}: Props) => {
  const classes = useStyles();
  const locationKey = (label: string, index: number) => `${label}-${index}`;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        {children}
      </main>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}
        open={open}
        variant="persistent"
      >
        <List>
          {data.map((location, index) => (
            <ListItem
              button
              divider
              key={locationKey(location.label, index)}
              onClick={() => onSelect(index)}
            >
              <MapInfoCard
                active={selectedIndex === index}
                data={location}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

MapSideBar.propTypes = {
  /** Information to render for each `MapPin` */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Callback function for when an item is clicked on */
  onSelect: PropTypes.func.isRequired,
  /** Determines if the `SideBar` is visible. */
  open: PropTypes.bool.isRequired,
  /** Current location to expand its contents */
  selectedIndex: PropTypes.number,
};

MapSideBar.defaultProps = {
  selectedIndex: undefined,
};

export default MapSideBar;
