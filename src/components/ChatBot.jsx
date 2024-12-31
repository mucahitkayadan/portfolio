import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';
import { chat_background, notificationSound } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Muja's AI assistant. Feel free to ask me anything about my experience, skills, or projects!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(new Audio(notificationSound));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome message after 10 seconds with sound
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcome(true);
        // Play sound
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
          // This is normal on first visit due to browser autoplay policies
        });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    setIsLoading(true);

    try {
      const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL;
      console.log('Sending request to:', LAMBDA_URL);
      console.log('Request body:', { message: inputMessage });

      const response = await fetch(LAMBDA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse error response:', e);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse success response:', e);
        throw new Error('Invalid response from server');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please try again later.`
      }]);
    }

    setInputMessage('');
    setIsLoading(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowWelcome(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Welcome Bubble */}
      {showWelcome && !isOpen && (
        <div className="absolute bottom-28 right-0 bg-white rounded-lg shadow-lg p-4 mb-4 min-w-[280px] max-w-[320px] animate-fade-in">
          <div className="relative">
            <button 
              onClick={() => setShowWelcome(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              ×
            </button>
            <p className="text-base text-gray-800 pr-4">
              Hey there! Muja salutes you. Would you like to talk to Virtual Muja? 👋
            </p>
          </div>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
        </div>
      )}

      {/* Chat Button */}
      <div 
        onClick={toggleChat}
        className="w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 items-center justify-center relative chat-button-pulse flex"
      >
        <img 
          src={chat_background} 
          alt="Chat" 
          className="w-full h-full object-cover rounded-full hover:opacity-90 transition-all duration-300"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-tertiary rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faComment} className="text-white text-sm" />
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-24 md:right-5 w-full md:w-96 h-[80vh] md:h-[500px] bg-white rounded-t-lg md:rounded-lg shadow-xl">
          {/* Close Button */}
          <div 
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-colors duration-300"
            onClick={toggleChat}
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
          </div>

          {/* Messages Container */}
          <div className="flex flex-col h-full">
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#915EFF] text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="loading-message">
                        Muja is thinking
                        <span className="loading-dots">...</span>
                      </div>
                    ) : (
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block p-3 rounded-lg bg-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#915EFF]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#915EFF] hover:bg-[#7f52e0] text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 