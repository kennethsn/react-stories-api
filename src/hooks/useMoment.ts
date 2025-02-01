import { useContext } from 'react';

import MomentContext from '../contexts/MomentContext';

export default function useMoment() {
  const context = useContext(MomentContext);
  if (!context?.moment) {
    throw new Error('Using Moment Hook outside of MomentProvider or with uninitialized Moment');
  }
  return context;
}
