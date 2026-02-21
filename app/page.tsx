"use client";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatLayout from "@/components/ChatLayout";

export default function Page() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);
  const setOnline = useMutation(api.presence.setOnline);

  useEffect(() => {
    if (!user) return;

    createUser({
      clerkId: user.id,
      name: user.fullName || "User",
      image: user.imageUrl,
    });

    setOnline({ clerkId: user.id });
  }, [user, createUser, setOnline]);

  return (
    <main className="h-screen">
      <SignedOut>
        <div className="flex h-full items-center justify-center">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <ChatLayout />
      </SignedIn>
    </main>
  );
}