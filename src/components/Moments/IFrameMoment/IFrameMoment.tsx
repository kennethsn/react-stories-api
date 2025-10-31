import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import BaseMoment from '../BaseMoment/BaseMoment';
import styles from './IFrameMoment.styles';
import type { IFrameMomentProps } from './IFrameMoment.types';

// KSN TODO: Fix Height styling when using a Card with Top/Bottom caption
const IFrameMoment = observer(({ moment }: IFrameMomentProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const handleIframeLoad = () => {
    if (!moment.message) return;
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;

    iframeWindow.postMessage(
      JSON.parse(JSON.stringify(moment.message)),
      '*',
    );
  };
  return (
    <BaseMoment
      contentFit={moment.fit}
      contentSize={moment.size}
      moment={moment}
    >
      <Box
        ref={iframeRef}
        className="moment-iframe"
        component="iframe"
        onLoad={handleIframeLoad}
        src={moment.url}
        sx={styles.iframe}
      />
    </BaseMoment>
  );
});

export default IFrameMoment;
