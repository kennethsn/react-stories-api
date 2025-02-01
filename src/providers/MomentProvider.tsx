import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import MomentContext, { IMomentContext } from '../contexts/MomentContext';

type MomentProviderProps = PropsWithChildren & {
  readonly moment: IMomentContext;
};

const MomentProvider = observer(({ children, moment }: MomentProviderProps) => (
  <MomentContext.Provider value={moment}>
    {children}
  </MomentContext.Provider>
));

export default MomentProvider;
