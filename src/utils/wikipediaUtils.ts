import { WIKIPEDIA_BASE_URL } from '../constants';

export const buildWikipediaPageURL = (pageKey: string) => `${WIKIPEDIA_BASE_URL}/wiki/${pageKey}`;

export default { buildWikipediaPageURL };
