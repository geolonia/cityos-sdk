import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import fs from 'node:fs'

const packageJson = JSON.parse(fs.readFileSync('package.json'));

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'umd',
      sourcemap: true,
      name: 'City',
    },
  ],
  plugins: [
    resolve(),
    commonjs({
      requireReturnsDefault: "auto",
    }),
    typescript(),
    postcss({
      inject: true,
      sourceMap: true,
    }),
    copy({
      targets: [
        { src: 'public/index.html', dest: 'docs' },
      ]
    }),
    json(),
  ],
};

export default config;
