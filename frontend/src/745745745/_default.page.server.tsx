import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server';
import { PageShell } from './PageShell';
import '../index.css';

export async function render(pageContext: any) {
  const { Page, pageProps, urlOriginal } = pageContext;

  const pageHtml = ReactDOMServer.renderToString(
    <StaticRouter location={urlOriginal}>
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </StaticRouter>
  );

  return escapeInject`<!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${pageContext.documentProps?.title || 'Геленджик'}</title>
        <meta name="description" content="${pageContext.documentProps?.description || ''}" />
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}