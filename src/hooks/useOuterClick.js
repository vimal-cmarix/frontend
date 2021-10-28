import { useRef, useEffect } from 'react';

const useOuterClick = callback => {
  const innerRef = useRef();
  const callbackRef = useRef();

  const handleClick = e => {
    if (
      innerRef.current &&
      callbackRef.current &&
      !innerRef.current.contains(e.target)
    ) {
      callbackRef.current(e);
    }
  };

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return innerRef;
};

export default useOuterClick;
