import PropTypes from 'prop-types';
import React from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import SideScrollMoment from '../SlideScroll';
import useStyles from './useStyles';

export interface Person {
  description?: string;
  image?: string;
  label: string;
  relations?: string[];
  years?: string;
}

export interface PeopleMomentProps extends MomentProps {
  data: Person[];
}

/**
* Moment for visualizing people relevant to the `Story`'s main subject.
*/
const PeopleMoment = (props: PeopleMomentProps) => {
  const { data } = props;
  const classes = useStyles();
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <SideScrollMoment
      {...props}
      bodyClassName={classes.body}
    >
      {data.map(({
        description,
        image,
        label,
        relations,
        years,
      }) => (
        <CardBase
          key={label}
          style={{ maxWidth: '300px' }}
        >
          {image && (
            <CardImage
              alt={label}
              draggable={false}
              src={image}
            />
          )}
          <CardHeader text={label} />
          {years && (
            <CardPill text={years} />
          )}
          {relations && relations.map((relation) => (
            <CardSection key={relation}>
              {relation}
            </CardSection>
          ))}
          {description && (
            <CardDetail>
              {description}
            </CardDetail>
          )}
        </CardBase>
      ))}
    </SideScrollMoment>
  );
};

PeopleMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Determines the information to use in each `Card`. */
  data: PropTypes.arrayOf(PropTypes.object),
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

PeopleMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.SlideScroll,
  type: MomentType.People,
};

export default PeopleMoment;
