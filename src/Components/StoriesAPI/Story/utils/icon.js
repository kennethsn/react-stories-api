import React from 'react';

import { API_TO_ICON_MAP } from '../constants';


export function getIcon(iconData) {
    const { source } = iconData;
    return API_TO_ICON_MAP[source] || API_TO_ICON_MAP.fa;
}

export function buildIcon(iconData, index) {
  const IconComponent = getIcon(iconData);
  return (<IconComponent {...iconData} />);
}
