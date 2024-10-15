import { HATHI_TRUST_EMBED_URL } from '../constants';
import type { HathiTrustMomentData, IFrameMomentData, Moment } from '../types';
import { addQueryParams } from './url';

export const buildHathiTrustEmbedURL = (momentData: HathiTrustMomentData): string => {
  const {
    hathi_trust_id: hathiTrustId,
    page_number: pageNumber,
    view,
    url,
  } = momentData;
  const embedURL = url || buildHathiTrustEmbedURLFromId(hathiTrustId!);
  const queryParams = {
    seq: pageNumber?.toString(),
    ui: 'embed',
    view: view === 'flip' ? '2up' : '1up',
  };
  return addQueryParams(embedURL, queryParams);
};

const buildHathiTrustEmbedURLFromId = (hathiTrustId: string) => (
  `${HATHI_TRUST_EMBED_URL}?id=${hathiTrustId}`
);

export const buildIFrameMomentFromHathiTrust = (
  moment: Moment<HathiTrustMomentData>,
): Moment<IFrameMomentData> => ({
  ...moment,
  data: {
    ...moment.data,
    iframe: {
      fit: moment.data.fit,
      size: moment.data.size,
      url: buildHathiTrustEmbedURL(moment.data),
    },
  },
});
