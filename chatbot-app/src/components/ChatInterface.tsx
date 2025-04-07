import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { Message } from '../types/Message';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<string>; 
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const chatDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString() + '-user',
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');

      try {
        const botResponseText = await onSendMessage(inputText);
        const botMessage: Message = {
          id: Date.now().toString() + '-bot',
          text: botResponseText,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
        const errorMessage: Message = {
          id: Date.now().toString() + '-error',
          text: 'Failed to get chatbot response.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    chatContainer: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    chatDisplay: {
      flexGrow: 1,
      padding: '10px',
      overflowY: 'auto',
    },
    userMessage: {
      backgroundColor: '#e0f7fa',
      padding: '8px',
      borderRadius: '5px',
      marginBottom: '5px',
      alignSelf: 'flex-end',
      maxWidth: '80%',
    },
    botMessage: {
      backgroundColor: '#f0f0f0',
      padding: '8px',
      borderRadius: '5px',
      marginBottom: '5px',
      alignSelf: 'flex-start',
      maxWidth: '80%',
    },
    inputContainer: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #eee',
    },
    inputField: {
      flexGrow: 1,
      padding: '8px',
      borderRadius: '3px',
      border: '1px solid #ddd',
      marginRight: '10px',
    },
    sendButton: {
      padding: '8px 15px',
      borderRadius: '3px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.chatContainer}>
      <div ref={chatDisplayRef} style={styles.chatDisplay}>
        {messages.map((msg) => (
          <div key={msg.id} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <p><strong>{msg.sender === 'user' ? 'You' : 'Chatbot'}</strong> ({msg.timestamp.toLocaleTimeString()}):</p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={styles.inputField}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
export{};