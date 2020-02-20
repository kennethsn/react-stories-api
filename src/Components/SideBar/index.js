import React from 'react';
import { Button, CardMedia, Divider, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { STORIES_API_HOMEPAGE } from '../../constants';
import { classList } from '../../utils';

import SideBarSection from './Section';


const useStyles = makeStyles(theme => ({
  logoContainer: {
    padding: theme.spacing(3),
  },
  sideBar: {
    overflowY: "scroll",
    background: theme.palette.background.default,
    boxShadow: theme.shadows[3],
  },
  image: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  footer: {
    textAlign: "center",
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
  },
  link: {
    textAlign: "center",
    color: theme.palette.secondary.main,
    fontSize: 9,
  },
}));


 /**
  * Story SideBar component.
  */
function SideBar(props) {
  const { activeIndex, children, description, image, type, onSelect, logo, title } = props;
  const classes = useStyles();
  const renderSections = () => {
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

  const containerClasses = classList(
    classes.sideBar,
    'story-sidebar',
    `story-sidebar-${type}`
  );

  return (
    <div className={containerClasses}>
      {logo && (
        <div className={classes.logoContainer}>
          {logo}
        </div>
      )}

      {(title || description) && (
        <div className={classes.title}>
          <Typography color="primary" variant="overline">
            {title}
            <Divider />
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {description}
          </Typography>
        </div>
      )}
      {image && (
        <CardMedia
          className={classes.image}
          component="img"
          image={image}
          title={`image of ${title}`}
        />
      )}
      {renderSections()}
      <div className={classes.footer}>
        <Button
          className={classes.link}
          target="_blank"
          href={STORIES_API_HOMEPAGE}
        >
          POWERED BY THE STORIES API
        </Button>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  activeIndex: PropTypes.any,
  /** List of `Moment`s to render information from */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  logo: PropTypes.any,
  onSelect: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

SideBar.defaultProps = {
  onSelect: () => {},
};

export default SideBar;
