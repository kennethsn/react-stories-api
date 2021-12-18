import { ReactNode } from 'react';

import { IconSource, MomentLayout, MomentType } from '../constants';

export interface Collection {
  description: string;
  id: number;
  name: string;
}

export interface Color {
  background: string;
  text: string;
}

export interface MomentProps {
  bodyClassName?: string;
  color: Color;
  children?: ReactNode;
  data?: object;
  icon?: any;
  index?: number;
  layout: MomentLayout;
  story: Story;
  subtitle?: string;
  title?: string | ReactNode;
  type: MomentType;
}

export interface Icon {
  name: string;
  source: IconSource;
  url?: string;
}

export interface StoriesAPIDate {
  label: string;
  year: number;
}
export interface StoriesAPIStory extends Story {
  alt_labels?: string[];
}

export interface Story {
  description?: string;
  id: string;
  image?: string
  label: string;
  moments: StoryMoment[];
}

export interface StoryMoment extends MomentProps {
  icon: Icon;
  label: string;
}
