import { resolve as _resolve } from 'path';

export const test = {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    deps: {
        inline: ['html-encoding-sniffer', '@exodus/bytes'],
    },
    threads: false,
    isolate: true,
    coverage: {
        provider: 'istanbul',
        reporter: ['text', 'lcov'],
        reportsDirectory: 'coverage',
        include: ['src/**/*.{ts,tsx,js,jsx}'],
        exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/**/*.d.ts'],
    },
};
export const resolve = {
    alias: {
        '@': _resolve(__dirname, 'src'),
    },
};