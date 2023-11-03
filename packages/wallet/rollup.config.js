import typescript from '@rollup/plugin-typescript';
import { nodeExternals } from 'rollup-plugin-node-externals';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
// eslint-disable-next-line prettier/prettier
import pkg from './package.json' assert { type: 'json' };

const config = {
  name: 'OpenWallet',
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      name: config.name,
    },
  ],
  plugins: [
    nodeExternals({
      exclude: /^react-use/,
    }),
    nodeResolve({
      extensions: config.extensions,
    }),
    typescript(), // Include the TypeScript plugin
    babel({
      extensions: config.extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript', // Make sure to include the TypeScript preset
      ],
    }),
    commonjs(),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
};
