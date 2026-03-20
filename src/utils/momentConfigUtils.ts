import MomentConfigMap from '../configs/momentConfig';
import MomentStore from '../state/momentStore';
import type { MomentConfigMap as IMomentConfigMap, MomentPlugin } from '../types';

export type MomentPluginsMap = Record<string, MomentPlugin>;

export const buildMomentConfigMap = (plugins?: MomentPluginsMap): IMomentConfigMap => {
  if (!plugins) {
    return MomentConfigMap;
  }

  const pluginConfigs = Object.entries(plugins).reduce<IMomentConfigMap>((acc, [type, plugin]) => {
    acc[type] = {
      component: plugin.component,
      icon: plugin.icon,
      store: plugin.store ?? MomentStore.build,
    };
    return acc;
  }, {} as IMomentConfigMap);

  return {
    ...MomentConfigMap,
    ...pluginConfigs,
  };
};
