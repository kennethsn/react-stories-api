import React, { useState } from 'react';
import { Button, CssBaseline, Divider, Drawer } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardBase from '../../../Card';
import CardHeader from '../../../Card/Header';
import CardImage from '../../../Card/Image';
import CardPill from '../../../Card/Pill';
import CardSection from '../../../Card/Section';

import './style.scss';


/**
* `SideBar` for the `LibraryMoment` to provide location information.
*/
function LibrarySideBar(props) {
  const { children, currentBook, onClose, open } = props;

  const { date, description, image, instance, label, url } = currentBook;

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
  /** Current information to render */
  currentBook: PropTypes.object,
  /** Determines if the `SideBar` is visible. */
  open: PropTypes.bool.isRequired,
  /** Styling object of the `Card` */
  style: PropTypes.object,
};

LibrarySideBar.defaultProps = {
  currentBook: {},
}

export default LibrarySideBar;
