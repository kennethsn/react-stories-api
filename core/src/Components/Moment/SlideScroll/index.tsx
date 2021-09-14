import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import Draggable from 'react-draggable';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';
import './style.scss';

export interface SlideScrollMomentProps extends MomentProps {
  children: ReactNode;
}

/**
 * General SlideScroll card layout Moment.
 */
const SlideScrollMoment = (props: SlideScrollMomentProps) => {
  const { children } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentBase {...props}>
      <div className="slide-scroll-wrapper">
        <Draggable axis="x">
          <div className="slide-scroller-container">
            {React.Children.map(children, (card) => (
              <div className="slide-scroller-card --effect-grow">
                {card}
              </div>
            ))}
          </div>
        </Draggable>
      </div>
    </MomentBase>
  );
};

SlideScrollMoment.propTypes = {
  /** Children nodes used to fill the cards */
  children: PropTypes.node.isRequired,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
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

SlideScrollMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.SlideScroll,
  type: MomentType.SlideScroll,
};

export default SlideScrollMoment;
