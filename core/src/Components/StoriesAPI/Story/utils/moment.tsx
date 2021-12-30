import React from 'react';

import { Story, StoryMoment } from '../../../../types';
import API_TO_MOMENT_MAP from '../constants/moment';
import { buildIcon } from './icon';

export const getPublicMoment = ({ type }: StoryMoment) => API_TO_MOMENT_MAP[type];

export const isPublicMoment = (momentData: StoryMoment) => !!getPublicMoment(momentData);

export const buildMoment = async (story: Story, momentData: StoryMoment, index: number) => {
  const MomentComponents = await import('../../../Moment');
  const ComponentPromise = MomentComponents[getPublicMoment(momentData)];
  const MomentComponent = (await ComponentPromise).default;
  if (!MomentComponent) {
    return undefined;
  }
  const { icon: iconData, label } = momentData;
  const icon = buildIcon(iconData);
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <MomentComponent
      key={`moment-${index}-${label}`}
      {...momentData}
      icon={icon}
      index={index}
      story={story}
    />
  );
};
