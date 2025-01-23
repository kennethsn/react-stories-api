import { useContext } from 'react';

import RootStore from '../state/rootStore';

const useStoriesAPI = () => useContext(RootStore.contextInstance);

export default useStoriesAPI;
