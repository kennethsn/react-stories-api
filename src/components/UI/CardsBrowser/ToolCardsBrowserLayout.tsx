import { observer } from 'mobx-react-lite';
import { When } from 'react-if';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useStoriesAPITheme } from '../../../hooks';
import type { CardsBrowserLayoutProps } from './CardsBrowser.types';
import ToolCardsBrowserFacetsPanel from './ToolCardsBrowserFacetsPanel';

const ToolCardsBrowserLayout = observer(({ children, search }: CardsBrowserLayoutProps) => {
  const { isDesktop } = useStoriesAPITheme();
  const shouldShowFacets = search?.canSelectFacets(isDesktop);
  return (
    <PanelGroup direction="horizontal">
      <When condition={shouldShowFacets}>
        <Panel
          defaultSize={20}
          maxSize={50}
        >
          <ToolCardsBrowserFacetsPanel search={search!} />
        </Panel>

        <PanelResizeHandle />
      </When>

      <Panel>
        {children}
      </Panel>
    </PanelGroup>
  );
});

export default ToolCardsBrowserLayout;
