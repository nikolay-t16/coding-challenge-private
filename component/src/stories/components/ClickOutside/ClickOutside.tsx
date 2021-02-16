import React, { PropsWithChildren, useEffect, useRef } from 'react';

const ClickOutside = (props: PropsWithChildren<{ clickOutside: () => void }>) => {
  const { children, clickOutside, ...elementProps } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        clickOutside();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div {...elementProps} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickOutside;
