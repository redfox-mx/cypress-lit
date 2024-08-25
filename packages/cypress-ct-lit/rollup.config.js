import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [resolve()],
  input: 'dist/index.js',
  output: {
    file: 'dist/index.bundle.js',
    format: 'es'
  },
  external: [/^lit/]
})
