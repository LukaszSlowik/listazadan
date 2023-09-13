"use client";
import { getEmailsFromWhitelistByEmail } from "@/lib/fetchFunctions/fetchFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {};

const ListFor = (props: Props) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery(
    ["emails", session?.user.email],
    () => getEmailsFromWhitelistByEmail(session?.user.email as string),
    {
      enabled: !!session?.user.email,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: Infinity,
      //   select: (data) => {
      //     let newData = data.map((item) => ({
      //       value: item.id,
      //       label: item.email,
      //     }));
      //     console.log("newData", newData);
      //     return newData;
      //   },
    },
  );

  const [selectedOption, setSelectedOption] = useState("");
  console.log("Users", users);
  return (
    <div>
      <h1 className="text-2xl font-bold">Dostępni użytkownicy</h1>
      <select
        className=" m-2 p-2 text-black"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option className="text-black" value="">
          -- Wybierz użytkownika --
        </option>
        {users.map((user) => (
          <option className="text-black" key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListFor;
