import { useEffect } from 'react';

export default function useOnLoad(callback: () => void) {
  useEffect(() => {
    callback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
