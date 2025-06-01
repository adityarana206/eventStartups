import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={21}
    height={15}
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.3999 1.5H19.3999"
      stroke="#323232"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.3999 7.5H19.3999"
      stroke="#323232"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.3999 13.5H19.3999"
      stroke="#323232"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
