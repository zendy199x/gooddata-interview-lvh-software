// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/gdc', {
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      secure: false,
      target: 'https://developer.na.gooddata.com',
      headers: {
        host: 'developer.na.gooddata.com',
        origin: null,
      },
      onProxyReq(proxyReq) {
        proxyReq.setHeader('accept-encoding', 'identity');
      },
    }),
  );
  app.use(
    createProxyMiddleware('/*.html', {
      changeOrigin: true,
      secure: false,
      target: 'https://developer.na.gooddata.com',
    }),
  );
  app.use(
    createProxyMiddleware('/packages/*.{js,css}', {
      changeOrigin: true,
      secure: false,
      target: 'https://developer.na.gooddata.com',
    }),
  );
};
