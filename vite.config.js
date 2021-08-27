import { defineConfig } from 'vite';
import path from 'path';
import { config } from './config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  // サイトのルートパス
  // サブディレクトリで起動する際は'/sub-directly/'とする
  base: config.pathPrefix,

  build: {
    // ビルド先
    outDir: config.outputPath,

    // outDirにmanifest.jsonを作成
    manifest: true,

    rollupOptions: {
      // エントリーポイント
      input: config.entryPoint
    },

    terserOptions: {
      compress: {
        // ビルド時console.logを削除
        drop_console: true
      }
    }
  },

  resolve: {
    // エイリアス
    // 各js内で 'import Layout from '@components/Layout.svelte';'のように呼び出せる
    alias: {
      '@images': path.join(__dirname, `${config.resourcePath}/images`),
      '@root': path.join(__dirname, `${config.resourcePath}/scripts`),
      '@modules': path.join(__dirname, `${config.resourcePath}/scripts/modules`),
      '@routes': path.join(__dirname, `${config.resourcePath}/scripts/routes`),
      '@components': path.join(__dirname, `${config.resourcePath}/scripts/components`)
    }
  },

  // プラグイン
  plugins: [
    svelte(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
});
