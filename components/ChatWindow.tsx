"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "@/lib/time";

export default function ChatWindow({
  convoId,
  onBack,
}: {
  convoId: string;
  onBack: () => void;
}) {
  const { user } = useUser();
  const messages = useQuery(api.messages.get, { convoId });
  const send = useMutation(api.messages.send);
  const del = useMutation(api.messages.softDelete);
  const typing = useMutation(api.typing.setTyping);
  const typingUsers = useQuery(api.typing.getTyping, { convoId });

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex-1 flex flex-col p-4">
      <button className="md:hidden mb-2" onClick={onBack}>
        ← Back
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map(m => (
          <div key={m._id} className="p-2 bg-gray-100 rounded">
            {m.deleted ? (
              <i className="text-gray-400">This message was deleted</i>
            ) : (
              <>
                <div>{m.text}</div>
                <div className="text-xs opacity-60">{formatTime(m.createdAt)}</div>
                {m.sender === user?.id && (
                  <button
                    className="text-xs text-red-500"
                    onClick={() => del({ messageId: m._id })}
                  >
                    delete
                  </button>
                )}
              </>
            )}
          </div>
        ))}

        {typingUsers?.length ? (
          <div className="text-sm italic text-gray-500">Someone is typing...</div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="border flex-1 p-2"
          value={text}
          onChange={e => {
            setText(e.target.value);
            typing({ convoId, user: user!.id });
          }}
        />
        <button
          className="bg-blue-500 text-white px-4"
          onClick={() => {
            send({ convoId, sender: user!.id, text });
            setText("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}