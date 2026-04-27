import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/tests/**',
        'src/main.jsx',
        'src/assets/**',
        'src/**/*.test.*',
        'src/**/*.test.jsx'
      ],
      thresholds: {
        statements: 60,
        branches: 50,
        functions: 60,
        lines: 60
      }
    }
  }
})
