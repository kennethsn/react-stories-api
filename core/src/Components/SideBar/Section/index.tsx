import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { CSSProperties, ReactNode, useState } from 'react';

import { classList } from '../../../utils';
import CardSection from '../../Card/Section';
import FontAwesomeIcon from '../../Icon/FontAwesome';

import './style.scss';

export interface SideBarSectionProps {
  accentColor?: string;
  icon: ReactNode;
  index: number | string;
  isActive: boolean;
  onClick: (index: number | string) => void;
  style: CSSProperties;
  text: string;
  textColor: string;
}

/**
* Section for a `SideBar` Component.
*/
const SideBarSection = ({
  accentColor,
  icon,
  index,
  isActive,
  onClick,
  style,
  text,
  textColor,
}: SideBarSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleHover = () => setIsHovered(!isHovered);
  const cardSectionStyle = { textAlign: 'center' } as CSSProperties;
  let eventClass = '';
  if (isActive) {
    eventClass = '--active';
    cardSectionStyle.borderColor = accentColor;
    cardSectionStyle.color = accentColor;
    cardSectionStyle.backgroundColor = textColor;
  } else if (isHovered) {
    eventClass = '--hovered';
    cardSectionStyle.background = accentColor;
    cardSectionStyle.borderColor = textColor;
    cardSectionStyle.color = textColor;
  }
  const classes = classList('story-sidebar__section', eventClass);
  const handleClick = () => onClick(index);
  return (
    <div
      className={classes}
      onClick={handleClick}
      onKeyPress={handleClick}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      role="button"
      style={style}
      tabIndex={0}
    >
      <CardSection style={cardSectionStyle}>
        <Grid container>
          <Grid
            item
            xs={3}
          >
            {icon}
          </Grid>
          <Grid
            item
            xs={1}
          >
            <Divider orientation="vertical" />
          </Grid>
          <Grid
            className="story-sidebar-text"
            item
            xs={8}
          >
            <Typography variant="subtitle2">
              {text}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>
    </div>
  );
};

SideBarSection.propTypes = {
  /** The color to style the `SideBarSection` during events  */
  accentColor: PropTypes.string,
  /** The `SideBar` `Icon` that relates to the `Moment` */
  icon: PropTypes.element,
  /** Way to disambiguate this `SideBarSection` during a callback  */
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /** Determines if the `Moment` is currently rendered on the `Story`  */
  isActive: PropTypes.bool,
  /** Click handler callback used by the `SideBar` */
  onClick: PropTypes.func,
  /** Styling object of the `SideBar` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** The `SideBar` label of the `Moment` */
  text: PropTypes.string.isRequired,
  /** The color to style the `SideBarSection` text when active  */
  textColor: PropTypes.string,
};

SideBarSection.defaultProps = {
  accentColor: undefined,
  icon: (
    <FontAwesomeIcon name="FaInfoCircle" />
  ),
  isActive: false,
  onClick: () => {},
  style: {},
  textColor: undefined,
};

export default SideBarSection;
