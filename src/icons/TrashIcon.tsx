import React from "react";

type Props = {} & React.SVGProps<SVGSVGElement>;

const TrashIcon = ({ className, ...props }: Props) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 20 20"
    //   fill="currentColor"
    //   className={props.className}
    //   //stroke="currentColor"
    // >
    //   <path
    //     fillRule="evenodd"
    //     d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
    //     clipRule="evenodd"
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      //stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
};

export default TrashIcon;
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="24"
//   height="24"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="currentColor"
//   stroke-width="2"
//   stroke-linecap="round"
//   stroke-linejoin="round"
//   class="lucide lucide-trash-2"
// >
//   <path d="M3 6h18" />
//   <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//   <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//   <line x1="10" x2="10" y1="11" y2="17" />
//   <line x1="14" x2="14" y1="11" y2="17" />
// </svg>;
