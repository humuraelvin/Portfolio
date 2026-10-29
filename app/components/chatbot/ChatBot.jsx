"use client";

import { useState, useEffect, useRef } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatToggle from './ChatToggle';
import { personalInfo } from './chatbot-data';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Elvin's portfolio assistant. Ask me about his skills, projects, experience or education.",
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
      <ChatToggle isOpen={isOpen} toggleChat={toggleChat} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-3xl border border-line bg-bg shadow-lift"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fg text-bg">
                  <RiRobot2Fill size={16} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold">Ask about Elvin</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-fg" />
                    Online
                  </div>
                </div>
              </div>
              <button type="button" onClick={toggleChat} aria-label="Close chat" className="icon-btn h-8 w-8">
                <FiX size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="scrollbar-thin h-[340px] overflow-y-auto bg-bg p-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="mb-3 flex justify-start">
                  <div className="rounded-2xl rounded-tl-md border border-line bg-card px-3.5 py-3">
                    <div className="flex gap-1">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/60" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-line p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask about skills, projects, experience..."
                  className="flex-1 rounded-full border border-line bg-card px-4 py-2.5 text-sm text-fg outline-none placeholder:text-muted/70 focus:border-fg"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Send"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-opacity disabled:opacity-30"
                >
                  <FiSend size={16} />
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
