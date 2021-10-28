import { cdn } from '@utils/general';

export default {
  facebook: {
    image: cdn('/static/img/social/facebook.svg'),
    placeholder: 'https://www.facebook.com/yourusername',
  },
  linkedin: {
    image: cdn('/static/img/social/linkedin.svg'),
    placeholder: 'https://www.linkedin.com/in/yourusername',
  },
  instagram: {
    image: cdn('/static/img/social/instagram.svg'),
    placeholder: 'https://www.instagram.com/yourusername',
  },
  twitter: {
    image: cdn('/static/img/social/twitter.svg'),
    placeholder: 'https://www.linkedin.com/in/yourusername',
  },
  tiktok: {
    image: cdn('/static/img/social/tiktok.svg'),
    placeholder: 'https://vm.tiktok.com/yourusername',
  },
  youtube: {
    image: cdn('/static/img/social/youtube.svg'),
    placeholder: 'https://www.youtube.com/channel/yourchanel',
  },
  github: {
    image: cdn('/static/img/social/github.svg'),
    placeholder: 'https://github.com/yourusername',
  },
  other: {
    image: cdn('/static/img/social/custom-url.svg'),
    placeholder:
      'you got a blog? A github you want to show off? Just copy paste here! ',
  },
};
