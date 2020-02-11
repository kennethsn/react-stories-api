import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';
import SideScrollMoment from '../SlideScroll';


const useStyles = makeStyles(theme => ({
  body: {
    background: theme.palette.background.paper,
  }
}));


/**
* Moment for visualizing people relavent to the `Story`'s main subject.
*/
function PeopleMoment(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <SideScrollMoment bodyClassName={classes.body} {...props}>
      {data.map(({ description, image, label, relations, years }) => (
        <CardBase style={{maxWidth: "300px"}}>
          {image && <CardImage src={image} draggable={false}/>}
          <CardHeader text={label} />
          {years && <CardPill text={years} />}
          {relations && relations.map(relation => (
            <CardSection>{relation}</CardSection>
          ))}
          {description && <CardDetail>{description}</CardDetail>}
        </CardBase>
      ))}
    </SideScrollMoment>
  )
}

PeopleMoment.propTypes = {
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

PeopleMoment.defaultProps = {
  type: "people",
}

export default PeopleMoment;
