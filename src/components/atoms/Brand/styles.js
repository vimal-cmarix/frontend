import styled from 'styled-components';
import { cdn } from '@utils/general';

const darkImg = cdn('/static/img/sizigi.svg');
const lightImg = cdn('/static/img/sizigi-white.svg');
const navImg = cdn('/static/img/sizigi-nav.svg');
const navDarkImg = cdn('/static/img/sizigi-nav-dark.svg');
const sizigiGrayLogo = cdn('/static/img/sizigi-gray-logo.svg');

const sizes = {
  nav: {
    width: '45px',
    height: '45px',
  },
  navDark: {
    width: '45px',
    height: '45px',
  },
  small: {
    width: '91px',
    height: '30px',
  },
  medium: {
    width: '128px',
    height: '42px',
  },
  large: {
    width: '160px',
    height: '53px',
  },
};

const backgroundImg = props => {
  if (props.size === 'nav') return navImg;

  if (props.size === 'navDark') return navDarkImg;
  if (props.colorSchema === 'gray') return sizigiGrayLogo;

  return props.colorSchema === 'dark' ? darkImg : lightImg;
};

const Logo = styled.h1`
  width: ${props => sizes[props.size].width};
  height: ${props => sizes[props.size].height};
  background-image: url(${props => backgroundImg(props)});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-indent: -9999px;
`;

export default Logo;
