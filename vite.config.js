// @ts-check
import 'dotenv/config'
import { defineConfig } from 'vite'
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis',
    },
    root: 'example',
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    publicDir: '_public',
    plugins: [
        {
            name: 'html-transform',
            transformIndexHtml (html) {
                const isProduction = process.env.NODE_ENV === 'production'
                const isStaging = process.env.NODE_ENV === 'staging'

                let map
                if (isProduction && !isStaging) {
                    map = '{ "imports": { "@substrate-system/debug": "data:text/javascript,export default function(){return()=>{}}" } }'
                } else if (isStaging) {
                    map = '{ "imports": { "@substrate-system/debug": "/vendor/debug.js" } }'
                } else {  // is dev
                    map = '{ "imports": { "@substrate-system/debug": "../node_modules/@substrate-system/debug/dist/index.js" } }'
                }

                return html.replace('<%- IMPORT_MAP_CONTENT %>', map)
            },
        },
    ],
    css: {
        postcss: {
            plugins: [
                postcssNesting
            ],
        },
    },
    server: {
        port: 8888,
        host: true,
        open: true,
    },
    build: {
        rollupOptions: {
            external: ['@substrate-system/debug'],
        },
        minify: false,
        outDir: '../public',
        emptyOutDir: true,
        sourcemap: 'inline'
    }
})
