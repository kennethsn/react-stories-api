// Adapted from https://github.com/ProjectMirador/mirador/blob/master/src/lib/MiradorViewer.js
import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import {
  createGenerateClassName,
  createTheme,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import deepmerge from 'deepmerge';
import settings from 'mirador/dist/es/src/config/settings';
import PropTypes from 'prop-types';

import './style.scss';

interface MiradorWindow {
  defaultSearchQuery?: string;
  loadedManifest?: string;
  manifestId?: string;
  view?: string;
}

export interface MiradorConfig {
  id?: string;
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

/**
* Mirador Viewer component.
*/
const Mirador = ({
  className,
  config = {},
  plugins,
  style,
}: Props) => {
  const [mirador, setMirador] = useState(undefined as { render: () => ReactElement } | undefined);
  const mergedConfig = deepmerge(settings, config);
  useEffect(() => {
    // @ts-ignore
    import('mirador/dist/es/src/lib/MiradorViewer').then(({ default: MiradorViewer }) => {
      setMirador(new MiradorViewer(mergedConfig, { plugins }));
    });
  }, []);
  const generateClassName = createGenerateClassName({
    productionPrefix: 'p',
    seed: `stories-api-mirador-${new Date().getTime()}`,
  });
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={createTheme()}>
        <div
          style={style}
          className={`story-mirador ${className} mirador--initialized`}
        >
          { mirador?.render() || null }
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
