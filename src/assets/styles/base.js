import { createGlobalStyle } from 'styled-components';
import { smscreen } from '@assets/styles/medias';
import { ParagraphMedium } from './typography';
import { Grey500 } from './colors';

const base = createGlobalStyle`
  :root {
    --height-full: 100%;
  }

  body {
    ${ParagraphMedium};
    color: ${Grey500};

    &.overflow_hide{
      overflow: hidden;
    }

    /* FIX FOR HUBSPOT ICON */
    #hubspot-messages-iframe-container {

      &.hidden-widget {
        left: 110vw;
      }

      @media ${smscreen} {
        bottom: 50px !important;

        iframe {
          max-height: 100vh;
          z-index: -1;
        }

        .shadow-container {
          &.active {
            + iframe {
              top: 50px;
              z-index: 0;
            }
          }
        }

      }
    }
  }

  #___reactour {
    position: absolute;
    z-index: 99;

    .mask {
      color: rgba(30,30,31,1);
      opacity: .5;
    }
  }

  #__filestack-picker {
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media ${smscreen} {
    .iuwrio button {
      background: #FAFAFA !important;
    }
  }
`;

export default base;
