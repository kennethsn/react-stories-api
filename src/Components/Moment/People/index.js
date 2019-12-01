import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import SideScrollMoment from '../SlideScroll';

import './style.scss';

/**
* Moment for visualizing people relavent to the `Story`'s main subject.
*/
export default class PeopleMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Determines the information to use in each `Card`. */
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
  }

  static defaultProps = {
    type: "people",
  }

  renderCard(ctx){
    const { description, image, label, relations, years } = ctx;
    return (
      <CardBase style={{maxWidth: "300px"}}>
        {image && <CardImage src={image} draggable={false}/>}
        <CardHeader text={label}/>
        {years && <CardPill text={years} />}
        {relations && relations.map(relation => (
          <CardSection>{relation}</CardSection>
        ))}
        {description && <CardDetail>{description}</CardDetail>}
      </CardBase>
    )
  }

  render() {
    const { data } = this.props;

    return (
      <SideScrollMoment {...this.props}>
        {data.map(this.renderCard)}
      </SideScrollMoment>
    )
  }
}
