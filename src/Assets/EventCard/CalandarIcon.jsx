import * as React from "react"
const CalandarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill="#464646"
      fillRule="evenodd"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M7 .5c.552 0 1 .426 1 .952v.953h6v-.953c0-.526.448-.952 1-.952s1 .426 1 .952v.953h1c2.21 0 4 1.705 4 3.81V16.69c0 2.103-1.79 3.809-4 3.809H5c-2.21 0-4-1.706-4-3.81V6.214c0-2.104 1.79-3.81 4-3.81h1v-.952C6 .926 6.448.5 7 .5Zm7 3.81c0 .526.448.952 1 .952s1-.426 1-.952h1c1.105 0 2 .852 2 1.904v.476H3v-.476c0-1.052.895-1.904 2-1.904h1c0 .526.448.952 1 .952s1-.426 1-.952h6Zm5 4.285H3v8.095c0 1.052.895 1.905 2 1.905h12c1.105 0 2-.853 2-1.904V8.595Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CalandarIcon
