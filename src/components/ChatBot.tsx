import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

import { chat_background, notificationSound } from '../assets';

const API_URL = import.meta.env.VITE_API_GATEWAY_URL;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isCalendarRelated?: boolean;
  isLoading?: boolean;
}

const processMessageContent = (content: string) =>
  content.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)');

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Muja's AI assistant. Feel free to ask me anything about my experience, skills, or projects!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef(new Audio(notificationSound));
  const [threadId, setThreadId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('notificationPlayed');
    if (!hasPlayed) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          setShowWelcome(true);
          audioRef.current.play().catch(err => {
            console.log('Audio play failed:', err);
          });
          sessionStorage.setItem('notificationPlayed', 'true');
        }
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    autoResizeTextarea();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      setIsLoading(true);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          threadId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const parsedBody = JSON.parse(data.body) as {
        response: string;
        threadId: string;
        isCalendarRelated?: boolean;
      };

      const processedResponse = processMessageContent(parsedBody.response);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: processedResponse,
          isCalendarRelated: parsedBody.isCalendarRelated,
        },
      ]);
      setThreadId(parsedBody.threadId);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowWelcome(false);
  };

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50">
      {showWelcome && !isOpen && (
        <div className="absolute bottom-28 right-0 bg-white rounded-lg shadow-lg p-4 mb-4 min-w-[280px] max-w-[320px] animate-fade-in">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              ×
            </button>
            <p className="text-base text-gray-800 pr-4">
              Hey there! Muja salutes you. Would you like to talk to Virtual Muja? 👋
            </p>
          </div>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 shadow-lg" />
        </div>
      )}

      <button
        type="button"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat' : 'Open chat with Virtual Muja'}
        className="w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 items-center justify-center relative chat-button-pulse flex bg-transparent border-0 p-0"
      >
        <img
          src={chat_background}
          alt=""
          className="w-full h-full object-cover rounded-full hover:opacity-90 transition-all duration-300"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-tertiary rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faComment} className="text-white text-sm" />
        </div>
      </button>

      {isOpen && (
        <div
          className={`fixed md:right-5 bg-white shadow-xl flex flex-col z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-0 md:inset-auto md:bottom-24 md:w-[48rem] md:h-[36rem] md:rounded-lg'
              : 'inset-0 md:inset-auto md:bottom-24 md:w-96 h-full md:h-[500px] md:rounded-lg'
          }`}
        >
          <div className="sticky top-0 w-full bg-tertiary p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleSize}
                className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] flex items-center justify-center"
                title={isExpanded ? 'Compress window' : 'Expand window'}
              >
                <FontAwesomeIcon
                  icon={isExpanded ? faCompress : faExpand}
                  className="text-white text-sm"
                />
              </button>
              <h3 className="text-lg font-semibold text-white">Chat with Virtual Muja</h3>
            </div>
            <button
              type="button"
              onClick={toggleChat}
              className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] flex items-center justify-center"
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white" />
            </button>
          </div>

          <div
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[80%] break-words ${
                    message.role === 'user'
                      ? 'bg-[#915EFF] text-white rounded-2xl rounded-tr-sm'
                      : 'bg-gray-200 text-gray-800 rounded-2xl rounded-tl-sm'
                  } ${message.isCalendarRelated ? 'calendar-message' : ''}`}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  {message.isLoading ? (
                    <div className="loading-message">
                      Muja is thinking
                      <span className="loading-dots">...</span>
                    </div>
                  ) : (
                    <ReactMarkdown
                      components={{
                        a: ({ ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={e => {
                              e.stopPropagation();
                            }}
                          />
                        ),
                        p: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="inline-block p-3 rounded-2xl rounded-tl-sm bg-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-2 items-start">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message..."
              className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[40px] max-h-[150px] overflow-y-auto"
              rows={1}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!inputMessage.trim() || isLoading}
              className={`px-4 py-2 rounded-lg ${
                inputMessage.trim() && !isLoading
                  ? 'bg-tertiary text-white hover:bg-secondary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors duration-300`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
