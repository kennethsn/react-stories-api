import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { MOMENT_BASE_DEFAULT_PROPS, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import { hexToRgbA } from '../../../utils';
import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import Transition from '../../Transition';
import TileMoment from '../Tile';
import './style.scss';

export interface MembershipItem {
  description?: string;
  graphic: {
    background_color: string;
    foreground_color: string;
    url: string;
  };
  image?: string;
  label: string;
  logo?: string;
  website?: string;
}

export interface MembershipMomentProps extends MomentProps {
  data: MembershipItem[];
}

const key = ({ label }: MembershipItem, index: number) => `${index}-${label}`;

/**
 * Moment to visualize organizations associated with the `Story`'s subject.
 */
const MembershipMoment = (props: MembershipMomentProps) => {
  const { data } = props;
  const [selected, setSelected] = useState('');
  const handleCloseDialog = () => setSelected('');
  const renderDialog = (item: MembershipItem, index: number) => {
    const open = (!!selected && selected === key(item, index));
    const {
      description,
      graphic,
      image,
      label,
      logo,
      website,
    } = item;
    const mainImage = image || logo || '';
    const secondaryImage = ((mainImage === logo) || !logo) ? graphic.url : logo;
    return (
      <Dialog
        className="story-membership-dialog"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <Grid
          container
          spacing={0}
        >
          <Grid
            className="story-membership-dialog-left"
            item
            xs={5}
          >
            <CardImage
              alt={label}
              src={mainImage}
            />
          </Grid>
          <Grid
            className="story-membership-dialog-right"
            item
            xs={7}
          >
            <CardBase>
              <CardImage
                alt={label}
                src={secondaryImage}
              />
              <CardHeader text={label} />
              {website && (
                <div className="membership-dialog-button">
                  <Button
                    href={website}
                    style={{
                      background: graphic.background_color,
                      color: graphic.foreground_color,
                    }}
                    target="_blank"
                    variant="contained"
                  >
                    Learn More
                  </Button>
                </div>
              )}
              {description && (
                <CardDetail>
                  {description}
                </CardDetail>
              )}
            </CardBase>
          </Grid>
        </Grid>
      </Dialog>
    );
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TileMoment {...props}>
      {data.map((item, index) => (
        <div
          className="story-membership-graphic-container"
          key={key(item, index)}
          style={{ background: hexToRgbA(item.graphic.background_color, 0.2) }}
        >
          <div
            className="story-membership-graphic"
            onClick={() => setSelected(key(item, index))}
            onKeyPress={() => setSelected(key(item, index))}
            role="button"
            tabIndex={0}
          >
            <object
              aria-label="Graphic Background"
              data={item.graphic.url}
              type="image/svg+xml"
            />
          </div>
          {renderDialog(item, index)}
        </div>
      ))}
    </TileMoment>
  );
};

MembershipMoment.propTypes = {
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Determines the information to render. */
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

MembershipMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  type: MomentType.Membership,
};

export default MembershipMoment;
