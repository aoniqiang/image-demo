import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginCompression from 'vite-plugin-compression';
import vitePluginImagemin from 'vite-plugin-imagemin';
import viteCDNPlugin from 'vite-plugin-cdn-import';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';

export default defineConfig((config) => {
  return {
    plugins: [
      react(),
      reactRefresh(),
      viteCDNPlugin({
        // CDN插件配置，不用在项目中打包
        modules: [
          {
            name: 'react',
            var: 'React',
            path: 'https://unpkg.com/react@18/umd/react.production.min.js',
          },
          {
            name: 'react-dom',
            var: 'ReactDOM',
            path: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
          },
          {
            name: 'lodash',
            var: '_',
            path: 'https://cdn.bootcss.com/lodash.js/4.17.21/lodash.min.js',
          },
        ],
      }),
      vitePluginCompression({
        threshold: 1024 * 10, // 对大于 10kb 的文件进行压缩
        // deleteOriginFile: true,
      }),
      // 图片压缩
      vitePluginImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        webp: {
          quality: 75,
        },
        mozjpeg: {
          quality: 8,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              removeViewBox: false,
            },
            {
              removeEmptyAttrs: false,
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': `${resolve(process.cwd(), 'src')}`,
      },
    },
    server: {
      host: '0.0.0.0',
      open: false,
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8087',
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    base: `/`,
    build: {
      outDir: `./demo`,
      emptyOutDir: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          globals: {
            react: 'React',
            lodash: '_',
            'react-dom': 'ReactDOM',
          },
        },
        external: ['react', 'react-dom', 'lodash'],
      },
    },
    define: {
      'process.env': process.env,
    },
  };
});
