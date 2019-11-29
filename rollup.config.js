import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

module.exports = {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      sourceMaps: true,
      presets: [
        ['@babel/preset-env', {
          targets: '> 0.25%, not dead',
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
        }],
      ],
    }),
    resolve(),
    commonjs(),
  ],
};
