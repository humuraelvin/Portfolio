"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp } = message;
  const isBot = sender === "bot";

  return (
    <motion.div
      className={`mb-3 flex ${isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="max-w-[85%]">
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
            isBot ? "rounded-tl-md border border-line bg-card text-fg" : "rounded-tr-md bg-fg text-bg"
          }`}
        >
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
        <div className={`mt-1 text-[10px] text-muted ${isBot ? "text-left" : "text-right"}`}>
          {format(new Date(timestamp), "HH:mm")}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
