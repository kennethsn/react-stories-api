// Adapted from https://github.com/ProjectMirador/mirador/blob/master/src/lib/MiradorViewer.js
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import deepmerge from 'deepmerge';
import PluginProvider from 'mirador/dist/es/src/extend/PluginProvider';
import App from 'mirador/dist/es/src/containers/App';
import createStore from 'mirador/dist/es/src/state/createStore';
import createRootReducer from 'mirador/dist/es/src/state/reducers/rootReducer';
import * as actions from 'mirador/dist/es/src/state/actions';
import settings from 'mirador/dist/es/src/config/settings';
import {
  getCompanionWindowIdsForPosition, getManifestSearchService
} from 'mirador/dist/es/src/state/selectors';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import uuid from 'uuid/v4';
import './style.scss';


/**
* Mirador Viewer component.
*/
export default class Mirador extends Component {
  static propTypes = {
    /** Configuration options for the viewer */
    config: PropTypes.object,
    /** Specifiy any additional plugins to render */
    plugins: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    config: {},
    plugins: [],
  };

  constructor(props) {
    super(props);
    const store = createStore();
    this.state = {
      store: store,
    }

    this.processConfig();
  }

  /**
   * Process config into actions
   */
  processConfig() {

    const mergedConfig = deepmerge(settings, this.props.config);
    const action = actions.setConfig(mergedConfig);
    this.state.store.dispatch(action);

    mergedConfig.windows.forEach((miradorWindow, layoutOrder) => {
      const windowId = `window-${uuid()}`;
      const manifestId = miradorWindow.manifestId || miradorWindow.loadedManifest;
      const manifestAction = this.state.store.dispatch(actions.fetchManifest(manifestId));
      const windowAction = this.state.store.dispatch(actions.addWindow({
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
          const state = this.state.store.getState();
          const companionWindowId = getCompanionWindowIdsForPosition(
            state,
            { position: 'left', windowId }
          )[0];
          const searchService = getManifestSearchService(state, { windowId });
          const searchId = searchService && `${searchService.id}?q=${miradorWindow.defaultSearchQuery}`;

          companionWindowId && searchId && this.state.store.dispatch(
            actions.fetchSearch(
              windowId,
              companionWindowId,
              searchId,
              miradorWindow.defaultSearchQuery,
            ),
          );
        }
      });
    });

    Object.keys(mergedConfig.manifests || {}).forEach((manifestId) => {
      this.state.store.dispatch(
        actions.requestManifest(manifestId, mergedConfig.manifests[manifestId]),
      );
    });
  }

  render(){
    return (
      <MuiThemeProvider theme={createMuiTheme()}>
        <div
          className={"story-mirador "+this.props.className}
          style={this.props.style}
        >
          <Provider store={this.state.store}>
            <PluginProvider
              plugins={this.props.plugins}
              createRootReducer={createRootReducer}
            >
              <App />
            </PluginProvider>
          </Provider>
        </div>
      </MuiThemeProvider>
    )
  }
};
