module.exports = {
  // 11tyテンプレート内でprocess.env.NODE_ENVを取得
  // {% if build.env == "production" %}{% endif %}に利用可能
  env: process.env.NODE_ENV
};
