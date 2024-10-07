import useStory from './useStory';

export default function useMoments() {
  const {
    activeMomentIndex,
    availableMoments,
    defaultMoment,
    expandedMomentGroups,
    groupedMoments,
    story,
    setActiveMomentIndex,
    setExpandedMomentGroups,
  } = useStory();
  const expandGroup = (groupId: string) => setExpandedMomentGroup(groupId, true);

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
    groupedMoments,
    goToBeginning,
    goToNextMoment,
    goToPreviousMoment,
    isGroupExpanded,
    selectMoment,
    toggleGroup,
  };
}
