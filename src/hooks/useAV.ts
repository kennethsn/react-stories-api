import { useCallback, useMemo } from 'react';

import type { AV, Story } from '../types';
import useStoriesAPI from './useStoriesAPI';

const isAVPlaying = (av: AV | undefined, storyId?: Story['id'], momentIndex?: number) => {
  if (!av) {
    return false;
  }
  if (storyId && av.storyId !== storyId) {
    return false;
  }
  if (momentIndex !== undefined && av.momentIndex !== momentIndex) {
    return false;
  }
  return true;
};

export default function useAV(inputAV?: Partial<AV>) {
  const { av, setAV } = useStoriesAPI();
  const clearAV = useCallback(() => setAV(undefined), [setAV]);
  const pause = useCallback(async () => {
    if (av) {
      await av.pause();
    }
    clearAV();
  }, [av, clearAV]);
  const play = useCallback(
    async () => {
      await pause();
      await inputAV?.play?.();
      setAV(inputAV as AV);
    },
    [inputAV, pause, setAV],
  );

  return useMemo(() => ({
    av,
    pause,
    play,
    isPlaying: isAVPlaying(av, inputAV?.storyId, inputAV?.momentIndex),
  }), [
    av,
    inputAV,
    pause,
    play,
  ]);
}
