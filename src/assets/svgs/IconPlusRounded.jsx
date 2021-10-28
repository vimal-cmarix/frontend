import React from 'react';

export const IconPlusRounded = ({ ...rest }) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M10 6V10M10 10H14M10 10H6M10 10V14"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="8" stroke="currentColor" />
    </svg>
  );
};
