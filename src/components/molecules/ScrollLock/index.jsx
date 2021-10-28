import React, { useEffect, useRef } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const ScrollLock = ({ children }) => {
  const node = useRef(null);

  useEffect(() => {
    if (node && node.current) {
      disableBodyScroll(node.current, { reserveScrollBarGap: true });
    }

    return () => {
      if (node && node.current) {
        enableBodyScroll(node.current);
      }
      clearAllBodyScrollLocks();
    };
  }, []);

  if (children) {
    return (
      <div
        ref={node}
        css={{
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100% + 1px)', // fixes an iOS Safari bug where dynamically rendered content beyond the viewport doesn't scroll
        }}
      >
        {children}
      </div>
    );
  }

  return <div ref={node} />;
};

export default ScrollLock;
