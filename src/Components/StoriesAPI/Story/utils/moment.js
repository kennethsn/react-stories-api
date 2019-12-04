import React from 'react';

import { API_TO_MOMENT_MAP } from '../constants';

import { buildIcon } from './icon';


export function getPublicMoment(momentData) {
  const { type } = momentData;
  return API_TO_MOMENT_MAP[type];
}

export function isPublicMoment(momentData) {
  return getPublicMoment(momentData) ? true : false;
}

export function buildMoment(momentData, index) {
  const MomentComponent = getPublicMoment(momentData);
  if (MomentComponent) {
    const icon = buildIcon(momentData.icon);
    return (<MomentComponent {...momentData} icon={icon} index={index} />);
  }
  return null;
}
