import { createContext } from 'react';
import { SwiperClass } from 'swiper/react';

import type { StoryProps } from '../components/Story/Story.types';
import type { GroupedMoments, Moment } from '../types';

export interface IStoryContext extends StoryProps {
  activeMomentIndex: number;
  availableMoments: Moment[];
  expandedMomentGroups: Record<string, boolean>;
  groupedMoments: GroupedMoments;
  layoutIsDesktop: boolean;
  layoutIsMobile: boolean;
  setActiveMomentIndex: (index: number) => void;
  setExpandedMomentGroups: (groups: Record<string, boolean>) => void;
  setSwiper: (swiper: SwiperClass) => void;
}

const StoryContext = createContext<IStoryContext | null>(null);

export default StoryContext;
