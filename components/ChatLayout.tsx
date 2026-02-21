"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  const [convo, setConvo] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      <Sidebar onSelect={setConvo} />
      {convo && <ChatWindow convoId={convo} onBack={() => setConvo(null)} />}
    </div>
  );
}