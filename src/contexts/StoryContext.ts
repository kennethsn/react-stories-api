import { createContext, type RefObject } from 'react';
import { SwiperClass } from 'swiper/react';

import type { StoryProps } from '../components/Story/Story.types';
import type {
  Collection,
  GroupedMoments,
  Moment,
  Story,
} from '../types';

export type IStoryContext = StoryProps & {
  readonly activeMomentIndex: number;
  readonly activeMomentRef: RefObject<HTMLDivElement> | null;
  readonly availableMoments: Moment[];
  readonly collectionId: Collection['id'];
  readonly expandedMomentGroups: Record<string, boolean>;
  readonly groupedMoments: GroupedMoments;
  readonly layoutIsDesktop: boolean;
  readonly layoutIsFullscreen: boolean;
  readonly layoutIsMobile: boolean;
  readonly setActiveMomentIndex: (index: number) => void;
  readonly setExpandedMomentGroups: (groups: Record<string, boolean>) => void;
  readonly setActiveMomentRef: (ref: RefObject<HTMLDivElement>) => void;
  readonly setSwiper: (swiper: SwiperClass) => void;
  readonly storyId: Story['id'];
};

const StoryContext = createContext<IStoryContext | null>(null);

export default StoryContext;
