"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from "@/app/context/ThemeContext";
import { FiSend, FiX } from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatToggle from './ChatToggle';
import { personalInfo } from './chatbot-data';

const ChatBot = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to my Portfolio AI Chat! Ask me anything about Elvin's skills, projects, or interests.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const processUserMessage = (userMessage) => {
    // Convert message to lowercase for easier matching
    const message = userMessage.toLowerCase().trim();
    
    // Log the message for debugging
    console.log('Processing message:', message);
    
    // Direct question patterns with high priority matching
    if (message.match(/what\s+(are|is)\s+elvin'?s?\s+hobb(y|ies)/i) || 
        message.match(/tell\s+me\s+about\s+elvin'?s?\s+hobb(y|ies)/i) || 
        message.match(/what\s+does\s+elvin\s+(do|like)\s+(in|on|during)\s+(his\s+)?(free|spare)\s+time/i)) {
      console.log('Matched hobbies direct question');
      return personalInfo.hobbies;
    }
    
    if (message.match(/what\s+(are|is)\s+elvin'?s?\s+(favorite\s+)?(club|team)/i) || 
        message.match(/which\s+(club|team)\s+does\s+elvin\s+(support|like|follow)/i)) {
      console.log('Matched favorite clubs direct question');
      return personalInfo.favoriteClubs;
    }
    
    if (message.match(/what\s+(are|is)\s+elvin'?s?\s+skill/i) || 
        message.match(/what\s+can\s+elvin\s+do/i) || 
        message.match(/what\s+tech\s+does\s+elvin\s+(use|know)/i)) {
      console.log('Matched skills direct question');
      return personalInfo.skills;
    }
    
    if (message.match(/what\s+(are|is)\s+elvin'?s?\s+project/i) || 
        message.match(/what\s+(has|have)\s+elvin\s+(made|created|built|developed)/i)) {
      console.log('Matched projects direct question');
      return personalInfo.projects;
    }
    
    if (message.match(/who\s+is\s+elvin/i) || message.match(/tell\s+me\s+about\s+elvin/i)) {
      console.log('Matched about direct question');
      return personalInfo.about;
    }
    
    // Keyword-based matching (secondary priority)
    // Check for personal information about Elvin
    if (message.includes('who is elvin') || message.includes('about elvin') || 
        message.includes('tell me about') || message.includes('elvin humura')) {
      console.log('Matched about keywords');
      return personalInfo.about;
    }
    
    // Check for hobbies and interests - EXPANDED MATCHING
    else if (message.includes('hobby') || message.includes('hobbies') || message.includes('interest') || 
             message.includes('free time') || message.includes('spare time') || message.includes('leisure') || 
             message.includes('outside work') || message.includes('outside coding') || message.includes('passion') || 
             message.includes('enjoy') || (message.includes('football') && !message.includes('club')) || 
             message.includes('hiking') || message.includes('reading') || message.includes('gaming') || 
             message.includes('like to do') || message.includes('likes to do') || 
             message.includes('do for fun') || message.includes('does for fun')) {
      console.log('Matched hobbies keywords');
      return personalInfo.hobbies;
    }
    
    // Check for skills and technologies
    else if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || 
             message.includes('programming') || message.includes('language') || message.includes('framework') || 
             message.includes('tool') || message.includes('software') || message.includes('development') || 
             message.includes('code') || message.includes('coding') || message.includes('developer')) {
      console.log('Matched skills keywords');
      return personalInfo.skills;
    }
    
    // Check for projects and work
    else if (message.includes('project') || message.includes('work') || message.includes('portfolio') || 
             message.includes('application') || message.includes('app') || message.includes('website') || 
             message.includes('system') || message.includes('developed') || message.includes('built') || 
             message.includes('created') || message.includes('made')) {
      console.log('Matched projects keywords');
      return personalInfo.projects;
    }
    
    // Check for favorite football clubs
    else if (message.includes('football club') || message.includes('soccer club') || message.includes('team') || 
             message.includes('barcelona') || message.includes('arsenal') || message.includes('favorite club') || 
             message.includes('support') || message.includes('fan') || message.includes('favorite team')) {
      console.log('Matched favorite clubs keywords');
      return personalInfo.favoriteClubs;
    }
    
    // Check for education
    else if (message.includes('education') || message.includes('study') || message.includes('degree') || 
             message.includes('university') || message.includes('school') || message.includes('college') || 
             message.includes('certification') || message.includes('course') || message.includes('learning') || 
             message.includes('academic') || message.includes('qualification')) {
      console.log('Matched education keywords');
      return personalInfo.education;
    }
    
    // Check for work experience
    else if (message.includes('experience') || message.includes('work history') || message.includes('job') || 
             message.includes('career') || message.includes('professional') || message.includes('employment') || 
             message.includes('position') || message.includes('role') || message.includes('company') || 
             message.includes('worked') || message.includes('working')) {
      console.log('Matched experience keywords');
      return personalInfo.experience;
    }
    
    // Check for contact information
    else if (message.includes('contact') || message.includes('email') || message.includes('reach') || 
             message.includes('message') || message.includes('get in touch') || message.includes('connect') || 
             message.includes('social media') || message.includes('linkedin') || message.includes('github')) {
      console.log('Matched contact keywords');
      return personalInfo.contact;
    }
    
    // Check for personal details
    else if (message.includes('personal') || message.includes('background') || message.includes('life') || 
             message.includes('fact') || message.includes('interesting') || message.includes('origin') || 
             message.includes('from') || message.includes('language') || message.includes('speak')) {
      console.log('Matched personal keywords');
      return personalInfo.personal;
    }
    
    // Greetings
    else if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
             message.includes('greetings') || message.includes('good morning') || message.includes('good afternoon') || 
             message.includes('good evening') || message.match(/^hi$/) || message.match(/^hey$/) || message.match(/^hello$/)) {
      console.log('Matched greeting');
      return "Hello! I'm Elvin's portfolio assistant. I can tell you all about Elvin Humura's skills, projects, education, work experience, and personal interests. What would you like to know about him?";
    }
    
    // Thanks
    else if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      console.log('Matched thanks');
      return "You're welcome! I'm happy to share information about Elvin. Is there anything else you'd like to know about his skills, projects, education, or interests?";
    }
    
    // About the chatbot
    else if (message.includes('who are you') || message.includes('what are you') || 
             message.includes('about you') || message.includes('your name') || 
             message.includes('chatbot') || message.includes('ai') || message.includes('assistant')) {
      console.log('Matched about chatbot');
      return "I'm an AI assistant for Elvin Humura's portfolio website. I'm designed to provide detailed information about Elvin's professional background, skills, projects, education, and personal interests. Feel free to ask me anything about Elvin!";
    }
    
    // Check for non-personal queries (math, general knowledge, etc.)
    else if (message.includes('sin(') || message.includes('cos(') || message.includes('tan(') || 
             message.includes('calculate') || message.includes('what is') || message.includes('how to') || 
             message.includes('define') || message.includes('meaning of') || message.includes('weather') || 
             message.includes('news') || message.includes('recipe') || message.includes('history') || 
             message.includes('math') || message.includes('science') || message.includes('politics') || 
             message.includes('movie') || message.includes('music') || message.includes('song')) {
      console.log('Matched non-personal query');
      return `I'm specifically designed to provide information about Elvin Humura only. I can't answer general knowledge questions, perform calculations, or provide information unrelated to Elvin.

I'd be happy to tell you about Elvin's skills, projects, education, work experience, hobbies, or favorite football clubs (Barcelona and Arsenal). Please feel free to ask about any aspect of Elvin's background or professional life.`;
    }
    
    // Fallback with suggestions
    else {
      console.log('No match found, using fallback');
      return `I'd be happy to tell you about Elvin Humura. You can ask me about his:

- Skills and technologies he works with
- Projects he has developed
- Education and certifications
- Work experience and expertise
- Hobbies and interests outside of coding
- Favorite football clubs (Barcelona and Arsenal)
- Contact information
- Personal background and interesting facts

What specific aspect of Elvin's background would you like to learn more about?`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: processUserMessage(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <ChatToggle isOpen={isOpen} toggleChat={toggleChat} isDark={isDark} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`fixed bottom-20 right-6 sm:right-8 z-50 w-[320px] sm:w-[350px] max-w-[90vw] rounded-2xl shadow-xl overflow-hidden ${
              isDark ? 'bg-[#0f172a] border border-[#1f2937]' : 'bg-white border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className={`p-4 flex items-center justify-between ${
              isDark ? 'bg-[#1e293b] text-white' : 'bg-violet-600 text-white'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-violet-800 flex items-center justify-center">
                  <RiRobot2Fill size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Portfolio AI Chat</h3>
                  <div className="flex items-center text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className={`h-[350px] overflow-y-auto p-4 ${
              isDark ? 'bg-[#0f172a] text-gray-200' : 'bg-gray-50 text-gray-800'
            }`}>
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isDark={isDark} 
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                    <RiRobot2Fill size={16} className="text-white" />
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] ${
                    isDark ? 'bg-[#1e293b]' : 'bg-violet-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className={`p-3 border-t ${
              isDark ? 'border-[#1f2937] bg-[#0f172a]' : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className={`flex-1 py-2 px-3 rounded-full focus:outline-none ${
                    isDark 
                      ? 'bg-[#1e293b] text-white placeholder:text-gray-400 border border-[#2d3748]' 
                      : 'bg-gray-100 text-gray-800 placeholder:text-gray-500'
                  }`}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-full ${
                    inputValue.trim() 
                      ? isDark 
                        ? 'bg-violet-600 text-white hover:bg-violet-700' 
                        : 'bg-violet-600 text-white hover:bg-violet-700'
                      : isDark 
                        ? 'bg-[#1e293b] text-gray-500' 
                        : 'bg-gray-200 text-gray-400'
                  } transition-colors`}
                >
                  <FiSend size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
