import { useMemo } from 'react';

import { getElementHeight, getRelativeHeight } from '../utils/dom';
import useStory from './useStory';

// KSN TODO: moment ref height needs to be updated when the moment header is expanded
export default function useMoments(momentIndex?: number) {
  const {
    activeMomentIndex,
    activeMomentRef,
    availableMoments,
    defaultMoment,
    expandedMomentGroups,
    groupedMoments,
    story,
    setActiveMomentIndex,
    setActiveMomentRef,
    setExpandedMomentGroups,
  } = useStory();

  return useMemo(() => {
    const momentIsActive = activeMomentIndex === momentIndex;
    const momentHeight = getElementHeight(activeMomentRef);
    const expandGroup = (groupId: string) => setExpandedMomentGroup(groupId, true);
    const getRelativeMomentHeight = (value: number, algorithm?: 'absolute' | 'percentage') => (
      getRelativeHeight(activeMomentRef, value, algorithm)
    );
    const goToBeginning = () => setActiveMomentIndex(0);

    const goToNextMoment = () => {
      const onLastMoment = activeMomentIndex === availableMoments.length - 1;
      if (onLastMoment) {
        return goToBeginning();
      }
      return setActiveMomentIndex(activeMomentIndex + 1);
    };

    const goToPreviousMoment = () => {
      const onFirstMoment = activeMomentIndex === 0;
      if (onFirstMoment) {
        return goToBeginning();
      }
      return setActiveMomentIndex(activeMomentIndex - 1);
    };

    const isGroupExpanded = (groupId: string) => expandedMomentGroups[groupId];

    const selectMoment = (index: number) => {
      setActiveMomentIndex(index);
      const moment = availableMoments[index];
      if (moment.group) {
        expandGroup(moment.group.id);
      }
    };

    const setExpandedMomentGroup = (groupId: string, expanded: boolean) => {
      setExpandedMomentGroups({
        ...expandedMomentGroups,
        [groupId]: expanded,
      });
    };

    const setMomentRef = (ref: React.RefObject<HTMLDivElement>) => {
      if (momentIsActive) {
        setActiveMomentRef(ref);
      }
    };

    const toggleGroup = (groupId: string) => (
      setExpandedMomentGroup(groupId, !isGroupExpanded(groupId))
    );
    return {
      activeMoment: availableMoments[activeMomentIndex],
      activeMomentIndex,
      allMoments: story.moments,
      availableMoments,
      defaultMomentIndex: defaultMoment,
      expandedMomentGroups,
      getRelativeMomentHeight,
      groupedMoments,
      goToBeginning,
      goToNextMoment,
      goToPreviousMoment,
      isGroupExpanded,
      momentIsActive,
      momentHeight,
      selectMoment,
      setMomentRef,
      toggleGroup,
    };
  }, [
    activeMomentIndex,
    activeMomentRef,
    availableMoments,
    defaultMoment,
    expandedMomentGroups,
    groupedMoments,
    momentIndex,
    story.moments,
    setActiveMomentIndex,
    setActiveMomentRef,
    setExpandedMomentGroups,
  ]);
}
