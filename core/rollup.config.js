import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import scss from 'rollup-plugin-scss';
import svgr from '@svgr/rollup';

import pkg from './package.json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    scss(),
    postcss({
      modules: false
    }),
    url(),
    svgr(),
    babel({
      extensions,
      exclude: 'node_modules/**',
      include: ['src/**/*'],
      plugins: [ ]
    }),
    resolve({ extensions }),
    commonjs()
  ]
}
