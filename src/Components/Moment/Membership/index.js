import React, { Component } from 'react';
import { Button, Dialog, Grid, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';

import { hexToRgbA } from '../../../utils';
import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import ImageIcon from '../../Icon/Image';
import TileMoment from '../Tile';

import './style.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**
 * Moment to visualize organizations associated with the `Story`'s subject.
 */
export default class MembershipMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Determines the information to render. */
    data: PropTypes.arrayOf(PropTypes.object),
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

  static defaultProps = {
    type: "membership",
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  };

  handleSelect(item){
    this.setState({selected: item});
  };

  handleCloseDialog(){
    this.setState({selected: null});
  };

  renderDialog(item) {
    const { selected } = this.state;

    const open = (selected && selected == item);
    const { description, graphic, image, label, logo, website } = item;
    const mainImage = image || logo;
    const secondaryImage = ((mainImage == logo) || !logo) ? graphic.url : logo;

    return (
      <Dialog
        className="story-membership-dialog"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleCloseDialog}
      >
        <Grid container spacing={0}>
          <Grid item xs={5} className="story-membership-dialog-left">
            <CardImage src={mainImage}  />
          </Grid>
          <Grid item xs={7} className="story-membership-dialog-right">
            <CardBase>
              <CardImage src={secondaryImage} />
              <CardHeader text={label} />
              {website && (
                <div className="membership-dialog-button">
                  <Button
                    variant="contained"
                    href={website}
                    target="_blank"
                    style={{
                      background: graphic.background_color,
                      color: graphic.foreground_color
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              )}
              {description && (
                  <CardDetail>{description}</CardDetail>
              )}
            </CardBase>
          </Grid>
        </Grid>
      </Dialog>
    );
  };

  renderGraphics() {
    const { data } = this.props;

    return data.map((item, index) => (
      <div
        className="story-membership-graphic-container"
        style={{background: hexToRgbA(item.graphic.background_color, .2)}}
      >
        <div
          className="story-membership-graphic"
          onClick={() => this.handleSelect(item)}
        >
          <object type="image/svg+xml" data={item.graphic.url} />
        </div>
        {this.renderDialog(item)}
      </div>
    ));
  };

  render() {
    return (
      <TileMoment {...this.props}>
        {this.renderGraphics()}
      </TileMoment>
    );
  };

};
