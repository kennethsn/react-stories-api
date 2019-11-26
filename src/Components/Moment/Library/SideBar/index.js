import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, CssBaseline, Divider, Drawer, List, ListItem } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import CardImage from '../../../Card/Image';
import CardPill from '../../../Card/Pill';
import CardSection from '../../../Card/Section';
import FontAwesomeIcon from '../../../Icon/FontAwesome';

import './style.scss';

 /**
  * `SideBar` for the `LibraryMoment` to provide location information.
  */
function LibrarySideBar(props) {
  const { children, currentBook={}, onClose, open } = props;
  const { contribution, date, description, image, instance, label, url } = currentBook;


  return (
    <div className="">
      <CssBaseline />
      <main>
        {children}
      </main>
      <Drawer
        className="story-library-sidebar-drawer"
        anchor="right"
        open={open}
        onClose={onClose}
      >
        <CardBase>
          <CardHeader text={label} />
          <Divider />
          {instance && <div className="instance">{instance}</div>}
          {date && <CardPill text={date.label}/>}
          {image && <CardImage src={image} alt={`Image of ${label}`} />}
          {description && <CardSection>{description}</CardSection>}
          {url && (
            <Button
              className="library-sidebar-link"
              variant="contained"
              href={url}
              target="_blank"
            >
              Learn More
            </Button>
          )}
        </CardBase>
      </Drawer>
    </div>
  );
}

LibrarySideBar.propTypes = {
  /** Current location to expand its contents */
  currentBook: PropTypes.object,
  /** Information to render for each `MapPin` */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Callback function for when an item is clicked on */
  onSelect: PropTypes.func,
  /** Determines if the `SideBar` is visible. */
  open: PropTypes.bool.isRequired,
  /** Styling object of the `Card` */
  style: PropTypes.object,
};

export default LibrarySideBar;
