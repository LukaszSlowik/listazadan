"use client";
import Tooltip from "@/components/Tooltip";
import CloseIcon from "@/icons/CloseIcon";
import PlusIcon from "@/icons/PlusIcon";
import TrashIcon from "@/icons/TrashIcon";
import {
  addWhiteList,
  getWhitelist,
} from "@/lib/fetchFunctions/fetchFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useId } from "react";

type Props = {};
// const whiteListArray = [
//   {
//     email: "przyklad@email.com",
//   },
//   {
//     email: "przyklad2@email.com",
//   },
// ];
const WhiteList = (props: Props) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [showAddEmail, setShowAddEmail] = React.useState(false);
  const [inputEmail, setInputEmail] = React.useState("");
  const inputID = useId();
  const { data: whiteList = [] } = useQuery(
    ["whiteList", session?.user.id],
    () => getWhitelist(session?.user.id as string),
    {
      enabled: !!session?.user.id,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: Infinity,
    },
  );
  const { mutate } = useMutation(
    () => addWhiteList(session?.user.id as string, inputEmail),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["whiteList", session?.user.id]);
        setInputEmail("");
      },
    },
  );

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Lista upoważnień</h1>
        <Tooltip
          text={showAddEmail ? "Zamknij" : "Dodaj"}
          position="bottom-left"
          transition={false}
          className=" bg-white text-black"
        >
          {showAddEmail ? (
            <span onClick={() => setShowAddEmail(false)}>
              <CloseIcon className="h-6 w-6 cursor-pointer stroke-slate-700" />
            </span>
          ) : (
            <span onClick={() => setShowAddEmail(true)}>
              <PlusIcon className="h-6 w-6 cursor-pointer stroke-green-600" />
            </span>
          )}
        </Tooltip>
      </div>
      {showAddEmail && (
        <div className="flex flex-row items-center justify-between">
          {/* <label htmlFor={inputID}>Email</label> */}
          <input
            id={inputID}
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Wpisz email"
            className="rounded-md border-2 border-mainBackgroundColor p-2 text-black"
          />

          <button
            onClick={() => {
              console.log("dodaj");
              mutate();
            }}
            className="m-2 p-2 text-green-600"
          >
            Dodaj
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {whiteList.map((item, index) => {
          return (
            <div
              key={index}
              className="grid  grid-cols-2  gap-8 border px-4 py-2"
            >
              <p>{item.email}</p>
              <div className="place-self-end">
                <Tooltip
                  text="Usuń"
                  position="bottom-left"
                  transition={false}
                  className=" bg-white text-black"
                >
                  <TrashIcon className="mx-2 h-6 w-6 cursor-pointer  stroke-red-600" />
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WhiteList;
