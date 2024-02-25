import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';

export default defineConfig({
    input: path.resolve('./', 'src', 'index.ts'),
    output: {
        file: path.resolve('./', 'web', 'core.js'),
        format: 'es',
    },
    plugins: [typescript()],
});
