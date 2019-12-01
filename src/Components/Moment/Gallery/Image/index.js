import React, { Component } from 'react';
import { Dialog, Divider, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardHeader from '../../../Card/Header';
import './style.scss';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
 * Gallery image formatting component
 */
export default class GalleryImage extends Component {
  static propTypes = {
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
  }

  static defaultProps = {
    color: {
      background: "#ffc7ed9e",
      text: '#000',
    },
    noImage: false,
    style: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  };

  handleOpenDialog(){
    this.setState({active: true});
  }

  handleCloseDialog(){
    this.setState({active: false});
  }

  renderDialog(){
    const { active } = this.state;
    const { content, label, noImage, src } = this.props;

    let dialogClasses = "story-gallery-dialog";
    if (noImage) dialogClasses += ' no-image-layout';

    return (
      <Dialog
        className={dialogClasses}
        open={active}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleCloseDialog}
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
          <div className="close-btn" onClick={this.handleCloseDialog}>X</div>
        </div>
      ) : (
        <div className="story-gallery-dialog-body">
          <img className="dialog-image" src={src}/>
          <div className="story-gallery-dialog-body__content">
            <CardHeader text={label} />
            <Divider />
            <div className="lightbox-content">{content}</div>
          </div>
          <div className="close-btn" onClick={this.handleCloseDialog}>X</div>
        </div>
      )}
      </Dialog>
    )
  }

  render() {
    const { color, label, noImage, style, src } = this.props;
    const { active } = this.state;

    const contentStyle = {
      color: color.text,
      textShadow: `3px 2px 0px ${color.background}`
    };
    const imageStyle = {...style, backgroundImage: `url(${src})`};
    let containerClasses = "story-gallery-image-container";
    if (noImage) containerClasses += ' no-image-layout';
    return (
      <div className={containerClasses}>
        <div style={imageStyle}
          className="story-gallery-image"
          onClick={this.handleOpenDialog}
        >
          <div className="story-gallery-image__contents" style={contentStyle}>
            <div className="story-gallery-image__contents-label">{label}</div>
          </div>
        </div>
        {this.renderDialog()}
      </div>
    )
  }
}
