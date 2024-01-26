import React from "react";

export default function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="red"
      className="w-3 h-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
      />
    </svg>
  );
}

export function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="green"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="green"
      className="w-3 h-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}
