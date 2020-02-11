import React, { useState } from 'react';
import { Dialog, Divider, makeStyles, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardHeader from '../../../Card/Header';
import './style.scss';


const useStyles = makeStyles(theme => ({
  dialog: {
    background: "none",
    boxShadow: "none",
    maxWidth: "60vw",
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
 * Gallery image formatting component
 */
function GalleryImage(props) {
  const { className, color, content, label, noImage, style, src } = props;
  const classes = useStyles();
  const [active, setActive] = useState(false);

  const handleCloseDialog = () => {
    setActive(false);
  };

  const handleOpenDialog = () => {
    setActive(true);
  };

  const renderDialog = () => {
    let dialogClasses = "story-gallery-dialog";
    if (noImage) dialogClasses += ' no-image-layout';

    return (
      <Dialog
        className={dialogClasses}
        open={active}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        classes={{paper: classes.dialog}}
      >
      {noImage ? (
        <div
          className="story-gallery-dialog-body no-image-layout"
          style={{backgroundImage: `url(${src})`}}
        >
          <div className="story-gallery-dialog-body__inner">
            <CardHeader text={label} />
            <Divider />
            <div className="lightbox-content">{content}</div>
          </div>
          <div className="close-btn" onClick={handleCloseDialog}>X</div>
        </div>
      ) : (
        <div className="story-gallery-dialog-body">
          <img className="dialog-image" src={src}/>
          <div className="story-gallery-dialog-body__content">
            <CardHeader text={label} />
            <Divider />
            <div className="lightbox-content">{content}</div>
          </div>
          <div className="close-btn" onClick={handleCloseDialog}>X</div>
        </div>
      )}
      </Dialog>
    )
  };



  const contentStyle = {
    color: color.text,
    textShadow: `3px 2px 0px ${color.background}`
  };
  const imageStyle = {...style, backgroundImage: `url(${src})`};
  let containerClasses = className + " story-gallery-image-container";
  if (noImage) containerClasses += ' no-image-layout';
  return (
    <div className={containerClasses}>
      <div style={imageStyle}
        className="story-gallery-image"
        onClick={handleOpenDialog}
      >
        <div className="story-gallery-image__contents" style={contentStyle}>
          <div className="story-gallery-image__contents-label">{label}</div>
        </div>
      </div>
      {renderDialog()}
    </div>
  )
};

GalleryImage.propTypes = {
  /** Determines the background and text color of the `Image` label. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Content to go underneath the title in a detail page */
  content: PropTypes.any,
  /** Determines the main text of the `Image`. */
  label: PropTypes.string,
  /** Determines if the layout should emphasize the text or the image. */
  noImage: PropTypes.bool,
  /** The destination URL of the `Image` */
  src: PropTypes.string.isRequired,
};

GalleryImage.defaultProps = {
  color: {
    background: "#ffc7ed9e",
    text: '#000',
  },
  noImage: false,
  style: {},
};

export default GalleryImage;
