import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from 'tailwindcss';
import path from "path";
import pluginChecker from 'vite-plugin-checker';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    return {
        // vite config
        base: '/',
        define: {
            __APP_ENV__: env.APP_ENV,
        },
        build: {
            outDir: 'build'
        },
        plugins: [
            react(),
            // pluginChecker({ typescript: true }),
        ],
        css: {
            postcss: {
                plugins: [tailwindcss],
            },
        },
        server: {
            port: 3000,
            host: true,
        },
        resolve: {
            alias: {
                // '@': path.resolve(__dirname, './src'),
                '@': path.resolve(__dirname, 'src'),
            },
        },
        include: ['pdfjs-dist/build/pdf.worker.min.js'],
    }
})
