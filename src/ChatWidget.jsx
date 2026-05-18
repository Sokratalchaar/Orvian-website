import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import orvianLogo from './assets/orvian-logo.png';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Persistent Session ID for n8n tracking
  const [sessionId] = useState(() => {
    try {
      let storedId = localStorage.getItem('orvian_chat_session_id');
      if (!storedId) {
        storedId = crypto.randomUUID();
        localStorage.setItem('orvian_chat_session_id', storedId);
      }
      return storedId;
    } catch (e) {
      console.error('Failed to handle sessionId in localStorage', e);
      return crypto.randomUUID();
    }
  });

  const [messages, setMessages] = useState(() => {
    // Attempt to load chat history from sessionStorage
    try {
      const savedMessages = sessionStorage.getItem('orvian_chat_history');
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
    
    // Initial welcome message if no history is found
    return [
      {
        id: 'welcome',
        text: "Hello! I'm the Orvian AI Assistant. How can I help you automate workflows, deploy custom AI agents, or scale your business today? 🚀",
        sender: 'ai',
        timestamp: new Date().toISOString()
      }
    ];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem('orvian_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom when opening the chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    
    const messageText = inputValue.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://n8n.orvian.me/webhook/06593bfa-84b0-4540-9316-95c7f4162d39', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText, sessionId: sessionId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const text = await response.text();
      let aiReply = '';
      
      try {
        // Try parsing response as JSON in case it returns an object
        const data = JSON.parse(text);
        if (typeof data === 'string') {
          aiReply = data;
        } else if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          aiReply = typeof first === 'string' ? first : (first.output || first.response || first.message || first.text || first.reply || JSON.stringify(first));
        } else if (data && typeof data === 'object') {
          aiReply = data.output || data.response || data.message || data.text || data.reply || data.data || JSON.stringify(data);
        } else {
          aiReply = text;
        }
      } catch (e) {
        // If parsing fails, treat the response as plain text
        aiReply = text;
      }

      // Add AI reply message
      const aiMessage = {
        id: `ai-${Date.now()}`,
        text: aiReply || "I received your message but couldn't formulate a reply. How else can I help?",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add system error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: "Sorry, I'm experiencing connectivity issues. Please try again or reach out to us at contact@orvian.me!",
        sender: 'system',
        timestamp: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="floating-chat-container">
      {/* Trigger Button */}
      <button 
        className={`chat-trigger-btn ${isOpen ? 'active' : 'closed'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI assistant chat"
      >
        {isOpen ? (
          <X size={20} className="chat-icon-rotate" />
        ) : (
          <div className="chat-trigger-inner">
            <MessageCircle size={20} />
            <span className="chat-trigger-text">Ask Orvian</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar">
            <img src={orvianLogo} alt="Orvian Logo" className="chat-header-logo-img" />
            <span className="online-indicator"></span>
          </div>
          <div className="chat-header-info">
            <h3>Orvian Assistant</h3>
            <p>AI Agent • Online</p>
          </div>
          <button 
            className="chat-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="chat-messages-container">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user-wrapper' : msg.sender === 'system' ? 'system-wrapper' : 'ai-wrapper'}`}
            >
              <div className={`chat-bubble-content ${msg.sender}-bubble`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="chat-bubble-wrapper ai-wrapper">
              <div className="chat-bubble-content ai-bubble typing-bubble">
                <div className="typing-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Form Input Area */}
        <form onSubmit={handleSend} className="chat-input-form">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Orvian AI a question..."
            rows={1}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isLoading}
            className="chat-send-btn"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin-loading" /> : <Send size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWidget;
