import * as React from "react"
const ClockIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill="#464646"
      d="M11 7a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h3a1 1 0 1 0 0-2h-2V7Z"
    />
    <path
      fill="#464646"
      fillRule="evenodd"
      d="M11 .5C5.477.5 1 4.977 1 10.5s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10Zm-8 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M11 7a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h3a1 1 0 1 0 0-2h-2V7Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M11 .5C5.477.5 1 4.977 1 10.5s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10Zm-8 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ClockIcon
