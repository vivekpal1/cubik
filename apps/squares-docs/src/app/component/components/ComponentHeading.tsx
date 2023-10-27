import Subhead from "@cubik/ui/components/ui/subhead";
import React from "react";

const ComponentHeading = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <p className="text-5xl">{heading}</p>
      <div className="text-md text-[#4D4D4D]">{description}</div>
    </div>
  );
};

export default ComponentHeading;
