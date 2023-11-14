import React from 'react';

import ParagraphText from '../components/paragraphText';

const ComponentHeading = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-6">
      <p className="text-4xl text-[var(--color-fg-primary)] md:text-5xl">
        {heading}
      </p>
      <ParagraphText text={description} />
    </div>
  );
};

export default ComponentHeading;
