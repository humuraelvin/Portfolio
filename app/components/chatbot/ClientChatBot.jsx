"use client";

import dynamic from "next/dynamic";

// Dynamically import ChatBot to avoid SSR issues with window object
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export default function ClientChatBot() {
  return <ChatBot />;
}
