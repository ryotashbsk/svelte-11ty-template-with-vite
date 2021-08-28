const { config } = require('./config');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const htmlmin = require('html-minifier');
const nodeEnv = process.env.NODE_ENV;

module.exports = function (eleventyConfig) {
  // src/templates/data/site.ymlの読み込み
  eleventyConfig.addDataExtension('yml', (contents) => yaml.load(contents));

  // BrowserSyncの設定
  eleventyConfig.setBrowserSyncConfig({
    // proxyを有効にするため、11tyでのデータ参照を無効
    server: null,

    // viteで起動されたサーバーのURLを指定
    // 他の開発環境のポートとのコンフリクトに要注意
    proxy: 'localhost:3000',

    // proxy時に静的ファイルも参照する
    serveStatic: [
      {
        route: config.pathPrefix.slice(0, -1),
        dir: config.outputPath
      }
    ],

    ui: false,
    ghostMode: false
  });

  // manifest.json取得
  const manifestPath = path.resolve(__dirname, `${config.outputPath}/manifest.json`);
  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' })) : '';

  // manifest.jsonの値を11tyにショートコードとして渡す
  eleventyConfig.addNunjucksShortcode('ManifestMainCss', () => manifest[config.entryPoint]['css']);
  eleventyConfig.addNunjucksShortcode('ManifestMainJS', () => manifest[config.entryPoint]['file']);

  // htmlの圧縮（production時）
  if (nodeEnv == 'production') {
    eleventyConfig.addTransform('html-min', (content, outputPath) =>
      outputPath.endsWith('.html')
        ? htmlmin.minify(content, {
            // タグ間の空白を削除
            collapseWhitespace: true,

            // インラインタグの空白を削除
            collapseInlineTagWhitespace: true,

            // コメントを削除
            removeComments: true,

            // JS,CSSの圧縮
            minifyJS: true,
            minifyCSS: true,

            // スタイルタグとリンクタグからtype="text/css"を削除
            removeStyleLinkTypeAttributes: true,

            // DOCTYPE宣言を小文字に
            useShortDoctype: true,

            // <script type="application/ld+json"></script>で圧縮の有効化
            processScripts: '["application/ld+json"]'
          })
        : content
    );
  }

  return {
    // テンプレートエンジンの指定
    htmlTemplateEngine: 'njk',

    // html内のルートパスの設定
    // サブディレクトリで起動する際は'/sub-directly/'とする
    pathPrefix: config.pathPrefix,

    dir: {
      // テンプレートの参照先
      input: config.resourcePath + '/templates',

      // includeの参照先（inputからの相対パス）
      // デフォルトは_includesとアンダーバー付きなのでリネームしている
      includes: 'includes',

      // dataの参照先（inputからの相対パス）
      // デフォルトは_dataとアンダーバー付きなのでリネームしている
      data: 'data',

      // テンプレートのビルド先
      output: 'dist'
    }
  };
};
