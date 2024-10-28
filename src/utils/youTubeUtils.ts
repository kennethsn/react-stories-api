import { YOUTUBE_EMBED_URL, YOUTUBE_WATCH_URL } from '../constants';
import type {
  IFrameMomentData,
  Moment,
  VideoMomentData,
  YouTubeMomentData,
} from '../types';
import { addQueryParams, getQueryParam } from './url';

export const buildIFrameMomentFromYouTube = (
  moment: Moment<YouTubeMomentData>,
): Moment<IFrameMomentData> => ({
  ...moment,
  data: {
    ...moment.data,
    iframe: {
      fit: moment.data.fit,
      size: moment.data.size,
      url: buildYouTubeEmbedURL(moment.data),
    },
  },
});

export const buildVideoMomentFromYouTube = (
  moment: Moment<YouTubeMomentData>,
): Moment<VideoMomentData> => ({
  ...moment,
  data: {
    ...moment.data,
    start_at: undefined,
    url: getYouTubeWatchURL(moment.data),
  },
});

export const buildYouTubeEmbedBaseURL = (videoId: string) => `${YOUTUBE_EMBED_URL}/${videoId}`;

export const buildYouTubeEmbedBaseURLFromURL = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? buildYouTubeEmbedBaseURL(videoId) : url;
};

export const buildYouTubeEmbedURL = (momentData: YouTubeMomentData): string => {
  const {
    show_controls: showControls,
    start_at: startAt,
    url,
    video_id: videoId,
  } = momentData;
  const embedURL = url ? buildYouTubeEmbedBaseURLFromURL(url) : buildYouTubeEmbedBaseURL(videoId!);
  const queryParams = {
    controls: showControls ? '1' : '0',
    start: startAt?.toString(),
  };

  return addQueryParams(embedURL, queryParams);
};

export const buildYouTubeWatchBaseURL = (videoId: string) => `${YOUTUBE_WATCH_URL}?v=${videoId}`;

export const getYouTubeVideoId = (url: string): string | null | undefined => getQueryParam(url, 'v');

export const getYouTubeWatchURL = (data: YouTubeMomentData): string => {
  const videoId = data.video_id || getYouTubeVideoId(data.url!);
  const watchURL = videoId ? buildYouTubeWatchBaseURL(videoId) : data.url!;
  return addQueryParams(watchURL, { start: data.start_at?.toString() });
};
