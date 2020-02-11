import React, { Component } from 'react';
import { Button, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  VerticalTimeline, VerticalTimelineElement
}  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import MomentBase from '../Base';

import './style.scss';

/**
 * General Timeline card layout Moment.
 */
export default class TimelineMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Determines the Timeline information to use. */
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
    /** The source of the iFrame to render in the `Moment`'s body. */
    url: PropTypes.string.isRequired,

  }
  static defaultProps = {
    type: "timeline",
  }

  renderCard(ctx){
    const { date, description, image, title, website } = ctx;
    return (
      <CardBase>
        {image && <CardImage src={image}/>}
        <CardHeader text={title}/>
        <Divider />
        <CardSection>
          <CardPill text={date.label} />
        </CardSection>
        {description && <CardDetail>{description}</CardDetail>}
        {website && (
          <CardDetail>
            <Button
              className="library-sidebar-link"
              variant="contained"
              href={website}
              target="_blank"
            >
              Learn More
            </Button>
          </CardDetail>
        )}
      </CardBase>
    )
  }

  renderIcon(year){
    return (
      <div
        className="story-timeline__element__icon"
        style={{height: "100%", display: "flex", alignItems: "center"}}
      >
        <div style={{width: "100%", textAlign: "center", fontWeight:800}}>
          {year}
        </div>
      </div>
    )
  }

  render() {
    const { color, data } = this.props;

    const layout="timeline"; // TODO: Add constant
    const iconStyle = {background: color.background, color: color.text};

    return (
      <MomentBase {...this.props} layout={layout}>
        <VerticalTimeline>
          {
            data.map(ctx => (
              <VerticalTimelineElement
                className="story-timeline__element"
                icon={this.renderIcon(ctx.date.year)}
                iconStyle={iconStyle}
                stye={{padding: 0}}
              >
                {this.renderCard(ctx)}
              </VerticalTimelineElement>
            ))
          }
        </VerticalTimeline>
      </MomentBase>
    )
  }
}
