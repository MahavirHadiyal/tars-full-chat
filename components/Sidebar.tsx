"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function Sidebar({ onSelect }: { onSelect: (id: string) => void }) {
  const { user } = useUser();
  const users = useQuery(api.users.getUsers);
  const [search, setSearch] = useState("");

  if (!users) return <div className="p-4">Loading...</div>;

  const filtered = users
    .filter(u => u.clerkId !== user?.id)
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full md:w-72 border-r p-4">
      <input
        placeholder="Search users"
        className="border p-2 w-full mb-3"
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.map(u => (
        <div
          key={u.clerkId}
          className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
          onClick={() => onSelect(u.clerkId)}
        >
          <span>{u.name}</span>
          <span className={`w-2 h-2 rounded-full ${u.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
        </div>
      ))}
    </div>
  );
}