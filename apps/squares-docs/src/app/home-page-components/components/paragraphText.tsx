import React from 'react';

const ParagraphText = ({ text }: { text: string }) => {
  return (
    <div className="text-sm text-[var(--color-fg-secondary)] md:text-base">
      {text}
    </div>
  );
};

export default ParagraphText;
