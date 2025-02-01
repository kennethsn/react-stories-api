import { createContext } from 'react';

import type MomentStore from '../state/momentStore';

export type IMomentContext = MomentStore;

const MomentContext = createContext<IMomentContext | null>(null);

export default MomentContext;
