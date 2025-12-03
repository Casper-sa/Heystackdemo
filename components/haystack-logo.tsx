import * as React from "react"

export function HaystackLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M2 22h20" />
            <path d="M4 22c0-9 4-18 8-18s8 9 8 18" />
            <path d="M12 4v18" />
            <path d="M8 22c0-5 2-10 4-10s4 5 4 10" />
        </svg>
    )
}
