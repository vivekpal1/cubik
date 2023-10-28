import React from 'react';

const GridOne = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }, ref) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5.167 17.5c-.934 0-1.4 0-1.757-.182a1.666 1.666 0 0 1-.728-.728c-.182-.357-.182-.823-.182-1.757v-.5c0-.933 0-1.4.182-1.756.16-.314.414-.569.728-.729.357-.181.823-.181 1.757-.181h9.666c.934 0 1.4 0 1.757.181.314.16.569.415.728.729.182.356.182.823.182 1.756v.5c0 .934 0 1.4-.182 1.757-.16.314-.414.569-.728.728-.357.182-.823.182-1.757.182H5.167Zm-.584-9.167c-.387 0-.58 0-.741-.032a1.667 1.667 0 0 1-1.31-1.31C2.5 6.832 2.5 6.638 2.5 6.25V4.583c0-.387 0-.58.032-.741a1.667 1.667 0 0 1 1.31-1.31c.16-.032.354-.032.741-.032.388 0 .581 0 .742.032a1.667 1.667 0 0 1 1.31 1.31c.032.16.032.354.032.741V6.25c0 .387 0 .58-.032.742a1.667 1.667 0 0 1-1.31 1.31c-.16.031-.354.031-.742.031Zm8.084 0c-.934 0-1.4 0-1.757-.181a1.666 1.666 0 0 1-.728-.729C10 7.067 10 6.6 10 5.667v-.5c0-.934 0-1.4.182-1.757.16-.314.414-.569.728-.728.357-.182.823-.182 1.757-.182h2.166c.934 0 1.4 0 1.757.182.314.16.569.414.728.728.182.357.182.823.182 1.757v.5c0 .933 0 1.4-.182 1.756-.16.314-.414.569-.728.729-.357.181-.823.181-1.757.181h-2.166Z"
      />
    </svg>
  );
});

export { GridOne };