import React from "react";
import Link from "next/link";
type Props = {
  callbackUrl?: string;
};

const CancelButton = ({ callbackUrl }: Props) => {
  return (
    <Link
      href={callbackUrl ?? "/"}
      className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
    >
      Anuluj
    </Link>
  );
};

export default CancelButton;
