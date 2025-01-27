import commonjs from '@rollup/plugin-commonjs';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import packageJSON from './package.json' with { type: 'json' };

export default [
  {
    input: './src/index.ts',
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
      peerDepsExternal(),
      commonjs(),
      postcss({
        extensions: ['.css'],
        extract: false,
        inject: true,
      }),
      resolve(),
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
];
