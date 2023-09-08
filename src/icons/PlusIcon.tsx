import React from "react";

type Props = {
  width?: number;
  height?: number;
} & React.SVGProps<SVGSVGElement>;

const PlusIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      //   width={props.width || 20}
      //   height={props.height || 20}
    >
      <path
        strokeLinecap="round"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default PlusIcon;
