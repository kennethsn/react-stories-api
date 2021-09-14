import React from 'react';

import { Icon } from '../../../../types';
import API_TO_ICON_MAP from '../constants/icon';

export const getIcon = ({ source }: Icon) => API_TO_ICON_MAP[source] || API_TO_ICON_MAP.fa;

export const buildIcon = (iconData: Icon) => {
  const IconComponent = getIcon(iconData) as typeof API_TO_ICON_MAP.fa;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    // @ts-ignore
    <IconComponent {...iconData} />
  );
};
