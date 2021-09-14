import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import { classList } from '../../../utils';
import CardDetail from '../../Card/Detail';
import CardImage from '../../Card/Image';
import MomentBase from '../Base';
import './style.scss';
import useStyles from './useStyles';

export interface ImageMomentProps extends MomentProps {
  caption?: string;
  direction: 'column' | 'row';
  label: string;
  url: string;
}

/**
 * General Image layout Moment.
 */
const ImageMoment = (props: ImageMomentProps) => {
  const {
    caption,
    direction,
    label,
    url,
  } = props;
  const classes = useStyles();
  const containerClasses = classList(
    'moment-image-container',
    `moment-image-container-${direction}`,
  );
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase
      {...props}
      bodyClassName={classes.momentBody}
    >
      {caption ? (
        <div className={containerClasses}>
          <div className="moment-image-container__image">
            <CardImage
              alt={label}
              src={url}
            />
          </div>
          <div className="moment-image-container__caption">
            <CardDetail>
              {caption}
            </CardDetail>
          </div>
        </div>
      ) : (
        <Grid
          className={classes.simpleGridContainer}
          container
          justifyContent="center"
        >
          <Grid
            className={classes.simpleGrid}
            item
            md={8}
            xs={10}
          >
            <img
              alt={label}
              className={classes.simple}
              src={url}
            />
          </Grid>
        </Grid>
      )}
    </MomentBase>
  );
};

ImageMoment.propTypes = {
  /** Information to accompany the `Image`. */
  caption: PropTypes.node,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  direction: PropTypes.oneOf(['row', 'column']),
  /** Additional Props to pass to the `Image`. */
  // eslint-disable-next-line react/forbid-prop-types
  img: PropTypes.object,
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
  /** The source of the Image to render in the `Moment`'s body. */
  url: PropTypes.string.isRequired,
};

ImageMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  direction: 'row',
  label: '',
  layout: MomentLayout.Image,
  type: MomentType.Image,
};

export default ImageMoment;
