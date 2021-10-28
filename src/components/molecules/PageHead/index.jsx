import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Primary } from '@assets/styles/colors';
import AppContext from '@context/appContext';
import ProfileContext from '@context/profileContext';
import { cdn } from '@utils/general';
import useMedia from '@hooks/useMedia';
import { sizes as breakpoint } from '@assets/styles/medias';

/**
 * PageHead configure meta tags and configurations
 */

const PageHead = ({
  title,
  image,
  description,
  video,
  type,
  imageWidth,
  imageHeight,
  children,
  canonical,
}) => {
  const { state: appState } = useContext(AppContext);
  const { state: profileState } = useContext(ProfileContext);

  const router = useRouter();
  const hubspotPermission = ['/profile'];

  const [chatVisibility, setChatVisibility] = useState(false);

  const isMobile = useMedia(`(max-width: ${breakpoint.tabletPortrait})`);

  useEffect(() => {
    const hubSpot = document.querySelector(
      '#hubspot-messages-iframe-container',
    );
    const { isOpened } = appState.tour;

    if (!hubspotPermission.includes(router.route) || isOpened || isMobile) {
      setChatVisibility(false);
      if (hubSpot) hubSpot.classList.add('hidden-widget');
    } else {
      setChatVisibility(true);
      if (hubSpot) hubSpot.classList.remove('hidden-widget');
    }
  }, [
    router.route,
    appState.tour.isOpened,
    appState.eportfolio_tour.ePorfolioIsOpened,
    isMobile,
  ]);

  const pageTitle = page => {
    if (profileState && profileState.personalInfo !== undefined) {
      return `Sizigi | ${page} | ${profileState.personalInfo.firstName} ${profileState.personalInfo.lastName}`;
    }

    return `Sizigi | ${page}`;
  };

  return (
    <Head>
      <title>{pageTitle(title)}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:site_name" content="Sizigi" />
      <meta property="og:image" content={image} />
      {imageWidth && <meta property="og:image:width" content={imageWidth} />}
      {imageHeight && <meta property="og:image:height" content={imageHeight} />}
      {video && <meta property="og:video" content={video} />}
      {type && <meta property="og:type" content={type} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle(title)} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:description"
        content={
          description ||
          'Improving the hiring process starts with Sizigi. Build a digital portfolio of rich media that creates amazing interviewing experiences'
        }
      />
      <meta name="twitter:title" content={`Sizigi - ${title}`} />
      <meta name="twitter:site" content="@joinsizigi" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@joinsizigi" />
      <meta name="description" content={description} />
      <meta name="keywords" content="aaa bbb, ccc , ddd, eee fff" />
      <meta
        name="msapplication-TileImage"
        content="https://joinsizigi.com/wp-content/uploads/2020/04/Screen-Shot-2019-12-13-at-1.47.10-PM-1.png"
      />
      <link
        rel="icon"
        sizes="48x48"
        href={cdn('/static/favicon/favicon-48x48.png')}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="icon"
        sizes="32x32"
        href="https://joinsizigi.com/wp-content/uploads/2020/04/Screen-Shot-2019-12-13-at-1.47.10-PM-1.png"
      />
      <link
        rel="icon"
        sizes="192x192"
        href="https://joinsizigi.com/wp-content/uploads/2020/04/Screen-Shot-2019-12-13-at-1.47.10-PM-1.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="https://joinsizigi.com/wp-content/uploads/2020/04/Screen-Shot-2019-12-13-at-1.47.10-PM-1.png"
      />
      {canonical && <link rel="canonical" href={canonical} />}
      <link rel="manifest" href={cdn('/manifest.json')} />
      <meta name="theme-color" content={Primary} />
      {chatVisibility && (
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src={`//js.hs-scripts.com/${process.env.HUBSPOT_KEY}.js`}
        />
      )}
      {children}
    </Head>
  );
};

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.string,
  video: PropTypes.string,
  imageHeight: PropTypes.string,
  imageWidth: PropTypes.string,
  description: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.any),
  canonical: PropTypes.string,
};

PageHead.defaultProps = {
  children: [],
  image: cdn('/static/img/sizigi.png'),
  type: 'article',
  video: null,
  imageHeight: null,
  imageWidth: null,
  canonical: null,
};

export default PageHead;
