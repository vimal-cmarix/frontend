import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* eslint-disable */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function (f, r, n, d, b, y) {
                b = f.createElement(r), y = f.getElementsByTagName(r)[0];
                b.async = 1;
                b.src = n;
                b.id = 'RR_DIVID';
                y.parentNode.insertBefore(b, y);
              })(document, 'script', '//${process.env.REFERRAL_ROCK_KEY}.referralrock.com/webpixel/beta/universalv03.js');
            `,
            }}
          />
          <script src="https://go.joinsizigi.com/core.js" async></script>
          <meta charSet="UTF-8" />
          <meta name="google" content="notranslate" />
          <meta httpEquiv="Content-Language" content="en" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (window.location.hostname === "app.joinsizigi.com") {
                window.location.href = "https://joinsizigi.com" + window.location.pathname + window.location.search
              }
            `,
            }}
          ></script>
          {/* eslint-enable */}
        </Head>
        <body id="body-id">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
