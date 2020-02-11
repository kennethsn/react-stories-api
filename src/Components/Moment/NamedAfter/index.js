import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types'

import GalleryMoment from '../Gallery';
import GalleryImage from '../Gallery/Image';


const useStyles = makeStyles(theme => ({
  momentBody: {
    background: theme.palette.grey[200],
  },
  sideBar: {
    width: "40%",
    maxWidth: 500,
  },
  button: {
    marginTop: 10,
    fontSize: "75%",
    zIndex: 1,
  },
  galleryImage: {
    maxWidth: 300
  }
}));


/**
 * Moment to display entities that are named after the `Story`'s subject'.
 */
function NamedAfterMoment(props) {
  const { color, data } = props;
  const classes = useStyles();

  return (
    <GalleryMoment
      bodyClassName={classes.momentBody}
      {...props}
    >
      {data.map(({ description, image, fallback, label, website }) => (
        <GalleryImage
          color={color}
          label={label}
          noImage={image ? false : true}
          src={image || fallback}
          className={classes.galleryImage}
          content={(
            <div className="named-after-item-content">
              {description && (
                <div className="named-after-item-content__description">
                  {description}
                </div>
              )}
              {website && (
                <Button
                  className={classes.button}
                  style={{background: color.background, color: color.text}}
                  target="_blank"
                  href={website}
                  variant="contained"
                >
                  Learn More
                </Button>
              )}
            </div>
          )}
        />
      ))}
    </GalleryMoment>
  )
}

NamedAfterMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Information to build the `GalleryImage`s */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Determines the `SideBarSection` `Icon` of the `Moment`. */
  icon: PropTypes.element,
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Determines the `SideBarSection` text of the `Moment`. */
  label: PropTypes.string,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

NamedAfterMoment.defaultProps = {
  type: "named_after",
};

export default NamedAfterMoment;
