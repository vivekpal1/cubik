import React from 'react';

const LayoutHOC = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full">
      <div className="flex w-full flex-col px-6 py-8 md:p-24">{children}</div>
    </main>
  );
};

export default LayoutHOC;
