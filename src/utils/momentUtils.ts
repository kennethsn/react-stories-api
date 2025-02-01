import type {
  GroupedMoments,
  InputMoment,
  Moment,
  MomentGroupWithMoments,
  MomentOrMomentGroup,
  MomentType,
} from '../types';
import { randomString, toKebabCase } from './string';

export const generateMomentGroupId = (groupLabel: string) => toKebabCase(groupLabel);

export const generateMomentId = () => randomString(8, 'm-');

export const groupMoments = (moments: Moment[]) => {
  const groupedMoments: GroupedMoments = [];
  const initialExpandedGroups = new Set<string>();
  let currentGroup: MomentGroupWithMoments | undefined;
  moments.forEach((moment) => {
    const groupId = moment.group?.id;
    if (currentGroup && groupId !== currentGroup.id) {
      groupedMoments.push(currentGroup);
      currentGroup = undefined;
    }
    if (!groupId) {
      groupedMoments.push(moment);
    } else if (currentGroup) {
      currentGroup.moments.push(moment);
    } else {
      currentGroup = { ...moment.group!, moments: [moment], isGroup: true };
      initialExpandedGroups.add(currentGroup.id);
    }
  });
  if (currentGroup) {
    groupedMoments.push(currentGroup);
  }

  return { groupedMoments, initialExpandedGroups };
};

export const isMomentGroup = (moment: MomentOrMomentGroup): moment is MomentGroupWithMoments => (
  !!(moment as MomentGroupWithMoments).isGroup
);

export const processInputMoments = (
  inputMoments: InputMoment[],
  availableMomentTypes: Set<MomentType>,
) => {
  const outputMoments: Moment[] = [];
  inputMoments.forEach((moment) => {
    if (!availableMomentTypes.has(moment.type)) {
      return;
    }
    const id = moment.id ?? generateMomentId();
    const outputMoment = {
      ...moment,
      id,
      index: outputMoments.length,
    };
    outputMoments.push(outputMoment);
  });
  return outputMoments;
};
