import React, { useState } from 'react';
import clsx from 'clsx';
import { CssBaseline, Drawer, List, ListItem } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import CardImage from '../../../Card/Image';
import FontAwesomeIcon from '../../../Icon/FontAwesome'
import MapInfoCard from '../InfoCard';

import { useStyles } from './constants';
import './style.scss';

 /**
  * `SideBar` for the `MapMoment` to provide location information.
  */
function MapSideBar(props) {
  const { children, currentLocation, data, onSelect, open } = props;
  const classes = useStyles();
  const theme = useTheme();

  const handleSelectLocation = (location) => {
    return onSelect(location);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      {children}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {data.map((location, index) => (
            <ListItem button
              onClick={() => handleSelectLocation(location)}
              key={location}
              divider={true}
            >
              <MapInfoCard
                data={location}
                active={currentLocation == location}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

MapSideBar.propTypes = {
  /** Current location to expand its contents */
  currentLocation: PropTypes.object,
  /** Information to render for each `MapPin` */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Callback function for when an item is clicked on */
  onSelect: PropTypes.func,
  /** Determines if the `SideBar` is visible. */
  open: PropTypes.bool.isRequired,
  /** Styling object of the `Card` */
  style: PropTypes.object,
};

export default MapSideBar;
