import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';

import { Color } from '../../../../types';
import CardHeader from '../../../Card/Header';
import Transition from '../../../Transition';
import './style.scss';
import useStyles from './useStyles';

export interface Props {
  className?: string;
  color: Color;
  content?: ReactNode;
  label: string;
  noImage: boolean;
  style?: object;
  src?: string;
}

/**
 * Gallery image formatting component
 */
const GalleryImage = ({
  className,
  color,
  content,
  label,
  noImage,
  style,
  src,
}: Props) => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const handleCloseDialog = () => setActive(false);
  const handleOpenDialog = () => setActive(true);
  const closeBtn = (
    <div
      className="close-btn"
      onClick={handleCloseDialog}
      onKeyPress={handleCloseDialog}
      role="button"
      tabIndex={0}
    >
      X
    </div>
  );
  const renderDialog = () => {
    let dialogClasses = 'story-gallery-dialog';
    if (noImage) dialogClasses += ' no-image-layout';
    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        className={dialogClasses}
        keepMounted
        onClose={handleCloseDialog}
        open={active}
        TransitionComponent={Transition}
      >
        {noImage ? (
          <div
            className="story-gallery-dialog-body no-image-layout"
            style={{ backgroundImage: `url(${src})` }}
          >
            <div className="story-gallery-dialog-body__inner">
              <CardHeader text={label} />
              <Divider />
              <div className="lightbox-content">
                {content}
              </div>
            </div>
            {closeBtn}
          </div>
        ) : (
          <div className="story-gallery-dialog-body">
            <img
              alt={label}
              className="dialog-image"
              src={src}
            />
            <div className="story-gallery-dialog-body__content">
              <CardHeader text={label} />
              <Divider />
              <div className="lightbox-content">
                {content}
              </div>
            </div>
            {closeBtn}
          </div>
        )}
      </Dialog>
    );
  };
  const contentStyle = {
    color: color.text,
    textShadow: `3px 2px 0px ${color.background}`,
  };
  const imageStyle = { ...style, backgroundImage: `url(${src})` };
  let containerClasses = `${className} story-gallery-image-container`;
  if (noImage) containerClasses += ' no-image-layout';
  return (
    <div className={containerClasses}>
      <div
        className="story-gallery-image"
        onClick={handleOpenDialog}
        onKeyDown={handleOpenDialog}
        role="button"
        style={imageStyle}
        tabIndex={0}
      >
        <div
          className="story-gallery-image__contents"
          style={contentStyle}
        >
          <div className="story-gallery-image__contents-label">
            {label}
          </div>
        </div>
      </div>
      {renderDialog()}
    </div>
  );
};

GalleryImage.propTypes = {
  /** Determines the background and text color of the `Image` label. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Content to go underneath the title in a detail page */
  content: PropTypes.node,
  /** Determines the main text of the `Image`. */
  label: PropTypes.string.isRequired,
  /** Determines if the layout should emphasize the text or the image. */
  noImage: PropTypes.bool,
  /** The destination URL of the `Image` */
  src: PropTypes.string.isRequired,
  /** Custom CSS Props for the `Image` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

GalleryImage.defaultProps = {
  color: {
    background: '#ffc7ed9e',
    text: '#000',
  },
  content: undefined,
  noImage: false,
  style: {},
};

export default GalleryImage;
