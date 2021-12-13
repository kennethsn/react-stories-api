import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import {
  VerticalTimeline, VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps, StoriesAPIDate } from '../../../types';
import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import MomentBase from '../Base';
import useStyles from './useStyles';

export interface TimelineItem {
  date: StoriesAPIDate;
  description?: string;
  image?: string;
  title: string;
  website?: string;
}

export interface TimelineMomentProps extends MomentProps {
  data: TimelineItem[];
}

/**
 * General Timeline card layout Moment.
 */
const TimelineMoment = (props: TimelineMomentProps) => {
  const { bodyClassName, color, data } = props;
  const classes = useStyles();
  const renderCard = ({
    date,
    description,
    image,
    title,
    website,
  }: TimelineItem) => (
    <CardBase>
      {image && (
        <CardImage
          alt={title}
          src={image}
        />
      )}
      <CardHeader text={title} />
      <Divider />
      <CardSection>
        <CardPill text={date.label} />
      </CardSection>
      {description && (
        <CardDetail>
          {description}
        </CardDetail>
      )}
      {website && (
        <CardDetail>
          <Button
            className="library-sidebar-link"
            href={website}
            target="_blank"
            variant="contained"
          >
            Learn More
          </Button>
        </CardDetail>
      )}
    </CardBase>
  );
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <MomentBase
      {...props}
      bodyClassName={`${classes.root} ${bodyClassName}`}
    >
      <VerticalTimeline>
        {
          data.map((ctx) => (
            <VerticalTimelineElement
              className="story-timeline__element"
              icon={(
                <div
                  className="story-timeline__element__icon"
                  style={{ alignItems: 'center', display: 'flex', height: '100%' }}
                >
                  <div style={{ fontWeight: 800, textAlign: 'center', width: '100%' }}>
                    {ctx.date.year}
                  </div>
                </div>
              )}
              iconStyle={{ background: color.background, color: color.text }}
              key={`${ctx.date.year}-${ctx.title}`}
              style={{ padding: 0 }}
            >
              {renderCard(ctx)}
            </VerticalTimelineElement>
          ))
        }
      </VerticalTimeline>
    </MomentBase>
  );
};

TimelineMoment.propTypes = {
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
};

TimelineMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Timeline,
  type: MomentType.Timeline,
};

export default TimelineMoment;
