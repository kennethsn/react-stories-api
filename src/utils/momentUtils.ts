import MomentConfigMap from '../configs/momentConfig';
import type {
  GroupedMoments,
  InputMoment,
  Moment,
  MomentGroupWithMoments,
  MomentOrMomentGroup,
} from '../types';
import { buildNoIcon } from './iconUtils';

type AnyMoment = InputMoment | Moment;

const buildMomentGroupWithKey = (group: MomentGroupWithMoments) => ({ ...group, key: `group-${group.id}` });

export const getAvailableMoments = (moments: Moment[]) => moments
  .filter(isMomentAvailable)
  .map((moment, index) => ({ ...moment, index }));

export const groupMoments = (moments: Moment[]) => {
  const groupedMoments: GroupedMoments = [];
  const initialExpandedGroups: Record<string, boolean> = {};
  let currentGroup: MomentGroupWithMoments | undefined;
  const pushCurrentGroup = () => {
    const groupWithKey = buildMomentGroupWithKey(currentGroup!);
    groupedMoments.push(groupWithKey);
  };
  moments.forEach((moment) => {
    const groupId = moment.group?.id;
    if (currentGroup && groupId !== currentGroup.id) {
      pushCurrentGroup();
      currentGroup = undefined;
    }
    if (!groupId) {
      groupedMoments.push({
        ...moment,
        key: `moment-${moment.index}`,
      });
    } else if (currentGroup) {
      currentGroup.moments.push(moment);
    } else {
      currentGroup = { ...moment.group!, moments: [moment] };
      initialExpandedGroups[currentGroup.id] = true;
    }
  });
  if (currentGroup) {
    pushCurrentGroup();
  }

  return { groupedMoments, initialExpandedGroups };
};

// TODO: add a cleaner way to check than comparing whole component imports
export const isMomentAvailable = (moment: AnyMoment) => !!getMomentConfig(moment);

export const isMomentGroup = (moment: Omit<MomentOrMomentGroup, 'key'>): moment is MomentGroupWithMoments => (
  !!(moment as MomentGroupWithMoments).moments
);

export const getMomentComponent = (moment: AnyMoment) => {
  const momentConfig = getMomentConfig(moment);
  return momentConfig?.component;
};

export const getMomentConfig = (moment: AnyMoment) => {
  const momentConfig = MomentConfigMap[moment.type];
  if (!momentConfig) {
    // eslint-disable-next-line no-console
    console.warn(`No config found for moment type: ${moment.type}`);
  }
  return momentConfig;
};

export const getMomentIcon = (moment: AnyMoment) => {
  const { icon } = moment;
  if (icon) {
    return icon;
  }
  const momentConfig = getMomentConfig(moment);
  return momentConfig?.icon ?? buildNoIcon();
};

export const processInputMoments = (inputMoments: InputMoment[]) => {
  const outputMoments: Moment[] = [];
  inputMoments.forEach((moment) => {
    if (!isMomentAvailable(moment)) {
      return;
    }
    const icon = getMomentIcon(moment);
    const outputMoment = {
      ...moment,
      icon,
      index: outputMoments.length,
    };
    outputMoments.push(outputMoment);
  });
  return outputMoments;
};
