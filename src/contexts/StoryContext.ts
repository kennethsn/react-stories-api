import { createContext, type RefObject } from 'react';
import { SwiperClass } from 'swiper/react';

import type { StoryProps } from '../components/Story/Story.types';
import type { GroupedMoments, Moment } from '../types';

export interface IStoryContext extends StoryProps {
  activeMomentIndex: number;
  activeMomentRef: RefObject<HTMLDivElement> | null;
  availableMoments: Moment[];
  expandedMomentGroups: Record<string, boolean>;
  groupedMoments: GroupedMoments;
  layoutIsDesktop: boolean;
  layoutIsMobile: boolean;
  setActiveMomentIndex: (index: number) => void;
  setExpandedMomentGroups: (groups: Record<string, boolean>) => void;
  setActiveMomentRef: (ref: RefObject<HTMLDivElement>) => void;
  setSwiper: (swiper: SwiperClass) => void;
}

const StoryContext = createContext<IStoryContext | null>(null);

export default StoryContext;
