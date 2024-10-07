import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import MomentNavigator from '../MomentNavigator/MomentNavigator';
import type { StoryLayoutProps } from './StoryLayout.types';

// KSN TODO: Turn back on persistence
export default function StoryLayoutDesktop({ children }: StoryLayoutProps) {
  return (
    <PanelGroup
      // autoSaveId="story-panel-group"
      className="story-layout-panel-group"
      direction="horizontal"
    >
      <Panel
        className="moment-navigator-panel"
        defaultSize={20}
      >
        <MomentNavigator />
      </Panel>

      <PanelResizeHandle />

      <Panel>
        {children}
      </Panel>
    </PanelGroup>
  );
}
