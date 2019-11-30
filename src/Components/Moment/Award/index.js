import React, { Component } from 'react';
import { Button, Divider } from '@material-ui/core';
import PropTypes from 'prop-types'

import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import MerryGoRoundMoment from '../MerryGoRound';

import AwardCertificate from './Certificate';
import './style.scss';

/**
 * Moment to display achievements.
 */
export default class AwardMoment extends Component {
  static propTypes = {
    /** Determines the background and text color of the `Moment` header. */
    color: PropTypes.shape({
      background: PropTypes.string,
      text: PropTypes.string,
    }),
    /** Information to build the `AwardCertificate`s */
    data: PropTypes.object.isRequired,
    /** Determines the `SideBarSection` `Icon` of the `Moment`. */
    icon: PropTypes.element,
    /** Used to serialize the order of the `Moment`s in a `Story` */
    index: PropTypes.number,
    /** Determines the `SideBarSection` text of the `Moment`. */
    label: PropTypes.string,
    /** Determines the name written on the `AwardCertificate`s. */
    name: PropTypes.string,
    /** Paragraph text underneath the title in `Moment` header */
    subtitle: PropTypes.string,
    /** Main heading element of the `Moment` */
    title: PropTypes.node,
    /** The type of `Moment` */
    type: PropTypes.string,
  }

  static defaultProps = {
    type: "award",
  }

  renderCertificates(){
    const { data, name } = this.props;
    return data.map(award => <AwardCertificate name={name} {...award} />);
  };

  renderSideBarContent(award){
    if (!award) return ;
    const { color, conferred_by, image, label, website } = award.props;

    return (
      <div className="sidebar-award">
        <div className="sidebar-award-body">
          <CardHeader text={label} />
          <Divider />
          <div className="sidebar-award-certificate">{award}</div>
          <Divider />
          {image && <CardImage src={image} alt={`Image of ${label}`}/>}
          {website && (
            <Button
              style={{background: color.light}}
              target="_blank"
              href={website}
              variant="contained"
            >
              Learn More
            </Button>
          )}
        </div>

        <div className="sidebar-award-footer">
          {conferred_by && (
            <CardDetail>
              <div className="sidebar-award-footer-title">
                This Award is Presented by {conferred_by.label}
              </div>
              <Divider />
              {conferred_by.description}
            </CardDetail>
          )}
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.props;
    const layout="award"; // TODO: Add constant

    return (
      <MerryGoRoundMoment
        {...this.props}
        layout={layout}
        sideBarContent={this.renderSideBarContent}
      >
        {this.renderCertificates()}
      </MerryGoRoundMoment>
    )
  }
}
