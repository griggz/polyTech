require('dotenv').config()

module.exports = {
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    WORKER_ACCOUNT: process.env.WORKER_ACCOUNT,
    WORKER_PASSWORD: process.env.WORKER_PASSWORD,
    WORKER_TOKEN: process.env.WORKER_TOKEN,
    WORKER_SESSION_LATEST: process.env.WORKER_SESSION_LATEST
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  target: 'serverless',
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

