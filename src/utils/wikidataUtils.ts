import { WIKIDATA_BASE_URL } from '../constants';

export const buildWikidataEntityURL = (entityId: string) => `${WIKIDATA_BASE_URL}/wiki/${entityId}`;

export default { buildWikidataEntityURL };
