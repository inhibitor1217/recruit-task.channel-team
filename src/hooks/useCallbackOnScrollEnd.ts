import React from 'react';
import useScrollPosition from './useScrollPosition';

const useCallbackOnScrollEnd = <T extends HTMLElement>(
  callback: () => void,
  params?: {
    scrollThreshold?: number;
    direction?: 'horizontal' | 'vertical';
  }
): [React.RefObject<T>, () => void] => {
  const scrollThreshold = params?.scrollThreshold ?? 120;
  const direction = params?.direction ?? 'vertical';

  const [containerRef, position, onScroll] = useScrollPosition<T>();
  const { width, height, top, left } = position || {};
  const throttleRef = React.useRef<boolean>(false);

  const fireAction = React.useCallback(() => {
    if (!throttleRef.current) {
      callback();
      setTimeout(() => {
        throttleRef.current = false;
      }, 500);
      throttleRef.current = true;
    }
  }, [callback]);

  React.useLayoutEffect(() => {
    if (width && left && direction === 'horizontal') {
      if (left + scrollThreshold > width) {
        fireAction();
      }
    }
  }, [fireAction, width, left, scrollThreshold, direction]);

  React.useLayoutEffect(() => {
    if (height && top && direction === 'vertical') {
      if (top + scrollThreshold > height) {
        fireAction();
      }
    }
  }, [fireAction, height, top, scrollThreshold, direction]);

  return [containerRef, onScroll];
};

export default useCallbackOnScrollEnd;
