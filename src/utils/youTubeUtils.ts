import { YOUTUBE_EMBED_URL } from '../constants';
import type { IFrameMomentData, Moment, YouTubeMomentData } from '../types';
import { addQueryParams, getQueryParam } from './url';

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

export const buildYouTubeEmbedBaseURL = (videoId: string) => `${YOUTUBE_EMBED_URL}/${videoId}`;

export const buildYouTubeEmbedBaseURLFromURL = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? buildYouTubeEmbedBaseURL(videoId) : url;
};

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

export const getYouTubeVideoId = (url: string): string | null | undefined => getQueryParam(url, 'v');
