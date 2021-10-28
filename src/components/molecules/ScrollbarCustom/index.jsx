import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { MediumGrey, ExtraLightGrey } from '@assets/styles/colors';
import { ContainerChildren } from './style';

const ScrollbarCustom = ({ autoHeightMax, children }) => {
  const [paddingRight, setPaddingRight] = useState(0);

  const scrollbars = useRef(null);

  function handleScroll() {
    if (
      scrollbars.current &&
      scrollbars.current.getClientHeight() >= parseFloat(autoHeightMax)
    )
      setPaddingRight(13);
    else setPaddingRight(0);
  }

  useEffect(() => {
    handleScroll();
  }, [scrollbars.current]);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: MediumGrey,
      right: 1,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderView = ({ style, ...props }) => {
    const thumbStyle = {
      paddingRight,
      backgroundColor: ExtraLightGrey,
      overflowY: 'scroll',
      overflowX: paddingRight !== 0 ? 'scroll' : 'hidden',
      marginBottom: 0,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <Scrollbars
      ref={scrollbars}
      autoHeight
      style={{ position: 'sticky' }}
      onUpdate={handleScroll}
      autoHeightMax={autoHeightMax}
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      renderView={renderView}
      className="scroll-bar__container"
      hideTracksWhenNotNeeded
    >
      <ContainerChildren>{children}</ContainerChildren>
    </Scrollbars>
  );
};
ScrollbarCustom.propTypes = {
  autoHeightMax: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.elementType),
  ]).isRequired,
};

export default ScrollbarCustom;
