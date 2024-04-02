import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

const { BAZEL, COVERAGE } = process.env;

export default defineConfig({
  test: {
    cache: BAZEL ? false : undefined,
    globals: true,
    hookTimeout: 1000,
    include: ['**/*.spec.ts'],
    pool: 'vmThreads',
    testTimeout: 10_000,
    exclude: [
      ...configDefaults.exclude,
      '**/*e2e*',
      '**/bazel*/**',
      '**/out',
      '**/target',
      'trumid/ats/ui/**',
      '**/*.runfiles/__main__', // for bazel
    ],
    coverage: {
      // COVERAGE is set by bazel
      enabled: COVERAGE === '1',
      provider: 'istanbul',
      exclude: ['**/trumid/common/testing/**'],
    },
  },
  plugins: [
    // handles tsconfig.paths
    tsconfigPaths(),
    // allows experimental decorators to work
    swc.vite(),
  ],
});
