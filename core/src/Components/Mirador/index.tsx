// Adapted from https://github.com/ProjectMirador/mirador/blob/master/src/lib/MiradorViewer.js
import React, { CSSProperties, useState } from 'react';
import {
  createGenerateClassName,
  createTheme,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import deepmerge from 'deepmerge';
import PluginProvider from 'mirador/dist/es/src/extend/PluginProvider';
import App from 'mirador/dist/es/src/components/App';
import createStore from 'mirador/dist/es/src/state/createStore';
import createRootReducer from 'mirador/dist/es/src/state/reducers/rootReducer';
import * as actions from 'mirador/dist/es/src/state/actions';
import settings from 'mirador/dist/es/src/config/settings';
import {
  getCompanionWindowIdsForPosition, getManifestSearchService,
} from 'mirador/dist/es/src/state/selectors';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';

import './style.scss';

interface MiradorWindow {
  defaultSearchQuery?: string;
  loadedManifest?: string;
  manifestId?: string;
  view?: string;
}

export interface MiradorConfig {
  manifests?: Record<string, object>;
  thumbnailNavigation?: { defaultPosition: object };
  windows?: MiradorWindow[];
}

interface Props {
  className: string;
  config?: MiradorConfig;
  plugins?: object[];
  style?: CSSProperties;
}

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  seed: 'stories-api-mirador',
});

/**
* Mirador Viewer component.
*/
const Mirador = ({
  className,
  config = {},
  plugins,
  style,
}: Props) => {
  const [store] = useState(createStore());

  /**
   * Process config into actions
   */
  const processConfig = () => {
    const mergedConfig = deepmerge(settings, config);
    const action = actions.setConfig(mergedConfig);
    store.dispatch(action);

    mergedConfig.windows.forEach((miradorWindow, layoutOrder) => {
      const windowId = `window-${uuid()}`;
      const manifestId = miradorWindow.manifestId || miradorWindow.loadedManifest;
      const manifestAction = store.dispatch(actions.fetchManifest(manifestId));
      const windowAction = store.dispatch(actions.addWindow({
        // these are default values ...
        id: windowId,
        layoutOrder,
        manifestId,
        thumbnailNavigationPosition: mergedConfig.thumbnailNavigation.defaultPosition,
        // ... overridden by values from the window configuration ...
        ...miradorWindow,
      }));

      Promise.all([manifestAction, windowAction]).then(() => {
        if (miradorWindow.defaultSearchQuery) {
          const state = store.getState();
          const companionWindowId = getCompanionWindowIdsForPosition(
            state,
            { position: 'left', windowId },
          )[0];
          const searchService = getManifestSearchService(state, { windowId });
          const searchId = searchService && `${searchService.id}?q=${miradorWindow.defaultSearchQuery}`;
          if (companionWindowId && searchId) {
            store.dispatch(
              actions.fetchSearch(
                windowId,
                companionWindowId,
                searchId,
                miradorWindow.defaultSearchQuery,
              ),
            );
          }
        }
      });
    });

    Object.keys(mergedConfig.manifests || {}).forEach((manifestId) => {
      store.dispatch(
        actions.requestManifest(manifestId, mergedConfig.manifests[manifestId]),
      );
    });
  };
  processConfig();
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={createTheme()}>
        <div
          className={`story-mirador ${className}`}
          style={style}
        >
          <Provider store={store}>
            <PluginProvider
              createRootReducer={createRootReducer}
              plugins={plugins}
            >
              <App />
            </PluginProvider>
          </Provider>
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

Mirador.propTypes = {
  /** Set a classname of the mirador Component */
  className: PropTypes.string,
  /** Configuration options for the viewer */
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
  /** Specify any additional plugins to render */
  plugins: PropTypes.arrayOf(PropTypes.object),
};

Mirador.defaultProps = {
  className: '',
  config: {},
  plugins: [],
  style: undefined,
};

export default Mirador;
