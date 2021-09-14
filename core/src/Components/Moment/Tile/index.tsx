import PropTypes from 'prop-types';
import React from 'react';
import Masonry from 'react-masonry-component';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import MomentBase from '../Base';
import './style.scss';

export interface TileMomentProps extends MomentProps {
}

const masonryOptions = {
  columnWidth: 1,
  fitWidth: true,
  gutter: 0,
  itemSelector: '.tile-card',
};

/**
 * General Tile card layout Moment.
 */
const TileMoment = (props: TileMomentProps) => {
  const { children, index } = props;
  const key = (tileIdx: number) => `tile-${tileIdx}-${index}`;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MomentBase {...props}>
      <div className="tile-wrapper">
        <Masonry
          className="tile-container"
          options={masonryOptions}
          updateOnEachImageLoad
        >
          {React.Children.map(children, (card, tileIdx) => (
            <div
              className="tile-card"
              key={key(tileIdx)}
            >
              {card}
            </div>
          ))}
        </Masonry>
      </div>
    </MomentBase>
  );
};

TileMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Used to serialize the order of the `Moment`s in a `Story` */
  index: PropTypes.number,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

TileMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.Tile,
  type: MomentType.Tile,
};

export default TileMoment;
