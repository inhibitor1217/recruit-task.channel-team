import React from 'react';

type ScrollPosition = {
  top?: number;
  left?: number;
  height?: number;
  width?: number;
};

const useScrollPosition = <T extends HTMLElement>(): [
  React.RefObject<T>,
  ScrollPosition | undefined,
  () => void
] => {
  const ref = React.useRef<T>(null);
  const [position, setPosition] = React.useState<ScrollPosition>();

  const measure = React.useCallback(() => {
    setPosition(
      ref.current
        ? {
            top: ref.current.scrollTop,
            left: ref.current.scrollLeft,
            height: ref.current.scrollHeight - ref.current.clientHeight,
            width: ref.current.scrollWidth - ref.current.clientWidth,
          }
        : undefined
    );
  }, [ref.current]);

  const onScroll = () => measure();

  return [ref, position, onScroll];
};

export default useScrollPosition;
