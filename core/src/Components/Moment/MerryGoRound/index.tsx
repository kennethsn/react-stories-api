import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import { MOMENT_BASE_DEFAULT_PROPS, MomentLayout, MomentType } from '../../../constants';
import { MomentProps } from '../../../types';
import SideBarMoment from '../SideBar';
import './style.scss';

export interface MerryGoRoundMomentProps extends MomentProps {
  children: ReactElement[];
  sideBarContent?: (element: ReactElement) => ReactElement | undefined;
  style: CSSProperties;
}

/**
* MerryGoRound Moment to interactively visualize works and publications.
*/
const MerryGoRoundMoment = (props: MerryGoRoundMomentProps) => {
  const { children, sideBarContent, style } = props;
  const [currentChild, setCurrentChild] = useState(undefined as ReactElement | undefined);
  const [sidebar, setSidebar] = useState(false);
  const rootRef = useRef(null);
  const figureRef = useRef(null);
  const childCount = children.length;
  const withNav = childCount > 2;
  const handleCloseSidebar = () => setSidebar(false);
  const handleSelectChild = (child: ReactElement) => () => {
    setCurrentChild(child);
    setSidebar(true);
  };
  const loadMerryGoRound = () => {
    const root = rootRef.current as HTMLElement | null;
    const figure = figureRef.current as HTMLElement | null;
    if (!root || !figure) return;
    const nextNavigator = root.querySelector('.merry-go-round-navigate-next');
    const prevNavigator = root.querySelector('.merry-go-round-navigate-prev');
    const childrenNodes = figure.children as HTMLCollection;
    const gap = 80;
    const bfc = 'bfc' in root.dataset;
    const theta = (2 * Math.PI) / childCount;
    let currImage = 0;
    const rotateCarousel = (imageIndex: number) => {
      figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    };
    const setupCarousel = (childIndex: number, childWidth: number) => {
      const apothem = childWidth / (2 * Math.tan(Math.PI / childCount));
      const transformOrigin = `50% 50% ${-apothem}px`;
      figure.style.transformOrigin = transformOrigin;
      Array.from(childrenNodes).forEach((_, index) => {
        const childStyle = (childrenNodes[index] as HTMLElement).style;
        childStyle.padding = `${gap}px`;
        childStyle.transformOrigin = transformOrigin;
        childStyle.transform = `rotateY(${index * theta}rad)`;
        if (bfc) {
          childStyle.backfaceVisibility = 'hidden';
        }
      });
      rotateCarousel(childIndex);
    };
    const setupNavigation = () => {
      nextNavigator?.addEventListener('click', (e) => {
        e.stopPropagation();
        currImage += 1;
        rotateCarousel(currImage);
      }, true);
      prevNavigator?.addEventListener('click', (e) => {
        e.stopPropagation();
        currImage -= 1;
        rotateCarousel(currImage);
      }, true);
    };
    const getChildWidth = () => parseFloat(getComputedStyle(childrenNodes[0]).width);
    setupCarousel(currImage, getChildWidth());
    window.addEventListener('resize', () => {
      setupCarousel(currImage, getChildWidth());
    });
    setupNavigation();
  };
  useEffect(() => {
    if (withNav) {
      loadMerryGoRound();
    }
  }, [figureRef, rootRef]);
  const childKey = (index: number) => `mgr-child-${index}`;
  const renderChildren = () => {
    if (!withNav) {
      return (
        <Grid
          container
          justifyContent="center"
          spacing={5}
        >
          {React.Children.map(children, (child, index) => (
            <Grid
              item
              key={childKey(index)}
              onClick={handleSelectChild(child)}
              onKeyPress={handleSelectChild(child)}
              role="button"
              tabIndex={0}
              xs={5}
            >
              {child}
            </Grid>
          ))}
        </Grid>
      );
    }
    return React.Children.map(children, (child, index) => (
      <div
        className="merry-go-round__horse"
        key={childKey(index)}
        onClick={handleSelectChild(child)}
        onKeyPress={handleSelectChild(child)}
        role="button"
        tabIndex={0}
      >
        {child}
      </div>
    ));
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <SideBarMoment
      {...props}
      onClose={handleCloseSidebar}
      sidebar={sidebar}
      sideBarContent={currentChild && sideBarContent && sideBarContent(currentChild)}
    >
      <div
        className="merry_go_round-wrapper"
        style={style}
        ref={rootRef}
      >
        <div
          className={withNav ? 'merry-go-round_figure' : 'merry-go-round_figure-no-nav'}
          ref={figureRef}
        >
          {renderChildren()}
        </div>
        {withNav && (
          <div className="merry-go-round-navigation">
            <Button
              className="merry-go-round-navigate merry-go-round-navigate-prev"
              variant="contained"
            >
              <MdArrowBack />
            </Button>
            <Button
              className="merry-go-round-navigate merry-go-round-navigate-next"
              variant="contained"
            >
              <MdArrowForward />
            </Button>
          </div>
        )}
      </div>
    </SideBarMoment>
  );
};

MerryGoRoundMoment.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /** Determines the background and text color of the `Moment` header. */
  color: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /** Render function to fill the `SideBar` `Drawer`. */
  sideBarContent: PropTypes.func.isRequired,
  /** Class name for the `SideBar` `Drawer` root. */
  sideBarClassName: PropTypes.string,
  /** Styling object of the moment body container */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /** Paragraph text underneath the title in `Moment` header */
  subtitle: PropTypes.string,
  /** Main heading element of the `Moment` */
  title: PropTypes.node,
  /** The type of `Moment` */
  type: PropTypes.string,
};

MerryGoRoundMoment.defaultProps = {
  ...MOMENT_BASE_DEFAULT_PROPS,
  layout: MomentLayout.MerryGoRound,
  type: MomentType.MerryGoRound,
  data: {},
  sideBarContent: (element: ReactElement) => element,
  style: {},
};

export default MerryGoRoundMoment;
