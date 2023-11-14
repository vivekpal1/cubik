import React, { PropsWithChildren, useEffect, useState } from 'react';

const Collapse: React.FC<
  PropsWithChildren<{
    height: string | number;
    maxHeight: string | number;
    expanded: boolean;
  }>
> = ({ children, height, maxHeight, expanded }) => {
  const [localHeight, setLocalHeight] = useState<string | number>(height);

  useEffect(() => {
    if (expanded) setLocalHeight(maxHeight);
    else setLocalHeight(height);
  }, [height, maxHeight, expanded]);

  return <div style={{ height: localHeight, maxHeight }}>{children}</div>;
};

export default Collapse;
