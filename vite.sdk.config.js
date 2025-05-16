import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/sdk/index.ts'),
            name: 'geovisearth-offline-users',
            fileName: (format) => `geovisearth-offline-users.${format}.js`
        },
        rollupOptions: {
            external: ['casdoor-js-sdk'],
            input: {
                main: resolve(__dirname, 'src/sdk/index.ts')
            },
            output: {
                globals: {
                    'casdoor-js-sdk': 'casdoorSdk'
                },
            }
        },
        copyPublicDir: false,
        outDir: 'dist/',
        emptyOutDir: true
    }
})