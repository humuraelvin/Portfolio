"use client";

import { motion } from 'framer-motion';
import { RiRobot2Fill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { format } from 'date-fns';

const ChatMessage = ({ message, isDark }) => {
  const { text, sender, timestamp } = message;
  const isBot = sender === 'bot';
  
  return (
    <motion.div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mr-2 flex-shrink-0">
          <RiRobot2Fill size={16} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div className={`p-3 rounded-2xl ${
          isBot
            ? isDark ? 'bg-[#1e293b] text-white' : 'bg-violet-100 text-gray-800'
            : isDark ? 'bg-violet-600 text-white' : 'bg-violet-600 text-white'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        </div>
        <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'} ${isBot ? 'text-left' : 'text-right'}`}>
          {format(new Date(timestamp), 'HH:mm')}
        </div>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center ml-2 flex-shrink-0">
          <FaUser size={14} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
