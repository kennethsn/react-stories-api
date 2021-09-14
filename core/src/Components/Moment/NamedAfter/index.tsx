import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import GalleryMoment from '../Gallery';
import GalleryImage from '../Gallery/Image';
import useStyles from './useStyles';

export interface NamedAfterItem {
  description?: string;
  fallback: string;
  image?: string;
  label: string;
  website?: string;
}

export interface NamedAfterMomentProps extends MomentProps {
  data: NamedAfterItem[];
}

/**
 * Moment to display entities that are named after the `Story`'s subject'.
 */
const NamedAfterMoment = (props: NamedAfterMomentProps) => {
  const { color, data } = props;
  const classes = useStyles();
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <GalleryMoment
      {...props}
      bodyClassName={classes.momentBody}
    >
      {data.map(({
        description,
        image,
        fallback,
        label,
        website,
      }) => (
        <GalleryImage
          className={classes.galleryImage}
          color={color}
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
                  href={website}
                  style={{ background: color.background, color: color.text }}
                  target="_blank"
                  variant="contained"
                >
                  Learn More
                </Button>
              )}
            </div>
          )}
          key={label}
          label={label}
          noImage={!image}
          src={image || fallback}
        />
      ))}
    </GalleryMoment>
  );
};

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
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Tile,
  type: MomentType.NamedAfter,
};

export default NamedAfterMoment;
