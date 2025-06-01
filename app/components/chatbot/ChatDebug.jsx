"use client";

import { useState, useEffect } from 'react';
import { personalInfo } from './chatbot-data';

export default function ChatDebug() {
  const [testMessage, setTestMessage] = useState('');
  const [result, setResult] = useState('');
  const [logs, setLogs] = useState([]);

  // Capture console.log for debugging
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      originalConsoleLog(...args);
      setLogs(prev => [...prev, args.join(' ')]);
    };
    
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

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
    
    // Check for hobbies and interests - EXPANDED MATCHING
    if (message.includes('hobby') || message.includes('hobbies') || message.includes('interest') || 
        message.includes('free time') || message.includes('spare time') || message.includes('leisure') || 
        message.includes('outside work') || message.includes('outside coding') || message.includes('passion') || 
        message.includes('enjoy') || (message.includes('football') && !message.includes('club')) || 
        message.includes('hiking') || message.includes('reading') || message.includes('gaming') || 
        message.includes('like to do') || message.includes('likes to do') || 
        message.includes('do for fun') || message.includes('does for fun')) {
      console.log('Matched hobbies keywords');
      return personalInfo.hobbies;
    }
    
    // Fallback
    return "No match found";
  };

  const handleTest = () => {
    setLogs([]);
    const response = processUserMessage(testMessage);
    setResult(response);
  };

  return (
    <div className="fixed top-0 right-0 bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-700 rounded-bl-lg shadow-lg z-50 max-w-md w-full">
      <h2 className="text-lg font-bold mb-2">Chatbot Debug</h2>
      <input
        type="text"
        value={testMessage}
        onChange={(e) => setTestMessage(e.target.value)}
        placeholder="Test message..."
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-2 dark:bg-gray-800 dark:text-white"
      />
      <button 
        onClick={handleTest}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Test
      </button>
      
      <div className="mb-4">
        <h3 className="font-semibold">Result:</h3>
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded max-h-40 overflow-auto">
          {result ? (
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          ) : (
            <span className="text-gray-500">No result yet</span>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold">Logs:</h3>
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded max-h-40 overflow-auto">
          {logs.length > 0 ? (
            <ul className="text-xs">
              {logs.map((log, index) => (
                <li key={index} className="mb-1">{log}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500">No logs yet</span>
          )}
        </div>
      </div>
    </div>
  );
}
