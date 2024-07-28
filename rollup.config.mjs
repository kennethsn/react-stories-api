import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

import packageJSON from './package.json' with { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJSON.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      commonjs(),
      postcss({
        extensions: ['.css'],
        extract: false,
        inject: true,
      }),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.ts', './archive/**/*'], // KSN TODO: remove archive
      }),

    ],
  },
  {
    external: [/\.css$/],
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
