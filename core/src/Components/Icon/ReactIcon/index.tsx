import PropTypes from 'prop-types';
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import IconBase from '..';

export interface ReactIconProps {
  name: string;
  style?: CSSProperties;
}

/**
 * Wrapper of _react-icons_ integration with the Stories-API styling and integration
 */
const ReactIcon = ({ name, style }: ReactIconProps) => {
  const [Icon, setIcon] = useState(' ' as unknown as ReactNode);
  useEffect(() => {
    import('react-icons/all').then((allIcons) => {
      const RIcon = allIcons[name];
      // @ts-ignore
      setIcon(<RIcon /> as ReactNode);
    });
  }, []);
  return (
    <IconBase
      name={name}
      source="react"
      style={style}
    >
      {/* @ts-ignore */}
      { Icon }
    </IconBase>
  );
};

ReactIcon.propTypes = {
  /** Name of the `Icon` */
  name: PropTypes.string.isRequired,
  /** Styling object of the `Icon` */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

ReactIcon.defaultProps = { style: undefined };

export default ReactIcon;
