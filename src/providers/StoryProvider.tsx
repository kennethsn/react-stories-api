import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
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
  updateRouter?: (active: number) => void,
  onChange?: (active: number) => void,
) => (index: number) => {
  if (swiper) {
    swiper.slideTo(index);
  }
  setActiveMomentIndex(index);
  updateRouter?.(index);
  onChange?.(index);
};

export default function StoryProvider({
  branding,
  children,
  connectRouter,
  defaultMoment = 0,
  fullscreen,
  layout,
  onChange,
  story,
}: StoryProviderProps) {
  const {
    addStoryContext,
    formatters: { momentQueryParamKey },
    isDebugging,
    isMobile,
  } = useStoriesAPI();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultActiveMoment = connectRouter ? (
    Number(searchParams.get(momentQueryParamKey)) ?? defaultMoment
  ) : (
    Number(defaultMoment)
  );
  const [swiper, setSwiper] = useState<SwiperClass | undefined>(undefined);
  const [activeMomentRef, setActiveMomentRef] = useState<IStoryContext['activeMomentRef']>(null);
  const [activeMomentIndex, setActiveMomentIndex] = useState<number>(defaultActiveMoment);
  const { availableMoments, groupedMoments, initialExpandedGroups } = useMemo(() => {
    const available = processInputMoments(story.moments);
    return { availableMoments: available, ...groupMoments(available) };
  }, [story.moments]);
  const [expandedMomentGroups, setExpandedMomentGroups] = useState<Record<string, boolean>>(
    initialExpandedGroups,
  );

  const updateRouter = useCallback(
    (moment: number) => (
      setSearchParams({ [momentQueryParamKey]: moment.toString() }, { replace: true })
    ),
    [momentQueryParamKey, setSearchParams],
  );

  const contextValue = useMemo<IStoryContext>(
    () => {
      const setActiveMomentIndexWithSwiper = buildMomentChangeFn(
        swiper,
        setActiveMomentIndex,
        connectRouter ? updateRouter : undefined,
        onChange,
      );
      const contextLayout = layout ?? isMobile ? 'mobile' : 'desktop';
      return {
        activeMomentIndex,
        activeMomentRef,
        availableMoments,
        branding,
        collectionId: story.collection_id,
        defaultMoment: defaultActiveMoment,
        expandedMomentGroups,
        groupedMoments,
        layoutIsDesktop: contextLayout === 'desktop',
        layoutIsFullscreen: !!fullscreen,
        layoutIsMobile: contextLayout === 'mobile',
        layout: contextLayout,
        setActiveMomentIndex: setActiveMomentIndexWithSwiper,
        setActiveMomentRef,
        setExpandedMomentGroups,
        setSwiper,
        story,
        storyId: story.id,
      };
    },
    [
      activeMomentIndex,
      activeMomentRef,
      availableMoments,
      branding,
      connectRouter,
      defaultActiveMoment,
      expandedMomentGroups,
      fullscreen,
      groupedMoments,
      isMobile,
      layout,
      onChange,
      swiper,
      story,
      updateRouter,
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
