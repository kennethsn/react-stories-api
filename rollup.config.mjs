import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

// eslint-disable-next-line import/extensions
import loadersGlNodeShimPlugin from './configs/loadersGlNodeShimPlugin.mjs';
import packageJSON from './package.json' with { type: 'json' };

const peerDependencyNames = Object.keys(packageJSON.peerDependencies ?? {});

const isExternal = (id) => {
  // Keep Rollup virtual modules internal.
  if (id.startsWith('\0')) {
    return false;
  }

  return peerDependencyNames.some((dependencyName) => id === dependencyName || id.startsWith(`${dependencyName}/`));
};

export default [
  {
    input: './src/index.ts',
    external: isExternal,
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: packageJSON.module,
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      loadersGlNodeShimPlugin,
      peerDepsExternal(),
      commonjs(),
      postcss({
        extensions: ['.css'],
        extract: false,
        inject: true,
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      dynamicImportVars({
        exclude: ['**/*.test.ts', '**/*.stories.tsx', '**/*.json', 'node_modules/**'],
      }),
      typescript({
        exclude: ['**/*.test.ts', '**/*.stories.tsx', 'dist'],
        filterRoot: './src',
        tsconfig: './tsconfig.json',
      }),
      json(),
    ],
  },
  {
    input: './src/plugins.ts',
    external: isExternal,
    output: [
      {
        file: 'dist/cjs/plugins.js',
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: 'dist/esm/plugins.js',
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      loadersGlNodeShimPlugin,
      peerDepsExternal(),
      commonjs(),
      postcss({
        extensions: ['.css'],
        extract: false,
        inject: true,
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      dynamicImportVars({
        exclude: ['**/*.test.ts', '**/*.stories.tsx', '**/*.json', 'node_modules/**'],
      }),
      typescript({
        exclude: ['**/*.test.ts', '**/*.stories.tsx', 'dist'],
        filterRoot: './src',
        tsconfig: './tsconfig.json',
      }),
      json(),
    ],
  },
  {
    external: [/\.css$/],
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  {
    external: [/\.css$/],
    input: 'dist/esm/types/plugins.d.ts',
    output: [{ file: 'dist/plugins.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
