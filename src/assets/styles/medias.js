export const sizes = {
  iphone5: {
    width: '330px',
  },
  iphone6: {
    height: '670px',
  },
  zenfone3: {
    height: '580px',
  },
  smallphone: '375px',
  mediumphone: '420px',
  tabletPortrait: '769px',
  tabletsmall: '990px',
  tablet: '1023px',
  laptop: '1130px',
  laptopMedium: '1096px',
  desktosmall: '1340px',
  desktopmedium: '1440px',
  desktop: '1800px',
  ultrawide: '1921px',
};

// export const deviceLargetHeight = `(max-height: ${sizes.iphoneX.height})`;
export const smallestHeight = `(max-height: ${sizes.zenfone3.height})`;
export const smallHeight = `(max-height: ${sizes.iphone6.height})`;
export const xxxsscreen = `(max-width: ${sizes.iphone5.width})`;
export const xxsscreen = `(max-width: ${sizes.smallphone})`;
export const xmscreen = `(max-width: ${sizes.mediumphone})`;
export const smscreen = `(max-width: ${sizes.tablet})`;
export const smscreenReverse = `(min-width: ${sizes.tablet})`;
export const laptop = `(max-width: ${sizes.laptop})`;
export const laptopMedium = `(max-width: ${sizes.laptopMedium})`;
export const desktopMedium = `(max-width: ${sizes.desktopmedium})`;
export const deskscreen = `(min-width: ${sizes.desktop})`;
export const ultrawide = `(min-width: ${sizes.ultrawide})`;
