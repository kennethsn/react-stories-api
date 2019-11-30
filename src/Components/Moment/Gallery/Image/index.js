import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, Divider, Slide } from '@material-ui/core';

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
    /** The destination URL of the `Image` */
    src: PropTypes.string.isRequired,
  }

  static defaultProps = {
    color: {
      background: "#ffc7ed9e",
      text: '#000',
    },
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
    this.setState({active: true})
  }

  handleCloseDialog(){
    this.setState({active: false})
  }

  renderDialog(){
    const { active } = this.state;
    const { content, label, src } = this.props;
    return (
      <Dialog
        className="story-gallery-dialog"
        open={active}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleCloseDialog}
      >

      <div class="story-gallery-dialog-body">
        <img className="dialog-image" src={src}/>
        <div class="story-gallery-dialog-body__content">
          <CardHeader text={label} />
          <Divider />
          <div class="lightbox-content">{content}</div>
        </div>
        <div class="close-btn" onClick={this.handleCloseDialog}>X</div>

      </div>
      </Dialog>
    )
  }

  render() {
    const { color, label, style, src } = this.props;
    const { active } = this.state;

    const contentStyle = {
      color: color.text,
      textShadow: `3px 2px 0px ${color.background}`
    };
    const imageStyle = {...style, backgroundImage: `url(${src})`};

    return (
      <div className="story-gallery-image-container">
        <div style={imageStyle} className="story-gallery-image" onClick={this.handleOpenDialog}>
          <div className="story-gallery-image__contents" style={contentStyle}>
            <div className="story-gallery-image__contents-label">{label}</div>
          </div>
        </div>
        { this.renderDialog()}
      </div>
    )
  }
}
