import {
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { SwiperClass } from 'swiper/react';

import type { StoryProps } from '../components/Story/Story.types';
import StoryContext, { type IStoryContext } from '../contexts/StoryContext';
import useStoriesAPI from '../hooks/useStoriesAPI';
import { groupMoments, processInputMoments } from '../utils/momentUtils';

interface StoryProviderProps extends StoryProps, PropsWithChildren {
}

const buildMomentChangeFn = (
  swiper: SwiperClass | undefined,
  setActiveMomentIndex: (index: number) => void,
) => (index: number) => {
  if (swiper) {
    swiper.slideTo(index);
  }
  setActiveMomentIndex(index);
};

export default function StoryProvider({
  branding,
  children,
  defaultMoment = 0,
  layout,
  story,
}: StoryProviderProps) {
  const [swiper, setSwiper] = useState<SwiperClass | undefined>(undefined);
  const [activeMomentRef, setActiveMomentRef] = useState<IStoryContext['activeMomentRef']>(null);
  const [activeMomentIndex, setActiveMomentIndex] = useState<number>(defaultMoment);
  const { availableMoments, groupedMoments, initialExpandedGroups } = useMemo(() => {
    const available = processInputMoments(story.moments);
    return { availableMoments: available, ...groupMoments(available) };
  }, [story.moments]);
  const [expandedMomentGroups, setExpandedMomentGroups] = useState<Record<string, boolean>>(
    initialExpandedGroups,
  );
  const { addStoryContext, isDebugging, isMobile } = useStoriesAPI();

  const contextValue = useMemo(
    () => {
      const setActiveMomentIndexWithSwiper = buildMomentChangeFn(swiper, setActiveMomentIndex);
      const contextLayout = layout ?? isMobile ? 'mobile' : 'desktop';
      const context: IStoryContext = {
        activeMomentIndex,
        activeMomentRef,
        availableMoments,
        branding,
        defaultMoment,
        expandedMomentGroups,
        groupedMoments,
        layoutIsDesktop: contextLayout === 'desktop',
        layoutIsMobile: contextLayout === 'mobile',
        layout: contextLayout,
        setActiveMomentIndex: setActiveMomentIndexWithSwiper,
        setActiveMomentRef,
        setExpandedMomentGroups,
        setSwiper,
        story,
      };
      return context;
    },
    [
      activeMomentIndex,
      activeMomentRef,
      availableMoments,
      branding,
      defaultMoment,
      expandedMomentGroups,
      groupedMoments,
      isMobile,
      layout,
      swiper,
      story,
    ],
  );
  useEffect(() => {
    if (isDebugging) {
      // eslint-disable-next-line no-console
      console.debug('StoryProvider useEffect called', contextValue, swiper?.activeIndex, activeMomentIndex);
    }
    addStoryContext?.(contextValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextValue]);

  return (
    <StoryContext.Provider value={contextValue}>
      {children}
    </StoryContext.Provider>
  );
}
