import fs from 'fs';
import React from 'react';
import Helmet from 'react-helmet';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import App from '../src/App';
import manifest from '../build/asset-manifest.json';
import * as serverConfig from './config';

export default (req, res) => {
  const injectHTML = (data, { html, title, meta, body, scripts }) => {
    data = data.replace('<html>', `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', `${meta}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`
    );
    data = data.replace('</body>', scripts.join('') + '</body>');

    return data;
  };

  console.log(`${serverConfig.STATIC_DIR}/index.html`);

  fs.readFile(`${serverConfig.STATIC_DIR}/index.html`, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Read error', err);

      return res.status(404).end();
    }

    const context = {};
    const modules = [];

    frontloadServerRender(() =>
      ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <Frontload isServer={true}>
            <App />
          </Frontload>
        </StaticRouter>
      )
    ).then(routeMarkup => {
      if (context.url) {
        // If context has a url property, then we need to handle a redirection in Redux Router
        res.writeHead(302, {
          Location: context.url
        });

        res.end();
      } else {
        // Otherwise, we carry on...

        // Let's give ourself a function to load all our page-specific JS assets for code splitting
        const extractAssets = (assets, chunks) =>
          Object.keys(assets)
            .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
            .map(k => assets[k]);

        // Let's format those assets into pretty <script> tags
        const extraChunks = extractAssets(manifest, modules).map(
          c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
        );

        // We need to tell Helmet to compute the right meta tags, title, and such
        const helmet = Helmet.renderStatic();

        // NOTE: Disable if you desire
        // Let's output the title, just to see SSR is working as intended
        console.log('THE TITLE', helmet.title.toString());

        // Pass all this nonsense into our HTML formatting function above
        const html = injectHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          body: routeMarkup,
          scripts: extraChunks
        });

        // const html = injectHTML(htmlData, {
        //   html: '',
        //   title: 'helmet.title.toString()',
        //   meta: '',
        //   body: routeMarkup,
        //   scripts: extraChunks
        // });

        // We have all the final HTML, let's send it to the user already!
        res.send(html);
      }
    });
  });
};
