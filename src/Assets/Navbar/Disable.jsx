import * as React from "react"
const Disable = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={24}
        fill="none"
        {...props}
    >
        <g
            stroke="#323232"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            opacity={0.5}
        >
            <path d="M2 2h26M2 12h26M2 22h26" />
        </g>
    </svg>
)
export default Disable
