import React from 'react';
import { cdn } from '@utils/general';

const ApercuProBoldWoff2 = cdn('/static/fonts/text/ApercuPro-Bold.woff2');
const ApercuProBoldWoff = cdn('/static/fonts/text/ApercuPro-Bold.woff');

const ApercuProMediumWoff2 = cdn('/static/fonts/text/ApercuPro-Medium.woff2');
const ApercuProMediumWoff = cdn('/static/fonts/text/ApercuPro-Medium.woff');

const ApercuProRegularWoff2 = cdn('/static/fonts/text/ApercuPro-Regular.woff2');
const ApercuProRegularWoff = cdn('/static/fonts/text/ApercuPro-Regular.woff');

const LatoLightWoff2 = cdn('/static/fonts/text/Lato-Light.woff2');
const LatoLightWoff = cdn('/static/fonts/text/Lato-Light.woff');
const LatoRegularWoff2 = cdn('/static/fonts/text/Lato-Regular.woff2');
const LatoRegularWoff = cdn('/static/fonts/text/Lato-Regular.woff');
const LatoBoldWoff2 = cdn('/static/fonts/text/Lato-Bold.woff2');
const LatoBoldWoff = cdn('/static/fonts/text/Lato-Bold.woff');
const LatoBlackWoff2 = cdn('/static/fonts/text/Lato-Black.woff2');
const LatoBlackWoff = cdn('/static/fonts/text/Lato-Black.woff');

const BebasNeue = cdn('/static/fonts/text/BebasNeue-Regular.ttf');

const icomoonEot = cdn('/static/fonts/icon/icomoon.eot');
const icomoonTtf = cdn('/static/fonts/icon/icomoon.ttf');
const icomoonWoff = cdn('/static/fonts/icon/icomoon.woff');
const icomoonSvg = cdn('/static/fonts/icon/icomoon.svg');

const sufix = 'r0qbix';

const fonts = () => (
  <>
    <style jsx>
      {`
        @font-face {
          font-family: 'Apercu Pro';
          src: url(${ApercuProBoldWoff2}) format('woff2'),
            url(${ApercuProBoldWoff}) format('woff');
          font-weight: 600;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'Apercu Pro';
          src: url(${ApercuProMediumWoff2}) format('woff2'),
            url(${ApercuProMediumWoff}) format('woff');
          font-weight: 500;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'Apercu Pro';
          src: url(${ApercuProRegularWoff2}) format('woff2'),
            url(${ApercuProRegularWoff}) format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'Apercu Pro';
          src: url(${ApercuProRegularWoff2}) format('woff2'),
            url(${ApercuProRegularWoff}) format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'Bebas Neue';
          src: url(${BebasNeue}) format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'icomoon';
          src: url(${`${icomoonEot}?${sufix}`});
          src: url(${`${icomoonEot}?${sufix}#iefix`})
              format('embedded-opentype'),
            url(${`${icomoonTtf}?${sufix}`}) format('truetype'),
            url(${`${icomoonWoff}?${sufix}`}) format('woff'),
            url(${`${icomoonSvg}?${sufix}#icomoon`}) format('svg');
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'Lato';
          src: url(${LatoLightWoff2}) format('woff2'),
            url(${LatoLightWoff}) format('woff');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Lato';
          src: url(${LatoRegularWoff2}) format('woff2'),
            url(${LatoRegularWoff}) format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Lato';
          src: url(${LatoBoldWoff2}) format('woff2'),
            url(${LatoBoldWoff}) format('woff');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Lato';
          src: url(${LatoBlackWoff2}) format('woff2'),
            url(${LatoBlackWoff}) format('woff');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }
      `}
    </style>
  </>
);

export default fonts;
