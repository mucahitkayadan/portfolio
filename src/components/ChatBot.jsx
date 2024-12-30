import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';
import { chat_background } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Muja's AI assistant. Feel free to ask me anything about my experience, skills, or projects!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chat after 10 seconds on first visit
  useEffect(() => {
    if (!hasShownInitial) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShownInitial(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [hasShownInitial]);

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

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Button - Always visible */}
      <div 
        onClick={toggleChat}
        className={`w-24 h-24 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 items-center justify-center relative chat-button-pulse ${
          isOpen ? 'opacity-50' : 'opacity-100'
        }`}
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
        <div className="absolute bottom-0 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden">
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