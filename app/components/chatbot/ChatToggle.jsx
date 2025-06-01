"use client";

import { motion } from 'framer-motion';
import { RiRobot2Fill } from 'react-icons/ri';
import { FiMessageSquare } from 'react-icons/fi';

const ChatToggle = ({ isOpen, toggleChat, isDark }) => {
  return (
    <motion.button
      onClick={toggleChat}
      className={`fixed left-6 bottom-6 z-50 p-3.5 rounded-full shadow-lg ${
        isDark 
          ? isOpen ? 'bg-violet-700 text-white' : 'bg-violet-600 text-white'
          : isOpen ? 'bg-violet-700 text-white' : 'bg-violet-600 text-white'
      } hover:scale-110 transition-all duration-300`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        {isOpen ? (
          <FiMessageSquare size={24} className="text-white" />
        ) : (
          <>
            <RiRobot2Fill size={24} className="text-white" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          </>
        )}
      </div>
    </motion.button>
  );
};

export default ChatToggle;
