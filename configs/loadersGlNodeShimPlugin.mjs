/**
 * Rollup plugin: loaders-gl-node-shim
 *
 * Why this exists:
 * - This library is consumed in browser apps (Vite/Rollup/Webpack).
 * - Some transitive deck.gl/loaders.gl modules include Node-only imports such as
 *   `child_process` and `worker_threads`.
 * - When those imports leak into a browser bundle, Vite resolves them to
 *   `__vite-browser-external` placeholders. At runtime/build time this can fail
 *   with errors like:
 *   - "Module \"worker_threads\" has been externalized for browser compatibility"
 *   - "\"Worker\" is not exported by __vite-browser-external"
 *
 * What this plugin does:
 * - Intercepts only loaders.gl worker-utils imports that request Node built-ins.
 * - Replaces those imports with tiny virtual browser-safe shims.
 * - Keeps behavior deterministic for browser builds while avoiding Node leakage.
 *
 * Scope guard (important):
 * - We intentionally only shim imports when the importer is inside
 *   `@loaders.gl/worker-utils`. This prevents accidentally changing semantics for
 *   unrelated packages that might rely on real Node behavior.
 */

const LOADERS_GL_NODE_SHIMS = {
  childProcess: '\0loaders-gl-child-process-shim',
  workerThreads: '\0loaders-gl-worker-threads-shim',
};

const LOADERS_GL_WORKER_UTILS_PATH = '/node_modules/@loaders.gl/worker-utils/';

const CHILD_PROCESS_BROWSER_SHIM = `
  // Browser shim for Node's child_process module used by loaders.gl internals.
  // The browser cannot spawn OS processes, so we expose no-op/error behavior.
  const unsupported = () => {
    throw new Error('child_process is not available in browser builds.');
  };

  // Preserve callback shape expected by callers that treat exec as async.
  export const exec = (command, callback) => {
    if (typeof callback === 'function') {
      callback(new Error('child_process is not available in browser builds.'), '', '');
    }
  };

  export const spawn = unsupported;
  export default { exec, spawn };
`;

const WORKER_THREADS_BROWSER_SHIM = `
  // Browser shim for Node's worker_threads module.
  // parentPort does not exist in browser Worker contexts.
  export const parentPort = null;

  // If code path tries to instantiate Node worker threads in browser,
  // fail loudly with a clear message.
  export class Worker {
    constructor() {
      throw new Error('worker_threads is not available in browser builds.');
    }
  }

  export default { Worker, parentPort };
`;

const loadersGlNodeShimPlugin = {
  name: 'loaders-gl-node-shim',

  resolveId(source, importer) {
    if (!importer?.includes(LOADERS_GL_WORKER_UTILS_PATH)) {
      return null;
    }

    if (source === 'child_process') {
      return LOADERS_GL_NODE_SHIMS.childProcess;
    }

    if (source === 'worker_threads') {
      return LOADERS_GL_NODE_SHIMS.workerThreads;
    }

    return null;
  },

  load(id) {
    if (id === LOADERS_GL_NODE_SHIMS.childProcess) {
      return CHILD_PROCESS_BROWSER_SHIM;
    }

    if (id === LOADERS_GL_NODE_SHIMS.workerThreads) {
      return WORKER_THREADS_BROWSER_SHIM;
    }

    return null;
  },
};

export default loadersGlNodeShimPlugin;
