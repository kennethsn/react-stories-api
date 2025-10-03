import { observer } from 'mobx-react-lite';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import GeoMapCanvas from './GeoMapCanvas';
import GeoMapInformationPanel from './GeoMapInformationPanel';

const GeoMapPanelGroup = observer(() => (
  <PanelGroup direction="horizontal">
    <Panel>
      <GeoMapCanvas />
    </Panel>

    <PanelResizeHandle />

    <Panel
      defaultSize={30}
      maxSize={50}
    >
      <GeoMapInformationPanel />
    </Panel>
  </PanelGroup>
));

export default GeoMapPanelGroup;
