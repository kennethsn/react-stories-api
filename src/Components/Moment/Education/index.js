import React, { Component } from 'react';
import { Button, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import ImageIcon from '../../Icon/Image';
import ParallaxImage from '../../ParallaxImage';
import Pipe from '../../Pipe';
import ParallaxMoment from '../Parallax';

import './style.scss';


/**
* Visualizing Education Institutions.
*/
export default class EducationMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Information to build the `ParallaxImage`s */
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
  }

  static defaultProps = {
    type: "education",
  }

  renderImages(){
    const { color, data } = this.props;

    const imageColor = color.text;

    return data.map(({
      degrees, description, image, label, logo, website, years
    }) => (
      <ParallaxImage src={image} color={imageColor}>
        <div className="story-education-card">
          <CardBase>
            <CardHeader
              text={logo ? (
                <div>
                  <ImageIcon url={logo} name={`Logo of ${label}`} />
                  <Pipe type="thin" />
                  {label}
                </div>) : label}
            />
            {years && <CardPill text={years} />}
            {degrees && <CardSection>{degrees}</CardSection>}
            {description && <CardDetail>{description}</CardDetail>}
            {website && (
              <CardDetail>
                <Button
                  className="library-sidebar-link"
                  variant="contained"
                  href={website}
                  target="_blank"
                  style={{color: imageColor, background: color.background}}
                >
                  Learn More
                </Button>
              </CardDetail>
            )}
          </CardBase>
        </div>
      </ParallaxImage>
    ))
  }

  render() {
    return (
      <ParallaxMoment {...this.props}>
        {this.renderImages()}
      </ParallaxMoment>
    )
  }
}
