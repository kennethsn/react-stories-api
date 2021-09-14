import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import { STORIES_API_HOMEPAGE } from '../../constants';
import { MomentProps } from '../../types';
import { classList } from '../../utils';
import SideBarSection, { SideBarSectionProps } from './Section';
import useStyles from './useStyles';

export interface Props {
  activeIndex?: number | string;
  children: ReactNode;
  description?: string;
  image?: string;
  onSelect: (index: number | string) => void;
  logo?: ReactNode | string;
  title: string;
  type?: string;
}

interface SidebarMomentProps extends MomentProps {
  icon: ReactNode;
  index: number;
  label: string;
}

interface SidebarChild {
  props: SidebarMomentProps
}

/**
* Story SideBar component.
*/
const SideBar = ({
  activeIndex,
  children,
  description,
  image,
  logo,
  onSelect,
  title,
  type,
}: Props) => {
  const classes = useStyles();
  /* eslint-disable react/jsx-props-no-spreading */
  const sections = React.Children.map(children, ({ props: childProps }: SidebarChild) => {
    const {
      color,
      icon,
      index,
      label,
    } = childProps;
    const sectionProps = {
      icon,
      index,
      isActive: activeIndex === index,
      onClick: onSelect,
      text: label,
    } as SideBarSectionProps;
    if (color) {
      sectionProps.accentColor = color.background;
      sectionProps.textColor = color.text;
    }
    return (
      <SideBarSection
        {...sectionProps}
        key={index}
      />
    );
  });
  const containerClasses = classList(classes.sideBar, 'story-sidebar', `story-sidebar-${type}`);
  return (
    <div className={containerClasses}>
      {logo && (
        <div className={classes.logoContainer}>
          {logo}
        </div>
      )}
      {(title || description) && (
        <div className={classes.title}>
          <Typography
            color="primary"
            variant="overline"
          >
            {title}
            <Divider />
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {description}
          </Typography>
        </div>
      )}
      {image && (
        <CardMedia
          className={classes.image}
          component="img"
          image={image}
          title={title}
        />
      )}
      {sections}
      <div className={classes.footer}>
        <Button
          className={classes.link}
          color="secondary"
          href={STORIES_API_HOMEPAGE}
          target="_blank"
        >
          POWERED BY THE STORIES SERVICES
        </Button>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** List of `Moment`s to render information from */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.element,
  onSelect: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
};

SideBar.defaultProps = {
  activeIndex: undefined,
  description: undefined,
  image: undefined,
  logo: undefined,
  onSelect: () => {},
  title: '',
  type: 'base',
};

export default SideBar;
