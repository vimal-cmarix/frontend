import { useMemo, useContext } from 'react';
import { sizes } from '@assets/styles/medias';
import AppContext from '@context/appContext';
import { cdn } from '@utils/general';

export default function getCoverImage(data) {
  if (data.type === 'link') {
    if (data.asset && data.asset.path?.thumbnail)
      return data.asset.path.thumbnail;

    return (
      (data.link && data.link.imageUrl) || cdn('/static/img/thumb_default.png')
    );
  }
  if (data.type === 'document') {
    return data.asset.thumbnail || data.asset.path?.thumbnail;
  }
  if (data.asset) {
    if (data.asset.type === 'video') {
      return data.asset.thumbnail || false;
    }
    return data.asset.url || false;
  }

  return false;
}

export function useGridOptions({ postOffset, widthOffset }) {
  const { state: appState } = useContext(AppContext);
  const screenWidth = appState.screenWidth - widthOffset;
  const postWidth = 330;

  const gridGap = useMemo(() => {
    if (screenWidth > parseInt(sizes.laptop, 10)) return 24;
    return 40;
  }, [screenWidth]);

  const postPerLine = useMemo(() => {
    const count = (() => {
      if (screenWidth >= parseInt(sizes.desktop, 10)) return 5;
      if (screenWidth >= parseInt(sizes.desktosmall, 10)) return 4;
      if (screenWidth >= parseInt(sizes.tabletsmall, 10)) return 3;
      if (screenWidth >= parseInt(sizes.tabletPortrait, 10)) return 2;
      return 1;
    })();
    return count - postOffset;
  }, [screenWidth]);

  const gridMaxWidth = useMemo(() => {
    return postPerLine * postWidth + (postPerLine - 1) * gridGap;
  }, [postPerLine, gridGap, postWidth]);

  return {
    postPerLine,
    gridMaxWidth: `${gridMaxWidth}px`,
    gridGap: `${gridGap}px`,
  };
}
