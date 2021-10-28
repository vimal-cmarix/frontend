import React from 'react';

export const IconDrag = ({ ...rest }) => {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="2" cy="2" r="2" fill="#E2E2E2" />
      <circle cx="10" cy="2" r="2" fill="#E2E2E2" />
      <circle cx="2" cy="10" r="2" fill="#E2E2E2" />
      <circle cx="10" cy="10" r="2" fill="#E2E2E2" />
      <circle cx="2" cy="18" r="2" fill="#E2E2E2" />
      <circle cx="10" cy="18" r="2" fill="#E2E2E2" />
    </svg>
  );
};
