import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'parvan-designsystem',
      fileName: (format) => format === 'cjs' ? `index.${format}` : `index.${format}.mjs`,
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      plugins: [
        babel({
          exclude: 'node_modules/**',
          presets: ['@babel/preset-env', '@babel/preset-react'],
          babelHelpers: 'bundled',
          plugins: [['styled-components', { ssr: true }]],
        }),
      ],
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        },
        exports: 'named',
      }
    },
  },
});