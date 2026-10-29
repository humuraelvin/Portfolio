"use client";

import { motion } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatToggle = ({ isOpen, toggleChat }) => {
  return (
    <motion.button
      type="button"
      onClick={toggleChat}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-fg text-bg shadow-lift transition-transform duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? <FiX size={20} /> : <FiMessageCircle size={20} />}
      {!isOpen && <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-bg bg-fg" />}
    </motion.button>
  );
};

export default ChatToggle;
