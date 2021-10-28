import { useEffect, useState } from 'react';

function useMedia(query) {
  if (typeof window !== 'undefined') {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
      const media = window.matchMedia(query);
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent,
      );

      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => setMatches(media.matches);

      if (isSafari) {
        media.addListener(listener);

        return () => media.removeListener(listener);
      }

      media.addEventListener('change', listener);

      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  }

  return null;
}

export default useMedia;
