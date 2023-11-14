/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

type Props = {
  active: boolean;
  onClick: (active: boolean) => void;
  className?: string;
  dotClassName?: string;
};

const Toggle = ({ active, onClick, className, dotClassName }: Props) => {
  const activeClass = `bg-white transform translate-x-full`;
  const inactiveClass = `bg-white`;
  return (
    <button type="button" onClick={() => onClick(!active)}>
      <div></div>
    </button>
  );
};

export default Toggle;
