import { observer } from 'mobx-react-lite';
import { Else, If, Then } from 'react-if';

import GeoMapProvider from '../../../providers/GeoMapProvider';
import type { GeoMapContainerProps } from './GeoMap.types';

const GeoMapContainer = observer(({ children, ...props }: GeoMapContainerProps) => (
  <If condition={!!props.geoMap}>
    <Then>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GeoMapProvider {...props}>
        {children}
      </GeoMapProvider>
    </Then>

    <Else>
      {children}
    </Else>
  </If>
));

export default GeoMapContainer;
