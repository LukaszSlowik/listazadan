import React from "react";

type Props = {
  refetch?: () => void;
  mutateVersion?: boolean;
  children: React.ReactNode;
  triggerMutation?: () => void;
};

const ButtonUpdateOrGet = ({
  refetch,
  triggerMutation,
  children,
  mutateVersion = false,
}: Props) => {
  return (
    <button
      onClick={() => {
        if (refetch) refetch();
        if (mutateVersion && triggerMutation) triggerMutation();
      }}
      className="flex items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
    >
      {children}
      {/* <PlusIcon />
    Get data from database */}
    </button>
  );
};

export default ButtonUpdateOrGet;
